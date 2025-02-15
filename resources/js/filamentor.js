import '../css/filamentor.css';
import sort from '@alpinejs/sort';

console.log('Filamentor loaded!');

window.addEventListener('alpine:init', () => {
    console.log('Alpine init event fired!');

    Alpine.plugin(sort);

    Alpine.data('filamentor', () => {
        console.log('Component definition called');
        return {
            rows: [],
            showSettings: false,
            activeRow: null,
            activeColumnIndex: null,
            activeElement: null,
            activeElementIndex: null,
            rowToDelete: null,

            init() {
                this.rows = this.$wire.get('data');
                console.log('Filamentor initialized from JS!');
                console.log('Raw canvas data:', this.$refs.canvasData.value);

                const savedLayout = this.$refs.canvasData.value;
                if (savedLayout) {
                    this.rows = JSON.parse(savedLayout).sort((a, b) => a.order - b.order);
                    console.log('Sorted initial rows:', this.rows);
                }

                // Row sorting
                new Sortable(document.getElementById('rows-container'), {
                    animation: 150,
                    handle: '.row-handle',
                    ghostClass: 'sortable-ghost',
                    onEnd: (evt) => {
                        console.log('Before reorder:', this.rows);

                        const currentRows = [...this.rows];
                        const [movedRow] = currentRows.splice(evt.oldIndex, 1);
                        currentRows.splice(evt.newIndex, 0, movedRow);

                        const updatedRows = currentRows.map((row, index) => ({
                            ...row,
                            order: index
                        }));

                        this.$nextTick(() => {
                            this.rows = updatedRows;
                            console.log('After reorder:', this.rows);
                            this.updateCanvasData();
                            // Explicitly call the Livewire save action
                            this.$wire.saveLayout(JSON.stringify(this.rows));
                        });
                    }
                });
            },

            handleSort: (item, position) => {
                const container = document.querySelector(`[id^="columns-"]`);
                const context = Alpine.$data(container);
                const columns = [...context.columns];
                
                const movedItemIndex = columns.findIndex(col => col.id === parseInt(item));
                const movedItem = columns[movedItemIndex];
                
                columns.splice(movedItemIndex, 1);
                columns.splice(position, 0, movedItem);
                
                const updatedColumns = columns.map((col, idx) => ({
                    ...col,
                    order: idx
                }));
            
                // Force reactivity with a temporary empty state
                context.columns = [];
                
                Alpine.nextTick(() => {
                    context.columns = updatedColumns;
                });
                
                const rowId = container.id.replace('columns-', '');
                
                Livewire.find(container.closest('[wire\\:id]').getAttribute('wire:id'))
                    .call('reorderColumns', rowId, JSON.stringify(updatedColumns));
            },

            openRowSettings(row) {
                this.activeRow = row;
                this.showSettings = true;
            },

            addRow() {
                console.log('Adding new row');
                const row = {
                    id: Date.now(),
                    order: this.rows.length,
                    columns: [{
                        id: Date.now() + 1,
                        width: 'w-full',
                        elements: [],
                        order: 0
                    }]
                };
                
                // Add row to local data
                this.rows.push(row);
                
                // Update the hidden input value
                this.updateCanvasData();

                // Save to server immediately
                this.$wire.saveLayout(JSON.stringify(this.rows));
            },

            deleteRow(row) {
                const hasElements = row.columns.some(col => col.elements && col.elements.length > 0);
                
                if (hasElements) {
                    this.rowToDelete = row;
                    this.$dispatch('open-modal', { id: 'confirm-row-deletion' });
                } else {
                    this.performRowDeletion(row);
                }
            },
            
            confirmRowDeletion() {
                this.performRowDeletion(this.rowToDelete);
                this.$dispatch('close-modal', { id: 'confirm-row-deletion' });
                this.rowToDelete = null;
            },
            
            performRowDeletion(row) {
                const index = this.rows.findIndex(r => r.id === row.id);
                if (index > -1) {
                    this.rows.splice(index, 1);
                    // Update remaining rows order
                    this.rows = this.rows.map((row, index) => ({
                        ...row,
                        order: index
                    }));
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                }
            },

            saveRowSettings() {
                const index = this.rows.findIndex(row => row.id === this.activeRow.id);
                this.rows[index] = this.activeRow;

                const layoutData = JSON.stringify(this.rows);
                this.$refs.canvasData.value = layoutData;

                // Call Livewire action to save
                this.$wire.saveLayout(layoutData);

                console.log('Row settings saved:', this.activeRow);
            },

            addColumn(row) {
                const newColumn = {
                    id: Date.now(),
                    width: `w-${Math.floor(12 / (row.columns.length + 1))}/12`,
                    elements: [],
                    order: row.columns.length
                };
            
                // Create a new columns array with updated widths
                const updatedColumns = [...row.columns, newColumn].map(column => ({
                    ...column,
                    width: `w-${Math.floor(12 / (row.columns.length + 1))}/12`
                }));
            
                // Update the row's columns with the new array
                row.columns = updatedColumns;
            
                // Force a re-render using nextTick
                this.$nextTick(() => {
                    this.rows = [...this.rows];
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                });
            },

            updateColumns(newCount) {
                newCount = parseInt(newCount);
                const currentColumns = this.activeRow.columns;

                if (newCount > currentColumns.length) {
                    // Add new columns
                    const columnsToAdd = newCount - currentColumns.length;
                    for (let i = 0; i < columnsToAdd; i++) {
                        currentColumns.push({
                            id: Date.now() + i,
                            width: `w-${Math.floor(12 / newCount)}/12`,
                            elements: [],
                            order: currentColumns.length
                        });
                    }

                    // Update all column widths
                    this.activeRow.columns.forEach((column, index) => {
                        column.width = `w-${Math.floor(12 / newCount)}/12`;
                        column.order = index;
                    });

                    this.$wire.saveLayout(JSON.stringify(this.rows)).then(() => {
                        // Update Alpine data to reflect changes
                        const rowIndex = this.rows.findIndex(r => r.id === this.activeRow.id);
                        if (rowIndex !== -1) {
                            this.rows[rowIndex].columns = currentColumns;
                        }
                    });
                } else {
                    this.newColumnCount = newCount;
                    this.$dispatch('open-modal', { id: 'confirm-column-reduction' });
                }
            },

            deleteColumn(row, columnIndex) {
                row.columns.splice(columnIndex, 1);

                // Update remaining columns' widths
                if (row.columns.length > 0) {
                    const newWidth = `w-${Math.floor(12 / row.columns.length)}/12`;
                    row.columns.forEach(column => {
                        column.width = newWidth;
                    });
                }

                this.$wire.saveLayout(JSON.stringify(this.rows));
            },

            setActiveColumn(row, index) {
                this.activeRow = row;
                this.activeColumnIndex = index;
                this.$dispatch('open-modal', { id: 'element-picker-modal' });
            },

            addElement(elementType) {
                if (this.activeRow && this.activeColumnIndex !== null) {
                    // Format the element type with proper namespace slashes
                    const formattedType = elementType.replace(/Filamentor/, '\\Filamentor\\').replace(/Elements/, 'Elements\\');
                    
                    console.log('Adding element of type:', formattedType);
            
                    this.activeRow.columns[this.activeColumnIndex].elements.push({
                        type: formattedType,
                        content: {}
                    });
            
                    console.log('Updated row state:', JSON.stringify(this.activeRow));
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                }
            },            

            editElement(row, columnIndex) {
                if (!row.columns[columnIndex].elements.length) {
                    return;
                }
            
                this.activeRow = row;
                this.activeColumnIndex = columnIndex;
                this.activeElement = row.columns[columnIndex].elements[0];
            
                // Clear previous content
                this.$wire.set('elementContent', null);
                
                // Set content based on element type
                if (this.activeElement.type.includes('Text')) {
                    this.$wire.set('elementContent', this.activeElement.content.text || '');
                } else if (this.activeElement.type.includes('Image')) {
                    const imageContent = this.activeElement.content?.url?.url || null;
                    this.$wire.set('elementContent', imageContent);
                }                
            
                this.$wire.editElement(this.activeElement.type);
            
                this.$dispatch('open-modal', { 
                    id: 'element-editor-modal',
                    title: `Edit ${this.activeElement.type.split('\\').pop()} Element`
                });
            },
            
            saveElementContent(content) {
                if (this.activeElement) {
                    if (this.activeElement.type.includes('Image')) {
                        this.$wire.uploadMedia().then(response => {
                            this.activeElement.content = {
                                url: {
                                    url: response.url,
                                    thumbnail: response.thumbnail,
                                    alt: response.alt
                                }
                            };
                            this.$wire.saveLayout(JSON.stringify(this.rows));
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        });
                    } else {
                        this.activeElement.content = { text: content };
                        this.$wire.saveLayout(JSON.stringify(this.rows));
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                    }
                }
            },                                

            deleteElement(row, columnIndex) {
                row.columns[columnIndex].elements = [];
                this.$wire.saveLayout(JSON.stringify(this.rows));
            },

            updateCanvasData() {
                const jsonData = JSON.stringify(this.rows);
                this.$refs.canvasData.value = jsonData;
                this.$wire.set('data.layout', jsonData);
            }
        };
    });
});
