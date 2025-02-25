import '../css/filamentor.css';
import './store';
import { createDragHandlers } from './dragHandlers';

window.addEventListener('alpine:init', () => {

    Alpine.data('filamentor', () => {
        return {
            showSettings: false,
            activeRow: null,
            activeColumn: null,
            activeColumnIndex: null,
            activeElement: null,
            activeElementIndex: null,
            rowToDelete: null,
            columnToDeleteRowId: null,
            columnToDeleteIndex: null,
            elementData: {
                text: { content: null },
                image: { url: null, alt: null, thumbnail: null },
                video: { url: null }
            },
            ...createDragHandlers(window.Livewire),

            /**
             * Initializes the page builder with saved layout data
             * Parses saved JSON layout from the hidden input field and loads it into the Alpine store
             * Falls back to an empty layout if parsing fails or data is invalid
             */
            init() {
                try {
                    // Check if canvasData reference exists
                    if (!this.$refs.canvasData) {
                        console.warn('Canvas data reference not found');
                        return;
                    }
            
                    const savedLayout = this.$refs.canvasData.value;
                    
                    // Check if savedLayout exists and is not empty
                    if (savedLayout) {
                        try {
                            const parsedRows = JSON.parse(savedLayout);
                            
                            // Validate parsed data is an array
                            if (!Array.isArray(parsedRows)) {
                                console.error('Parsed layout is not an array');
                                return;
                            }
                            
                            // Sort with fallback handling for missing order property
                            const sortedRows = parsedRows.sort((a, b) => {
                                const orderA = a.order !== undefined ? a.order : 0;
                                const orderB = b.order !== undefined ? b.order : 0;
                                return orderA - orderB;
                            });
                            
                            Alpine.store('rows').setRows(sortedRows);
                        } catch (parseError) {
                            console.error('Failed to parse layout JSON:', parseError);
                            // Initialize with empty layout instead of crashing
                            Alpine.store('rows').setRows([]);
                        }
                    }
                } catch (error) {
                    console.error('Error initializing builder:', error);
                    // Ensure we at least have an empty layout
                    Alpine.store('rows').setRows([]);
                }
            },
            
            /**
             * Opens the settings panel for a specific row
             * Sets the row as active and initializes any missing properties with defaults
             * 
             * @param {Object} row - The row object to edit settings for
             */
            openRowSettings(row) {
                try {
                    // Validate row parameter
                    if (!row || !row.id) {
                        console.error('Invalid row provided to openRowSettings');
                        return;
                    }
                    
                    // Find row with safer approach
                    this.activeRow = Alpine.store('rows').items.find(r => r.id === row.id);
                    
                    // Check if row was found
                    if (!this.activeRow) {
                        console.error(`Row with id ${row.id} not found`);
                        return;
                    }
                    
                    // Initialize properties with default values if they don't exist
                    this.activeRow.padding = this.activeRow.padding || { top: 0, right: 0, bottom: 0, left: 0 };
                    this.activeRow.margin = this.activeRow.margin || { top: 0, right: 0, bottom: 0, left: 0 };
                    this.activeRow.customClasses = this.activeRow.customClasses || '';
                    
                    this.showSettings = true;
                } catch (error) {
                    console.error('Error opening row settings:', error);
                    // Reset state in case of error
                    this.activeRow = null;
                    this.showSettings = false;
                }
            },

            /**
             * Saves settings for the currently active row
             * Updates the row in the store with validated values and saves the layout
             * Sends the updated layout to the server via Livewire
             */
            saveRowSettings() {
                try {
                    // Validate activeRow exists and has required properties
                    if (!this.activeRow) {
                        console.warn('No active row to save');
                        return;
                    }
                    
                    if (!this.activeRow.id) {
                        console.error('Active row missing ID property');
                        return;
                    }
                    
                    // Find row index with validation
                    const index = Alpine.store('rows').items.findIndex(row => row.id === this.activeRow.id);
                    if (index === -1) {
                        console.error(`Row with id ${this.activeRow.id} not found in rows store`);
                        return;
                    }
                    
                    // Ensure padding and margin objects exist
                    const paddingObj = this.activeRow.padding || {};
                    const marginObj = this.activeRow.margin || {};
                    
                    // Create a safe copy of the row with validated numeric values
                    const updatedRow = {
                        ...this.activeRow,
                        padding: {
                            top: this.safeParseNumber(paddingObj.top),
                            right: this.safeParseNumber(paddingObj.right),
                            bottom: this.safeParseNumber(paddingObj.bottom),
                            left: this.safeParseNumber(paddingObj.left)
                        },
                        margin: {
                            top: this.safeParseNumber(marginObj.top),
                            right: this.safeParseNumber(marginObj.right),
                            bottom: this.safeParseNumber(marginObj.bottom),
                            left: this.safeParseNumber(marginObj.left)
                        }
                    };
                    
                    // Update the row in the store
                    Alpine.store('rows').items[index] = updatedRow;
                    
                    // Safely stringify and save the layout
                    try {
                        const layoutData = JSON.stringify(Alpine.store('rows').items);
                        
                        // Verify canvasData reference exists
                        if (!this.$refs.canvasData) {
                            console.error('Canvas data reference not found');
                            return;
                        }
                        
                        // Update the hidden input value
                        this.$refs.canvasData.value = layoutData;
                        
                        // Save via Livewire and handle the promise
                        this.$wire.saveLayout(layoutData)
                            .then(result => {
                                if (result && result.success) {
                                    // Optional: Provide feedback on successful save
                                    console.log('Layout saved successfully');
                                } else {
                                    console.warn('Layout save returned unexpected result', result);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout:', error);
                            });
                            
                    } catch (jsonError) {
                        console.error('Error stringifying layout data:', jsonError);
                    }
                } catch (error) {
                    console.error('Error in saveRowSettings:', error);
                }
            },

            /**
             * Adds a new row to the page builder canvas
             * Creates a default row with a single column and initializes
             * all required properties with sensible defaults
             */
            addRow() {
                try {
                    // Get the current timestamp to use as unique ID base
                    const timestamp = Date.now();
                    
                    // Create a new row with default settings
                    // Each row must have an id, order, padding, margin, customClasses and columns array
                    const row = {
                        id: timestamp, // Unique identifier for the row
                        order: Alpine.store('rows').items.length, // Position in the layout (zero-based)
                        
                        // Initialize padding values to zero
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        
                        // Initialize margin values to zero
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        
                        customClasses: '', // Optional CSS classes for styling
                        
                        // Each row starts with at least one column
                        columns: [{
                            id: timestamp + 1, // Unique identifier for the column (timestamp + 1 to ensure uniqueness)
                            width: 'w-full', // Default to full width column
                            
                            // Initialize padding values to zero
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            
                            // Initialize margin values to zero
                            margin: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            
                            customClasses: '', // Optional CSS classes for styling
                            elements: [], // Initially empty array of content elements
                            order: 0 // Position in the row (zero-based)
                        }]
                    };
                    
                    // Validate that the rows store exists
                    if (!Alpine.store('rows') || !Array.isArray(Alpine.store('rows').items)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    // Add the new row to the rows store
                    Alpine.store('rows').items.push(row);
                    
                    // Update the hidden input field with the new data
                    this.updateCanvasData();
                    
                    // Save the updated layout to the server
                    try {
                        const layoutData = JSON.stringify(Alpine.store('rows').items);
                        this.$wire.saveLayout(layoutData)
                            .then(response => {
                                if (response && response.success) {
                                    console.log('Row added and layout saved successfully');
                                } else {
                                    console.warn('Layout saved but returned unexpected result', response);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout after adding row:', error);
                            });
                    } catch (jsonError) {
                        console.error('Error stringifying layout after adding row:', jsonError);
                    }
                } catch (error) {
                    console.error('Error adding new row:', error);
                    // Try to restore previous state if possible
                    this.updateCanvasData();
                }
            },

            /**
             * Initiates the row deletion process
             * If the row contains elements, shows a confirmation dialog first
             * 
             * @param {Object} row - The row object to be deleted
             */
            deleteRow(row) {
                try {
                    // Validate the row parameter
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided for deletion');
                        return;
                    }
                    
                    // Check if the row has any columns
                    if (!Array.isArray(row.columns)) {
                        console.warn('Row has no columns array, proceeding with deletion');
                        this.performRowDeletion(row);
                        return;
                    }
                    
                    // Check if any column contains elements that would be lost on deletion
                    const hasElements = row.columns.some(col => 
                        col.elements && Array.isArray(col.elements) && col.elements.length > 0
                    );
                    
                    if (hasElements) {
                        // Store the row to delete and show confirmation dialog
                        this.rowToDelete = row;
                        this.$dispatch('open-modal', { id: 'confirm-row-deletion' });
                    } else {
                        // If no elements exist, proceed with deletion without confirmation
                        this.performRowDeletion(row);
                    }
                } catch (error) {
                    console.error('Error during row deletion process:', error);
                    this.rowToDelete = null; // Reset the state in case of error
                }
            },

            /**
             * Confirms row deletion after user approval
             * Called from the confirmation modal
             */
            confirmRowDeletion() {
                try {
                    // Validate that we have a row to delete
                    if (!this.rowToDelete || !this.rowToDelete.id) {
                        console.error('No valid row to delete');
                        this.$dispatch('close-modal', { id: 'confirm-row-deletion' });
                        return;
                    }
                    
                    // Perform the actual deletion
                    this.performRowDeletion(this.rowToDelete);
                    
                    // Close the confirmation modal
                    this.$dispatch('close-modal', { id: 'confirm-row-deletion' });
                    
                    // Reset the rowToDelete reference
                    this.rowToDelete = null;
                } catch (error) {
                    console.error('Error during row deletion confirmation:', error);
                    // Ensure the modal is closed and state is reset even if an error occurs
                    this.$dispatch('close-modal', { id: 'confirm-row-deletion' });
                    this.rowToDelete = null;
                }
            },

            /**
             * Performs the actual row deletion and reorders remaining rows
             * 
             * @param {Object} row - The row object to be deleted
             */
            performRowDeletion(row) {
                try {
                    // Validate the row and rows store
                    if (!row || !row.id) {
                        console.error('Invalid row provided to performRowDeletion');
                        return;
                    }
                    
                    if (!Alpine.store('rows') || !Array.isArray(Alpine.store('rows').items)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    // Find the index of the row to delete
                    const index = Alpine.store('rows').items.findIndex(r => r.id === row.id);
                    
                    // If row exists, remove it and update order of remaining rows
                    if (index > -1) {
                        // Remove the row at the found index
                        Alpine.store('rows').items.splice(index, 1);
                        
                        // Update the order property of all remaining rows
                        // This ensures rows are displayed in the correct sequence
                        Alpine.store('rows').items = Alpine.store('rows').items.map((row, index) => ({
                            ...row,
                            order: index // Reassign order based on array position
                        }));
                        
                        // Save the updated layout to the server
                        try {
                            const layoutData = JSON.stringify(Alpine.store('rows').items);
                            
                            // Update UI immediately
                            this.updateCanvasData();
                            
                            // Send to server and handle response
                            this.$wire.saveLayout(layoutData)
                                .then(response => {
                                    if (response && response.success) {
                                        console.log('Row deleted and layout saved successfully');
                                    } else {
                                        console.warn('Layout saved after deletion but returned unexpected result', response);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error saving layout after row deletion:', error);
                                });
                        } catch (jsonError) {
                            console.error('Error stringifying layout after row deletion:', jsonError);
                        }
                    } else {
                        console.warn(`Row with id ${row.id} not found in rows store`);
                    }
                } catch (error) {
                    console.error('Error performing row deletion:', error);
                    // Try to refresh the canvas data to ensure UI consistency
                    this.updateCanvasData();
                }
            },

            /**
             * Opens the column settings modal and prepares column data for editing
             * 
             * @param {Object} row - The parent row object containing the column
             * @param {Object} column - The column object to be edited
             */
            openColumnSettings(row, column) {
                try {
                    // Validate input parameters
                    if (!row || !row.id) {
                        console.error('Invalid row provided to openColumnSettings');
                        return;
                    }
                    
                    if (!column || !column.id) {
                        console.error('Invalid column provided to openColumnSettings');
                        return;
                    }
                    
                    // Store references to the active row and column
                    this.activeRow = row;
                    this.activeColumn = column;
                    
                    // Initialize default properties if they don't exist
                    // This ensures the UI has valid data to work with
                    this.activeColumn.padding = this.activeColumn.padding || { top: 0, right: 0, bottom: 0, left: 0 };
                    this.activeColumn.margin = this.activeColumn.margin || { top: 0, right: 0, bottom: 0, left: 0 };
                    this.activeColumn.customClasses = this.activeColumn.customClasses || '';
                    
                    // Ensure all numeric padding values are properly initialized
                    if (typeof this.activeColumn.padding === 'object') {
                        this.activeColumn.padding.top = this.safeParseNumber(this.activeColumn.padding.top);
                        this.activeColumn.padding.right = this.safeParseNumber(this.activeColumn.padding.right);
                        this.activeColumn.padding.bottom = this.safeParseNumber(this.activeColumn.padding.bottom);
                        this.activeColumn.padding.left = this.safeParseNumber(this.activeColumn.padding.left);
                    }
                    
                    // Ensure all numeric margin values are properly initialized
                    if (typeof this.activeColumn.margin === 'object') {
                        this.activeColumn.margin.top = this.safeParseNumber(this.activeColumn.margin.top);
                        this.activeColumn.margin.right = this.safeParseNumber(this.activeColumn.margin.right);
                        this.activeColumn.margin.bottom = this.safeParseNumber(this.activeColumn.margin.bottom);
                        this.activeColumn.margin.left = this.safeParseNumber(this.activeColumn.margin.left);
                    }
                } catch (error) {
                    console.error('Error opening column settings:', error);
                    // Reset state if an error occurs
                    this.activeRow = null;
                    this.activeColumn = null;
                }
            },

            /**
             * Saves the column settings and updates the layout
             * Called when user confirms changes in the column settings modal
             */
            saveColumnSettings() {
                try {
                    // Validate that we have an active column to save
                    if (!this.activeColumn || !this.activeColumn.id) {
                        console.error('No valid column to save settings for');
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                        return;
                    }
                    
                    // Validate that we have an active row
                    if (!this.activeRow || !this.activeRow.id) {
                        console.error('No valid parent row for column settings');
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                        return;
                    }
                    
                    // Get reference to the rows store
                    const storeRows = Alpine.store('rows').items;
                    
                    // Find the row and column indexes to update
                    const rowIndex = storeRows.findIndex(row => row.id === this.activeRow.id);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${this.activeRow.id} not found in rows store`);
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                        return;
                    }
                    
                    const columnIndex = storeRows[rowIndex].columns.findIndex(col => col.id === this.activeColumn.id);
                    if (columnIndex === -1) {
                        console.error(`Column with id ${this.activeColumn.id} not found in row`);
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                        return;
                    }
                    
                    // Create a safe copy of the column with validated padding and margin values
                    storeRows[rowIndex].columns[columnIndex] = {
                        ...this.activeColumn,
                        padding: {
                            top: this.safeParseNumber(this.activeColumn.padding.top),
                            right: this.safeParseNumber(this.activeColumn.padding.right),
                            bottom: this.safeParseNumber(this.activeColumn.padding.bottom),
                            left: this.safeParseNumber(this.activeColumn.padding.left)
                        },
                        margin: {
                            top: this.safeParseNumber(this.activeColumn.margin.top),
                            right: this.safeParseNumber(this.activeColumn.margin.right),
                            bottom: this.safeParseNumber(this.activeColumn.margin.bottom),
                            left: this.safeParseNumber(this.activeColumn.margin.left)
                        }
                    };
                    
                    // Save the updated layout to the server
                    try {
                        const layoutData = JSON.stringify(storeRows);
                        
                        // Update the canvas data for immediate UI feedback
                        this.updateCanvasData();
                        
                        // Send to server and handle response
                        this.$wire.saveLayout(layoutData)
                            .then(response => {
                                if (response && response.success) {
                                    console.log('Column settings saved successfully');
                                } else {
                                    console.warn('Layout saved but returned unexpected result', response);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout after column settings update:', error);
                            });
                            
                        // Close the modal
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                    } catch (jsonError) {
                        console.error('Error stringifying layout after column settings update:', jsonError);
                        this.$dispatch('close-modal', { id: 'column-settings-modal' });
                    }
                } catch (error) {
                    console.error('Error saving column settings:', error);
                    // Close the modal even if an error occurs
                    this.$dispatch('close-modal', { id: 'column-settings-modal' });
                }
            },

            /**
             * Adds a new column to an existing row
             * Creates a column with default settings and appends it to the row's columns array
             * 
             * @param {Object} row - The row object to add the column to
             */
            addColumn(row) {
                try {
                    // Validate the row parameter
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided to addColumn');
                        return;
                    }
                    
                    // Ensure the row has a columns array
                    if (!Array.isArray(row.columns)) {
                        console.warn('Row has no columns array, initializing empty array');
                        row.columns = [];
                    }
                    
                    // Create a timestamp for the unique ID
                    const timestamp = Date.now();
                    
                    // Create a new column with default settings
                    const newColumn = {
                        id: timestamp, // Unique identifier for the column
                        elements: [], // Initialize with no elements
                        order: row.columns.length, // Position in the row (zero-based)
                        width: 'w-full', // Default width class (Tailwind full width)
                        
                        // Initialize padding values to zero
                        padding: { 
                            top: 0, 
                            right: 0, 
                            bottom: 0, 
                            left: 0 
                        },
                        
                        // Initialize margin values to zero
                        margin: { 
                            top: 0, 
                            right: 0, 
                            bottom: 0, 
                            left: 0 
                        },
                        
                        customClasses: '' // Optional CSS classes for styling
                    };
                    
                    // Create a new array with the existing columns plus the new one
                    // This is safer than directly modifying the array
                    const updatedColumns = [...row.columns, newColumn];
                    
                    // Update the row's columns with the new array
                    row.columns = updatedColumns;
                    
                    // Use nextTick to ensure the UI is updated before saving
                    this.$nextTick(() => {
                        try {
                            // Get the current rows from the store
                            const storeRows = Alpine.store('rows').items;
                            
                            // Validate the rows store
                            if (!storeRows || !Array.isArray(storeRows)) {
                                console.error('Rows store not properly initialized');
                                return;
                            }
                            
                            // Find the row in the store to ensure we're updating the correct data
                            const rowIndex = storeRows.findIndex(r => r.id === row.id);
                            if (rowIndex === -1) {
                                console.error(`Row with id ${row.id} not found in rows store`);
                                return;
                            }
                            
                            // Update the UI immediately
                            this.updateCanvasData();
                            
                            // Save the updated layout to the server
                            const layoutData = JSON.stringify(storeRows);
                            this.$wire.saveLayout(layoutData)
                                .then(response => {
                                    if (response && response.success) {
                                        console.log('Column added and layout saved successfully');
                                    } else {
                                        console.warn('Layout saved but returned unexpected result', response);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error saving layout after adding column:', error);
                                });
                        } catch (jsonError) {
                            console.error('Error processing or saving layout after adding column:', jsonError);
                        }
                    });
                } catch (error) {
                    console.error('Error adding new column:', error);
                }
            },

            /**
             * Updates the number of columns in the active row
             * Adds new columns or shows confirmation dialog for column reduction
             * 
             * @param {number|string} newCount - The new number of columns to set
             */
            updateColumns(newCount) {
                try {
                    // Validate active row exists
                    if (!this.activeRow || typeof this.activeRow !== 'object') {
                        console.error('No active row to update columns for');
                        return;
                    }

                    // Ensure columns array exists
                    if (!Array.isArray(this.activeRow.columns)) {
                        console.warn('Active row has no columns array, initializing empty array');
                        this.activeRow.columns = [];
                    }

                    // Validate and parse newCount parameter
                    const parsedCount = parseInt(newCount);
                    if (isNaN(parsedCount) || parsedCount < 1) {
                        console.error(`Invalid column count: ${newCount}`);
                        return;
                    }

                    const currentColumns = this.activeRow.columns;
                    
                    // If adding columns
                    if (parsedCount > currentColumns.length) {
                        try {
                            const columnsToAdd = parsedCount - currentColumns.length;
                            const timestamp = Date.now();
                            
                            // Add the required number of new columns
                            for (let i = 0; i < columnsToAdd; i++) {
                                // Create new column with unique ID and default properties
                                currentColumns.push({
                                    id: timestamp + i, // Ensure unique IDs across columns
                                    elements: [], // Start with empty elements array
                                    order: currentColumns.length, // Set order based on current position
                                    width: 'w-full', // Default width class
                                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                                    customClasses: ''
                                });
                            }
                            
                            // Update order property of all columns to ensure correct sequence
                            this.activeRow.columns.forEach((column, index) => {
                                column.order = index;
                            });
                            
                            // Get reference to the rows store
                            const storeRows = Alpine.store('rows').items;
                            
                            // Validate the rows store
                            if (!storeRows || !Array.isArray(storeRows)) {
                                console.error('Rows store not properly initialized');
                                return;
                            }
                            
                            // Update the UI immediately
                            this.updateCanvasData();
                            
                            // Save the updated layout to the server
                            try {
                                const layoutData = JSON.stringify(storeRows);
                                this.$wire.saveLayout(layoutData)
                                    .then(response => {
                                        if (response && response.success) {
                                            console.log('Columns added and layout saved successfully');
                                        } else {
                                            console.warn('Layout saved but returned unexpected result', response);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error saving layout after adding columns:', error);
                                    });
                            } catch (jsonError) {
                                console.error('Error stringifying layout after adding columns:', jsonError);
                            }
                        } catch (addError) {
                            console.error('Error adding columns:', addError);
                        }
                    } else if (parsedCount < currentColumns.length) {
                        // If reducing columns, show confirmation dialog
                        try {
                            // Store the new column count for use in the confirmation handler
                            this.newColumnCount = parsedCount;
                            
                            // Check if columns to be removed contain elements
                            const columnsToRemove = this.activeRow.columns.slice(parsedCount);
                            const hasElements = columnsToRemove.some(col => 
                                col.elements && Array.isArray(col.elements) && col.elements.length > 0
                            );
                            
                            if (hasElements) {
                                // Show confirmation dialog if there are elements that would be lost
                                this.$dispatch('open-modal', { id: 'confirm-column-reduction' });
                            } else {
                                // If no elements exist, proceed with reduction without confirmation
                                this.confirmColumnReduction();
                            }
                        } catch (reduceError) {
                            console.error('Error preparing column reduction:', reduceError);
                        }
                    } else {
                        // If newCount equals current count, no action needed
                        console.log('Column count unchanged');
                    }
                } catch (error) {
                    console.error('Error updating columns:', error);
                }
            },

            /**
             * Initiates the column deletion process
             * If the column contains elements, shows a confirmation dialog first
             * 
             * @param {Object} row - The parent row object containing the column
             * @param {number} columnIndex - The index of the column to delete
             */
            deleteColumn(row, columnIndex) {
                try {
                    // Validate input parameters
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided to deleteColumn');
                        return;
                    }

                    if (columnIndex === undefined || isNaN(parseInt(columnIndex))) {
                        console.error('Invalid column index provided to deleteColumn');
                        return;
                    }

                    // Ensure the rows store is valid
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }

                    // Find the row in the store
                    const rowIndex = storeRows.findIndex(r => r.id === row.id);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${row.id} not found in rows store`);
                        return;
                    }

                    // Ensure the row has a columns array
                    if (!Array.isArray(storeRows[rowIndex].columns)) {
                        console.error(`Row with id ${row.id} has no valid columns array`);
                        return;
                    }

                    // Ensure the column index is valid
                    if (columnIndex < 0 || columnIndex >= storeRows[rowIndex].columns.length) {
                        console.error(`Column index ${columnIndex} out of bounds for row with id ${row.id}`);
                        return;
                    }

                    // Check if the column has any elements that would be lost
                    const columnToDelete = storeRows[rowIndex].columns[columnIndex];
                    const hasElements = columnToDelete && 
                                    columnToDelete.elements && 
                                    Array.isArray(columnToDelete.elements) && 
                                    columnToDelete.elements.length > 0;

                    if (hasElements) {
                        // Store references for use in confirmation
                        this.columnToDeleteRowId = row.id;
                        this.columnToDeleteIndex = columnIndex;
                        
                        // Show confirmation dialog
                        this.$dispatch('open-modal', { id: 'confirm-column-deletion' });
                    } else {
                        // If no elements exist, proceed with deletion without confirmation
                        this.performColumnDeletion(row.id, columnIndex);
                    }
                } catch (error) {
                    console.error('Error during column deletion process:', error);
                    // Reset state in case of error
                    this.columnToDeleteRowId = null;
                    this.columnToDeleteIndex = null;
                }
            },

            /**
             * Confirms column deletion after user approval
             * Called from the confirmation modal
             */
            confirmColumnDeletion() {
                try {
                    // Validate that we have column data to delete
                    if (this.columnToDeleteRowId === null || this.columnToDeleteIndex === null) {
                        console.error('No valid column to delete');
                        this.$dispatch('close-modal', { id: 'confirm-column-deletion' });
                        return;
                    }
                    
                    // Perform the actual deletion
                    this.performColumnDeletion(this.columnToDeleteRowId, this.columnToDeleteIndex);
                    
                    // Close the confirmation modal
                    this.$dispatch('close-modal', { id: 'confirm-column-deletion' });
                    
                    // Reset the state
                    this.columnToDeleteRowId = null;
                    this.columnToDeleteIndex = null;
                } catch (error) {
                    console.error('Error during column deletion confirmation:', error);
                    // Ensure the modal is closed and state is reset even if an error occurs
                    this.$dispatch('close-modal', { id: 'confirm-column-deletion' });
                    this.columnToDeleteRowId = null;
                    this.columnToDeleteIndex = null;
                }
            },

            /**
             * Performs the actual column deletion and updates the layout
             * 
             * @param {number|string} rowId - The ID of the row containing the column
             * @param {number} columnIndex - The index of the column to delete
             */
            performColumnDeletion(rowId, columnIndex) {
                try {
                    // Validate parameters
                    if (rowId === null || rowId === undefined) {
                        console.error('Invalid rowId provided to performColumnDeletion');
                        return;
                    }
                    
                    if (columnIndex === null || columnIndex === undefined || isNaN(parseInt(columnIndex))) {
                        console.error('Invalid columnIndex provided to performColumnDeletion');
                        return;
                    }
                    
                    // Get reference to the rows store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    // Find the row in the store
                    const rowIndex = storeRows.findIndex(r => r.id === rowId);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${rowId} not found in rows store`);
                        return;
                    }
                    
                    // Ensure the row has a columns array
                    if (!Array.isArray(storeRows[rowIndex].columns)) {
                        console.error(`Row with id ${rowId} has no valid columns array`);
                        return;
                    }
                    
                    // Ensure the column index is valid
                    if (columnIndex < 0 || columnIndex >= storeRows[rowIndex].columns.length) {
                        console.error(`Column index ${columnIndex} out of bounds for row with id ${rowId}`);
                        return;
                    }
                    
                    // Check if this is the last column in the row
                    if (storeRows[rowIndex].columns.length === 1) {
                        // Instead of deleting the row, clear the column's elements
                        const timestamp = Date.now();
                        
                        // Create a fresh empty column with the same ID
                        storeRows[rowIndex].columns = [{
                            id: storeRows[rowIndex].columns[0].id, // Keep the same ID
                            elements: [], // Clear elements
                            order: 0, // Reset order
                            width: 'w-full', // Reset width
                            padding: { top: 0, right: 0, bottom: 0, left: 0 },
                            margin: { top: 0, right: 0, bottom: 0, left: 0 },
                            customClasses: ''
                        }];
                        
                        // Provide feedback to console (could be a toast notification instead)
                        console.log('Column content cleared instead of deletion, as it was the last column in the row');
                    } else {
                        // Remove the column at the specified index
                        storeRows[rowIndex].columns.splice(columnIndex, 1);
                        
                        // Update the order property of all remaining columns
                        storeRows[rowIndex].columns = storeRows[rowIndex].columns.map((column, index) => ({
                            ...column,
                            order: index // Reassign order based on array position
                        }));
                    }
                    
                    // Update the UI immediately
                    this.updateCanvasData();
                    
                    // Save the updated layout to the server
                    try {
                        const layoutData = JSON.stringify(storeRows);
                        this.$wire.saveLayout(layoutData)
                            .then(response => {
                                if (response && response.success) {
                                    console.log('Layout updated and saved successfully');
                                } else {
                                    console.warn('Layout saved but returned unexpected result', response);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout after column operation:', error);
                            });
                    } catch (jsonError) {
                        console.error('Error stringifying layout after column operation:', jsonError);
                    }
                } catch (error) {
                    console.error('Error performing column deletion:', error);
                    // Try to refresh the canvas data to ensure UI consistency
                    this.updateCanvasData();
                }
            },

            /**
             * Sets the active column for adding elements
             * 
             * @param {Object} row - The parent row object
             * @param {number} index - The index of the column to set as active
             */
            setActiveColumn(row, index) {
                try {
                    // Validate input parameters
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided to setActiveColumn');
                        return;
                    }
                    
                    if (index === undefined || index === null || isNaN(parseInt(index))) {
                        console.error('Invalid column index provided to setActiveColumn');
                        return;
                    }
                    
                    // Find the row in the store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    const foundRow = storeRows.find(r => r.id === row.id);
                    if (!foundRow) {
                        console.error(`Row with id ${row.id} not found in rows store`);
                        return;
                    }
                    
                    // Ensure the column index is valid
                    if (index < 0 || index >= foundRow.columns.length) {
                        console.error(`Column index ${index} out of bounds for row with id ${row.id}`);
                        return;
                    }
                    
                    // Check if column already has an element
                    const column = foundRow.columns[index];
                    if (column.elements && Array.isArray(column.elements) && column.elements.length > 0) {
                        console.warn('Column already has an element. Only one element per column is allowed.');
                        return;
                    }
                    
                    // Set the active row and column index
                    this.activeRow = foundRow;
                    this.activeColumnIndex = index;
                    
                    // Open the element picker modal
                    this.$dispatch('open-modal', { id: 'element-picker-modal' });
                } catch (error) {
                    console.error('Error setting active column:', error);
                    // Reset state in case of error
                    this.activeRow = null;
                    this.activeColumnIndex = null;
                }
            },

            /**
             * Adds a new element to the active column
             * 
             * @param {string} elementType - The type of element to add
             */
            addElement(elementType) {
                try {
                    // Validate input parameters
                    if (!elementType || typeof elementType !== 'string') {
                        console.error('Invalid element type provided to addElement');
                        return;
                    }
                    
                    // Validate that we have an active row and column
                    if (!this.activeRow || this.activeColumnIndex === null) {
                        console.error('No active row or column to add element to');
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    // Find the row in the store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    const rowIndex = storeRows.findIndex(r => r.id === this.activeRow.id);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${this.activeRow.id} not found in rows store`);
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    // Ensure the column index is valid
                    const row = storeRows[rowIndex];
                    if (!Array.isArray(row.columns)) {
                        console.error(`Row with id ${row.id} has no valid columns array`);
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    if (this.activeColumnIndex < 0 || this.activeColumnIndex >= row.columns.length) {
                        console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${row.id}`);
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    // Check if column already has an element
                    const column = row.columns[this.activeColumnIndex];
                    if (!Array.isArray(column.elements)) {
                        column.elements = [];
                    } else if (column.elements.length > 0) {
                        console.warn('Column already has an element. Only one element per column is allowed.');
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                        return;
                    }
                    
                    // Format the element type to include namespace
                    const formattedType = elementType.replace(/Filamentor/, '\\Filamentor\\').replace(/Elements/, 'Elements\\');
                    
                    // Create initial content based on element type
                    let initialContent = {};
                    if (formattedType.includes('Text')) {
                        initialContent = { text: '' };
                    } else if (formattedType.includes('Image')) {
                        initialContent = { url: null, alt: '', thumbnail: null };
                    } else if (formattedType.includes('Video')) {
                        initialContent = { url: '' };
                    }
                    
                    // Add the element to the column
                    storeRows[rowIndex].columns[this.activeColumnIndex].elements.push({
                        id: Date.now(), // Add unique ID for the element
                        type: formattedType,
                        content: initialContent
                    });
                    
                    // Update the UI immediately
                    this.updateCanvasData();
                    
                    // Save the updated layout to the server
                    try {
                        const layoutData = JSON.stringify(storeRows);
                        this.$wire.saveLayout(layoutData)
                            .then(response => {
                                if (response && response.success) {
                                    console.log('Element added and layout saved successfully');
                                } else {
                                    console.warn('Layout saved but returned unexpected result', response);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout after adding element:', error);
                            });
                    } catch (jsonError) {
                        console.error('Error stringifying layout after adding element:', jsonError);
                    }
                    
                    // Close the element picker modal
                    this.$dispatch('close-modal', { id: 'element-picker-modal' });
                    
                    // Reset the active column and row
                    this.activeRow = null;
                    this.activeColumnIndex = null;
                } catch (error) {
                    console.error('Error adding element:', error);
                    // Close the modal and reset state in case of error
                    this.$dispatch('close-modal', { id: 'element-picker-modal' });
                    this.activeRow = null;
                    this.activeColumnIndex = null;
                }
            },
            
            /**
             * Opens the element editor modal for editing an existing element
             * 
             * @param {Object} row - The row object containing the element
             * @param {number} columnIndex - The index of the column containing the element
             * @param {number} elementIndex - The index of the element to edit (defaults to 0)
             */
            editElement(row, columnIndex, elementIndex = 0) {
                try {
                    // Validate input parameters
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided to editElement');
                        return;
                    }
                    
                    if (columnIndex === undefined || columnIndex === null || isNaN(parseInt(columnIndex))) {
                        console.error('Invalid column index provided to editElement');
                        return;
                    }
                    
                    if (elementIndex === undefined || elementIndex === null || isNaN(parseInt(elementIndex))) {
                        console.error('Invalid element index provided to editElement');
                        return;
                    }
                    
                    // Get reference to the rows store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    // Find the row in the store
                    const storeRow = storeRows.find(r => r.id === row.id);
                    if (!storeRow) {
                        console.error(`Row with id ${row.id} not found in rows store`);
                        return;
                    }
                    
                    // Validate column exists
                    if (!Array.isArray(storeRow.columns) || columnIndex >= storeRow.columns.length) {
                        console.error(`Column index ${columnIndex} out of bounds for row with id ${row.id}`);
                        return;
                    }
                    
                    // Validate column has elements
                    const column = storeRow.columns[columnIndex];
                    if (!Array.isArray(column.elements) || column.elements.length === 0) {
                        console.error(`No elements found in column ${columnIndex} of row with id ${row.id}`);
                        return;
                    }
                    
                    // Validate element index
                    if (elementIndex >= column.elements.length) {
                        console.error(`Element index ${elementIndex} out of bounds for column ${columnIndex}`);
                        return;
                    }
                    
                    // Get the element to edit
                    const element = column.elements[elementIndex];
                    if (!element || !element.type) {
                        console.error(`Invalid element at index ${elementIndex}`);
                        return;
                    }
                    
                    // Store references to the active elements
                    this.activeRow = storeRow;
                    this.activeColumnIndex = columnIndex;
                    this.activeElementIndex = elementIndex;
                    this.activeElement = element;
                    
                    // Determine element type
                    const elementType = element.type;
                    if (!elementType) {
                        console.error('Element has no type');
                        return;
                    }
                    
                    // Reset all elementData to prevent data leakage between edits
                    try {
                        this.$wire.set('elementData', {
                            text: { content: null },
                            image: { url: null, alt: null, thumbnail: null },
                            video: { url: null }
                        });
                    } catch (error) {
                        console.error('Error resetting element data:', error);
                        return;
                    }
                    
                    // Set content based on element's actual type
                    try {
                        if (elementType.includes('Text')) {
                            // Handle text elements
                            const content = element.content && typeof element.content.text !== 'undefined' 
                                ? element.content.text 
                                : '';
                                
                            this.$wire.set('elementData.text.content', content);
                        } else if (elementType.includes('Image')) {
                            // Handle image elements
                            const imageContent = {
                                url: element.content && element.content.url ? element.content.url : null,
                                alt: element.content && element.content.alt ? element.content.alt : '',
                                thumbnail: element.content && element.content.thumbnail ? element.content.thumbnail : null
                            };
                            
                            this.$wire.set('elementData.image', imageContent);
                        } else if (elementType.includes('Video')) {
                            // Handle video elements
                            const videoUrl = element.content && element.content.url ? element.content.url : '';
                            
                            this.$wire.set('elementData.video.url', videoUrl);
                        } else {
                            console.warn(`Unknown element type: ${elementType}`);
                        }
                    } catch (error) {
                        console.error('Error setting element data:', error);
                        return;
                    }
                    
                    // Call the Livewire method to prepare for editing
                    try {
                        this.$wire.editElement(elementType, element.content || {}, element.id)
                            .catch(error => {
                                console.error('Error in Livewire editElement method:', error);
                            });
                    } catch (error) {
                        console.error('Error calling Livewire editElement method:', error);
                        return;
                    }
                    
                    // Extract element type name for display
                    const elementTypeName = elementType.split('\\').pop() || 'Unknown';
                    
                    // Open the element editor modal
                    this.$dispatch('open-modal', { 
                        id: 'element-editor-modal',
                        title: `Edit ${elementTypeName} Element`
                    });
                } catch (error) {
                    console.error('Error editing element:', error);
                    // Reset state in case of error
                    this.activeRow = null;
                    this.activeColumnIndex = null;
                    this.activeElementIndex = null;
                    this.activeElement = null;
                }
            },
            
            /**
             * Saves the edited element content back to the data store
             * 
             * @param {Object} content - The content object from the editor (optional, may not be used)
             */
            saveElementContent(content) {
                try {
                    // Validate that we have an active element to update
                    if (!this.activeElement) {
                        console.error('No active element to save content for');
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    // Validate that we have active row and column references
                    if (!this.activeRow || this.activeColumnIndex === null || this.activeElementIndex === null) {
                        console.error('Missing required references for element update');
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    // Find the row in the store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    const rowIndex = storeRows.findIndex(r => r.id === this.activeRow.id);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${this.activeRow.id} not found in rows store`);
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    // Validate column and element indices
                    const row = storeRows[rowIndex];
                    if (!Array.isArray(row.columns) || this.activeColumnIndex >= row.columns.length) {
                        console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${row.id}`);
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    const column = row.columns[this.activeColumnIndex];
                    if (!Array.isArray(column.elements) || this.activeElementIndex >= column.elements.length) {
                        console.error(`Element index ${this.activeElementIndex} out of bounds for column ${this.activeColumnIndex}`);
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        return;
                    }
                    
                    // Determine the element type and handle accordingly
                    const elementType = this.activeElement.type;
                    
                    // Handler function to save the layout and close the modal
                    const saveAndClose = () => {
                        try {
                            const layoutData = JSON.stringify(storeRows);
                            this.$wire.saveLayout(layoutData)
                                .then(response => {
                                    if (response && response.success) {
                                        console.log('Element content updated and layout saved successfully');
                                    } else {
                                        console.warn('Layout saved but returned unexpected result', response);
                                    }
                                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                                })
                                .catch(error => {
                                    console.error('Error saving layout after updating element content:', error);
                                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                                });
                        } catch (error) {
                            console.error('Error processing layout data:', error);
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        }
                    };
                    
                    // Process based on element type
                    if (elementType.includes('Image')) {
                        // Get the current alt text value that needs to be saved
                        const altText = this.$wire.get('elementData.image.alt') || '';
                        
                        // First, try to upload any new image if it exists - Livewire will handle if there's no actual upload
                        this.$wire.uploadMedia()
                            .then(response => {
                                // Check if we got a response with upload data
                                if (response && response.url) {
                                    // New image was uploaded - update with new image data
                                    storeRows[rowIndex].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                                        ...this.activeElement,
                                        content: {
                                            url: response.url,
                                            thumbnail: response.thumbnail,
                                            alt: altText // Use the alt text we captured earlier
                                        }
                                    };
                                } else {
                                    // No new image was uploaded - update only the alt text
                                    const currentContent = this.activeElement.content || {};
                                    storeRows[rowIndex].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                                        ...this.activeElement,
                                        content: {
                                            url: currentContent.url || '',
                                            thumbnail: currentContent.thumbnail || '',
                                            alt: altText // Update only the alt text
                                        }
                                    };
                                }
                                
                                // Save and close in either case
                                saveAndClose();
                            })
                            .catch(error => {
                                console.error('Error during image processing:', error);
                                
                                // Even if upload fails, still try to save alt text changes
                                try {
                                    const currentContent = this.activeElement.content || {};
                                    storeRows[rowIndex].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                                        ...this.activeElement,
                                        content: {
                                            url: currentContent.url || '',
                                            thumbnail: currentContent.thumbnail || '',
                                            alt: altText
                                        }
                                    };
                                    saveAndClose();
                                } catch (fallbackError) {
                                    console.error('Error saving alt text after upload failure:', fallbackError);
                                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                                }
                            });
                    } else if (elementType.includes('Video')) {
                        // Update video element
                        try {
                            const videoUrl = this.$wire.get('elementData.video.url');
                            
                            // Basic validation
                            if (!videoUrl) {
                                console.warn('Empty video URL provided');
                            }
                            
                            // Update the element with the new video data
                            storeRows[rowIndex].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                                ...this.activeElement,
                                content: { 
                                    url: videoUrl || ''
                                }
                            };
                            
                            // Save and close
                            saveAndClose();
                        } catch (error) {
                            console.error('Error updating video element:', error);
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        }
                    } else if (elementType.includes('Text')) {
                        // Update text element
                        try {
                            const textContent = this.$wire.get('elementData.text.content');
                            
                            // Update the element with the new text content
                            storeRows[rowIndex].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                                ...this.activeElement,
                                content: { 
                                    text: textContent || '' 
                                }
                            };
                            
                            // Save and close
                            saveAndClose();
                        } catch (error) {
                            console.error('Error updating text element:', error);
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        }
                    } else {
                        // Unknown element type
                        console.error(`Unknown element type: ${elementType}`);
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                    }
                } catch (error) {
                    console.error('Error saving element content:', error);
                    // Always close the modal in case of error to prevent UI being stuck
                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                    // Reset active elements
                    this.activeRow = null;
                    this.activeColumnIndex = null;
                    this.activeElementIndex = null;
                    this.activeElement = null;
                }
            },

            /**
             * Deletes an element from a column
             * 
             * @param {Object} row - The row object containing the element
             * @param {number} columnIndex - The index of the column containing the element
             * @param {number} elementIndex - The index of the element to delete (defaults to 0)
             */
            deleteElement(row, columnIndex, elementIndex = 0) {
                try {
                    // Validate input parameters
                    if (!row || typeof row !== 'object' || !row.id) {
                        console.error('Invalid row provided to deleteElement');
                        return;
                    }
                    
                    if (columnIndex === undefined || columnIndex === null || isNaN(parseInt(columnIndex))) {
                        console.error('Invalid column index provided to deleteElement');
                        return;
                    }
                    
                    if (elementIndex === undefined || elementIndex === null || isNaN(parseInt(elementIndex))) {
                        console.error('Invalid element index provided to deleteElement');
                        return;
                    }
                    
                    // Get reference to the rows store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows || !Array.isArray(storeRows)) {
                        console.error('Rows store not properly initialized');
                        return;
                    }
                    
                    // Find the row in the store
                    const rowIndex = storeRows.findIndex(r => r.id === row.id);
                    if (rowIndex === -1) {
                        console.error(`Row with id ${row.id} not found in rows store`);
                        return;
                    }
                    
                    // Validate column exists
                    if (!Array.isArray(storeRows[rowIndex].columns) || columnIndex >= storeRows[rowIndex].columns.length) {
                        console.error(`Column index ${columnIndex} out of bounds for row with id ${row.id}`);
                        return;
                    }
                    
                    // Validate column has elements array
                    const column = storeRows[rowIndex].columns[columnIndex];
                    if (!Array.isArray(column.elements)) {
                        console.error(`Column ${columnIndex} has no elements array`);
                        return;
                    }
                    
                    // Validate element index
                    if (elementIndex >= column.elements.length) {
                        console.error(`Element index ${elementIndex} out of bounds for column ${columnIndex}`);
                        return;
                    }
                    
                    // Remove the element from the column
                    storeRows[rowIndex].columns[columnIndex].elements.splice(elementIndex, 1);
                    
                    // Update the UI immediately
                    this.updateCanvasData();
                    
                    // Save the updated layout to the server
                    try {
                        const layoutData = JSON.stringify(storeRows);
                        this.$wire.saveLayout(layoutData)
                            .then(response => {
                                if (response && response.success) {
                                    console.log('Element deleted and layout saved successfully');
                                } else {
                                    console.warn('Layout saved after element deletion but returned unexpected result', response);
                                }
                            })
                            .catch(error => {
                                console.error('Error saving layout after element deletion:', error);
                            });
                    } catch (jsonError) {
                        console.error('Error stringifying layout after element deletion:', jsonError);
                    }
                } catch (error) {
                    console.error('Error deleting element:', error);
                    // Try to refresh the canvas data to ensure UI consistency
                    this.updateCanvasData();
                }
            },
            
            /**
             * Updates the canvas data in both the DOM and Livewire component
             * Synchronizes the Alpine store data with the form input and Livewire state
             */
            updateCanvasData() {
                try {
                    // Get reference to the rows store
                    const storeRows = Alpine.store('rows').items;
                    if (!storeRows) {
                        console.error('Rows store is not properly initialized');
                        return;
                    }
                    
                    // Convert the store data to JSON
                    let jsonData;
                    try {
                        jsonData = JSON.stringify(storeRows);
                    } catch (jsonError) {
                        console.error('Error converting layout data to JSON:', jsonError);
                        return;
                    }
                    
                    // Update the hidden input field if it exists
                    if (this.$refs.canvasData) {
                        try {
                            this.$refs.canvasData.value = jsonData;
                        } catch (refError) {
                            console.error('Error updating canvas data reference:', refError);
                            // Continue execution since we have other ways to save the data
                        }
                    } else {
                        console.warn('Canvas data reference not found in DOM');
                    }
                    
                    // Update the Livewire component property
                    try {
                        this.$wire.set('data.layout', jsonData)
                            .catch(wireError => {
                                console.error('Error updating Livewire data.layout property:', wireError);
                            });
                    } catch (wireSetError) {
                        console.error('Error calling Livewire set method:', wireSetError);
                    }
                    
                    console.log('Canvas data updated successfully');
                } catch (error) {
                    console.error('Unexpected error in updateCanvasData:', error);
                }
            },

            // Helper function to safely parse numbers
            safeParseNumber(value) {
                try {
                    const parsed = Number(value);
                    return isNaN(parsed) ? 0 : parsed;
                } catch {
                    return 0;
                }
            }
        };
    });
});
