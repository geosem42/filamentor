import '../css/filamentor.css';
import './store';
import { createDragHandlers } from './dragHandlers';

console.log('Filamentor loaded!');

window.addEventListener('alpine:init', () => {
    console.log('Alpine init event fired!');

    Alpine.data('filamentor', () => {
        console.log('Component definition called');
        return {
            showSettings: false,
            activeRow: null,
            activeColumn: null,
            activeColumnIndex: null,
            activeElement: null,
            activeElementIndex: null,
            rowToDelete: null,
            elementData: {
                text: { content: null },
                image: { url: null, alt: null, thumbnail: null },
                video: { url: null }
            },
            ...createDragHandlers(window.Livewire),

            init() {
                const savedLayout = this.$refs.canvasData.value;
                if (savedLayout) {
                    const parsedRows = JSON.parse(savedLayout).sort((a, b) => a.order - b.order);
                    Alpine.store('rows').setRows(parsedRows);
                }
            },         

            openRowSettings(row) {
                this.activeRow = Alpine.store('rows').items.find(r => r.id === row.id);
                if (!this.activeRow.padding) this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeRow.margin) this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeRow.customClasses) this.activeRow.customClasses = '';
                this.showSettings = true;
            },

            saveRowSettings() {
                if (!this.activeRow) return;
                console.log('Saving row settings:', this.activeRow);

                const index = Alpine.store('rows').items.findIndex(row => row.id === this.activeRow.id);
                console.log('Found Index:', index);
                Alpine.store('rows').items[index] = {
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
            
                const layoutData = JSON.stringify(Alpine.store('rows').items);
                console.log('Layout Data:', layoutData);
                this.$refs.canvasData.value = layoutData;
                this.$wire.saveLayout(layoutData);
                
                //this.$dispatch('close-modal', { id: 'row-settings-modal' });
            },

            addRow() {
                console.log('Adding new row');
                const row = {
                    id: Date.now(),
                    order: Alpine.store('rows').items.length,
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
                
                Alpine.store('rows').items.push(row);
                this.updateCanvasData();
                this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
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
                const index = Alpine.store('rows').items.findIndex(r => r.id === row.id);
                if (index > -1) {
                    Alpine.store('rows').items.splice(index, 1);
                    // Update remaining rows order
                    Alpine.store('rows').items = Alpine.store('rows').items.map((row, index) => ({
                        ...row,
                        order: index
                    }));
                    this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
                }
            },

            openColumnSettings(row, column) {
                this.activeRow = row;
                this.activeColumn = column;
                
                if (!this.activeColumn.padding) this.activeColumn.padding = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeColumn.margin) this.activeColumn.margin = { top: 0, right: 0, bottom: 0, left: 0 };
                if (!this.activeColumn.customClasses) this.activeColumn.customClasses = '';
            },            

            saveColumnSettings() {
                if (!this.activeColumn) return;
            
                const storeRows = Alpine.store('rows').items;
                const rowIndex = storeRows.findIndex(row => row.id === this.activeRow.id);
                const columnIndex = storeRows[rowIndex].columns.findIndex(col => col.id === this.activeColumn.id);
                
                storeRows[rowIndex].columns[columnIndex] = {
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
            
                this.$wire.saveLayout(JSON.stringify(storeRows));
                this.$dispatch('close-modal', { id: 'column-settings-modal' });
            },

            addColumn(row) {
                const newColumn = {
                    id: Date.now(),
                    elements: [],
                    order: row.columns.length,
                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                    customClasses: ''
                };
            
                const updatedColumns = [...row.columns, newColumn];
                row.columns = updatedColumns;
            
                this.$nextTick(() => {
                    const storeRows = Alpine.store('rows').items;
                    this.$wire.saveLayout(JSON.stringify(storeRows));
                });
            },            

            updateColumns(newCount) {
                newCount = parseInt(newCount);
                const currentColumns = this.activeRow.columns;

                if (newCount > currentColumns.length) {
                    const columnsToAdd = newCount - currentColumns.length;
                    for (let i = 0; i < columnsToAdd; i++) {
                        currentColumns.push({
                            id: Date.now() + i,
                            elements: [],
                            order: currentColumns.length,
                            padding: { top: 0, right: 0, bottom: 0, left: 0 },
                            margin: { top: 0, right: 0, bottom: 0, left: 0 },
                            customClasses: ''
                        });
                    }

                    this.activeRow.columns.forEach((column, index) => {
                        column.order = index;
                    });

                    const storeRows = Alpine.store('rows').items;
                    this.$wire.saveLayout(JSON.stringify(storeRows));
                } else {
                    this.newColumnCount = newCount;
                    this.$dispatch('open-modal', { id: 'confirm-column-reduction' });
                }
            },

            deleteColumn(row, columnIndex) {
                const storeRows = Alpine.store('rows').items;
                const rowIndex = storeRows.findIndex(r => r.id === row.id);
                storeRows[rowIndex].columns.splice(columnIndex, 1);
                
                this.$wire.saveLayout(JSON.stringify(storeRows));
            },

            setActiveColumn(row, index) {
                this.activeRow = Alpine.store('rows').items.find(r => r.id === row.id);
                this.activeColumnIndex = index;
                this.$dispatch('open-modal', { id: 'element-picker-modal' });
            },

            addElement(elementType) {
                if (this.activeRow && this.activeColumnIndex !== null) {
                    const formattedType = elementType.replace(/Filamentor/, '\\Filamentor\\').replace(/Elements/, 'Elements\\');
                    
                    let initialContent = {};
                    if (formattedType.includes('Text')) {
                        initialContent = { text: '' };
                    } else if (formattedType.includes('Image')) {
                        initialContent = { url: null, alt: '', thumbnail: null };
                    } else if (formattedType.includes('Video')) {
                        initialContent = { url: '' };
                    }
            
                    // Get the active row from Alpine store
                    const rowIndex = Alpine.store('rows').items.findIndex(r => r.id === this.activeRow.id);
                    if (rowIndex > -1) {
                        // Add the element to the column in the store
                        Alpine.store('rows').items[rowIndex].columns[this.activeColumnIndex].elements.push({
                            id: Date.now(), // Add unique ID for the element
                            type: formattedType,
                            content: initialContent
                        });
            
                        // Save the updated layout
                        this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
                        this.$dispatch('close-modal', { id: 'element-picker-modal' });
                    }
                }
            },
            
            editElement(row, columnIndex, elementIndex = 0) {
                // Find the row in the store
                const storeRow = Alpine.store('rows').items.find(r => r.id === row.id);
                if (!storeRow || !storeRow.columns[columnIndex].elements.length) {
                    return;
                }
            
                const element = storeRow.columns[columnIndex].elements[elementIndex];
                console.log('Element being edited:', element);
                console.log('Element type:', element.type);
                console.log('Element content:', element.content);
            
                this.activeRow = storeRow;
                this.activeColumnIndex = columnIndex;
                this.activeElementIndex = elementIndex;
                this.activeElement = element;
            
                // Reset all elementData
                this.$wire.set('elementData', {
                    text: { content: null },
                    image: { url: null, alt: null, thumbnail: null },
                    video: { url: null }
                });
                
                // Set content based on element's actual type
                const elementType = element.type;
                if (elementType.includes('Text')) {
                    this.$wire.set('elementData.text.content', element.content.text || '');
                } else if (elementType.includes('Image')) {
                    this.$wire.set('elementData.image', {
                        url: element.content?.url || null,
                        alt: element.content?.alt || '',
                        thumbnail: element.content?.thumbnail || null
                    });
                } else if (elementType.includes('Video')) {
                    this.$wire.set('elementData.video.url', element.content?.url || '');
                }
            
                this.$wire.editElement(elementType, element.content, element.id);
            
                this.$dispatch('open-modal', { 
                    id: 'element-editor-modal',
                    title: `Edit ${elementType.split('\\').pop()} Element`
                });
            },
            
            saveElementContent(content) {
                if (!this.activeElement) return;
                
                // Find the row in the store
                const rowIndex = Alpine.store('rows').items.findIndex(r => r.id === this.activeRow.id);
                if (rowIndex === -1) return;
            
                // Update the element content in the store
                if (this.activeElement.type.includes('Image')) {
                    this.$wire.uploadMedia().then(response => {
                        const elementIndex = this.activeElementIndex || 0;
                        Alpine.store('rows').items[rowIndex].columns[this.activeColumnIndex].elements[elementIndex] = {
                            ...this.activeElement,
                            content: {
                                url: response.url,
                                thumbnail: response.thumbnail,
                                alt: this.$wire.get('elementData.image.alt') || ''
                            }
                        };
                        
                        this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                    });
                } else if (this.activeElement.type.includes('Video')) {
                    const elementIndex = this.activeElementIndex || 0;
                    Alpine.store('rows').items[rowIndex].columns[this.activeColumnIndex].elements[elementIndex] = {
                        ...this.activeElement,
                        content: { 
                            url: this.$wire.get('elementData.video.url') 
                        }
                    };
                    
                    this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                } else {
                    const elementIndex = this.activeElementIndex || 0;
                    Alpine.store('rows').items[rowIndex].columns[this.activeColumnIndex].elements[elementIndex] = {
                        ...this.activeElement,
                        content: { 
                            text: this.$wire.get('elementData.text.content') 
                        }
                    };
                    
                    this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
                }
            },
            
            deleteElement(row, columnIndex, elementIndex = 0) {
                // Find the row in the store
                const rowIndex = Alpine.store('rows').items.findIndex(r => r.id === row.id);
                if (rowIndex === -1) return;
                
                // Remove the element from the column
                Alpine.store('rows').items[rowIndex].columns[columnIndex].elements.splice(elementIndex, 1);
                
                // Save the updated layout
                this.$wire.saveLayout(JSON.stringify(Alpine.store('rows').items));
            },
            
            updateCanvasData() {
                const jsonData = JSON.stringify(Alpine.store('rows').items);
                this.$refs.canvasData.value = jsonData;
                this.$wire.set('data.layout', jsonData);
            }
            
        };
    });
});
