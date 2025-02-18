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
            activeColumn: null,
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
                if (!this.activeRow.padding) this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeRow.margin) this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeRow.customClasses) this.activeRow.customClasses = '';
                this.showSettings = true;
            },
            
            openColumnSettings(row, columnIndex) {
                this.activeRow = row;
                this.activeColumn = row.columns[columnIndex];
                if (!this.activeColumn.padding) this.activeColumn.padding = {};
                if (!this.activeColumn.margin) this.activeColumn.margin = {};
                if (!this.activeColumn.customClasses) this.activeColumn.customClasses = '';
                this.$dispatch('open-modal', { id: 'column-settings-modal' });
            },

            saveRowSettings() {
                const index = this.rows.findIndex(row => row.id === this.activeRow.id);
                this.rows[index] = {
                    ...this.activeRow,
                    padding: {
                        top: Number(this.activeRow.padding.top) || 0,
                        right: Number(this.activeRow.padding.right) || 0,
                        bottom: Number(this.activeRow.padding.bottom) || 0,
                        left: Number(this.activeRow.padding.left) || 0
                    },
                    margin: {
                        top: Number(this.activeRow.margin.top) || 0,
                        right: Number(this.activeRow.margin.right) || 0,
                        bottom: Number(this.activeRow.margin.bottom) || 0,
                        left: Number(this.activeRow.margin.left) || 0
                    }
                };
            
                const layoutData = JSON.stringify(this.rows);
                this.$refs.canvasData.value = layoutData;
                this.$wire.saveLayout(layoutData);
                
                this.$dispatch('close-modal', { id: 'row-settings-modal' });
            },            

            addRow() {
                console.log('Adding new row');
                const row = {
                    id: Date.now(),
                    order: this.rows.length,
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    customClasses: '',
                    columns: [{
                        id: Date.now() + 1,
                        width: 'w-full',
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        },
                        customClasses: '',
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

            addColumn(row) {
                const newColumn = {
                    id: Date.now(),
                    //width: `col-span-${Math.floor(12 / (row.columns.length + 1))}`,
                    elements: [],
                    order: row.columns.length,
                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                    customClasses: ''
                };
            
                /* const updatedColumns = [...row.columns, newColumn].map(column => ({
                    ...column,
                    //width: `col-span-${Math.floor(12 / (row.columns.length + 1))}`
                }));
                row.columns = updatedColumns; */
                const updatedColumns = [...row.columns, newColumn];
                row.columns = updatedColumns;
            
                this.$nextTick(() => {
                    this.rows = [...this.rows];
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                });
            },

            saveColumnSettings() {
                const rowIndex = this.rows.findIndex(row => row.id === this.activeRow.id);
                const columnIndex = this.activeRow.columns.findIndex(col => col.id === this.activeColumn.id);
                
                this.rows[rowIndex].columns[columnIndex] = {
                    ...this.activeColumn,
                    padding: {
                        top: Number(this.activeColumn.padding.top) || 0,
                        right: Number(this.activeColumn.padding.right) || 0,
                        bottom: Number(this.activeColumn.padding.bottom) || 0,
                        left: Number(this.activeColumn.padding.left) || 0
                    },
                    margin: {
                        top: Number(this.activeColumn.margin.top) || 0,
                        right: Number(this.activeColumn.margin.right) || 0,
                        bottom: Number(this.activeColumn.margin.bottom) || 0,
                        left: Number(this.activeColumn.margin.left) || 0
                    }
                };
            
                this.$wire.saveLayout(JSON.stringify(this.rows));
                this.$dispatch('close-modal', { id: 'column-settings-modal' });
            },            
            
            updateColumns(newCount) {
                newCount = parseInt(newCount);
                const currentColumns = this.activeRow.columns;
            
                if (newCount > currentColumns.length) {
                    const columnsToAdd = newCount - currentColumns.length;
                    for (let i = 0; i < columnsToAdd; i++) {
                        currentColumns.push({
                            id: Date.now() + i,
                            //width: `col-span-${Math.floor(12 / newCount)}`,
                            elements: [],
                            order: currentColumns.length,
                            padding: { top: 0, right: 0, bottom: 0, left: 0 },
                            margin: { top: 0, right: 0, bottom: 0, left: 0 },
                            customClasses: ''
                        });
                    }
            
                    this.activeRow.columns.forEach((column, index) => {
                        //column.width = `col-span-${Math.floor(12 / newCount)}`;
                        column.order = index;
                    });
            
                    this.$wire.saveLayout(JSON.stringify(this.rows)).then(() => {
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
            
                if (row.columns.length > 0) {
                    const newWidth = `col-span-${Math.floor(12 / row.columns.length)}`;
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
                    const imageContent = this.activeElement.content?.url || null;
                    this.$wire.set('elementContent', imageContent);
                } else if (this.activeElement.type.includes('Video')) {
                    this.$wire.set('elementContent', this.activeElement.content.url || '');
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
                                url: response.url,
                                thumbnail: response.thumbnail,
                                alt: response.alt
                            };
                            this.$wire.saveLayout(JSON.stringify(this.rows));
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        });
                    } else if (this.activeElement.type.includes('Video')) {
                        this.activeElement.content = { url: content };
                        this.$wire.saveLayout(JSON.stringify(this.rows));
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
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
