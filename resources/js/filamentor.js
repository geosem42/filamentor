import '../css/filamentor.css';
import { ColumnManager } from './ColumnManager';
import sort from '@alpinejs/sort';

console.log('Filamentor loaded!');

window.ColumnManager = ColumnManager;

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
            elementData: {
                text: { content: null },
                image: { url: null, alt: null, thumbnail: null },
                video: { url: null }
            },            

            init() {
                this.rows = this.$wire.get('data');
                console.log('Filamentor initialized from JS!');
                console.log('Raw canvas data:', this.$refs.canvasData.value);

                const savedLayout = this.$refs.canvasData.value;
                if (savedLayout) {
                    this.rows = JSON.parse(savedLayout).sort((a, b) => a.order - b.order);
                    console.log('Sorted initial rows:', this.rows);
                }
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
                    const formattedType = elementType.replace(/Filamentor/, '\\Filamentor\\').replace(/Elements/, 'Elements\\');
                    
                    let initialContent = {};
                    if (formattedType.includes('Text')) {
                        initialContent = { text: '' };
                    } else if (formattedType.includes('Image')) {
                        initialContent = { url: null, alt: '', thumbnail: null };
                    } else if (formattedType.includes('Video')) {
                        initialContent = { url: '' };
                    }
            
                    this.activeRow.columns[this.activeColumnIndex].elements.push({
                        type: formattedType,
                        content: initialContent
                    });
            
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                }
            },            

            editElement(row, columnIndex) {
                if (!row.columns[columnIndex].elements.length) {
                    return;
                }
            
                const element = row.columns[columnIndex].elements[0];
                console.log('Element being edited:', element);
                console.log('Element type:', element.type);
                console.log('Element content:', element.content);
                console.log('Full row data:', row);
                console.log('Column index:', columnIndex);
                const elementId = element.id;
                this.activeRow = row;
                this.activeColumnIndex = columnIndex;
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
            
                this.$wire.editElement(elementType, element.content, elementId);
            
                this.$dispatch('open-modal', { 
                    id: 'element-editor-modal',
                    title: `Edit ${elementType.split('\\').pop()} Element`
                });
            },            
            
            saveElementContent(content) {
                if (this.activeElement) {
                    if (this.activeElement.type.includes('Image')) {
                        this.$wire.uploadMedia().then(response => {
                            this.activeElement.content = {
                                url: response.url,
                                thumbnail: response.thumbnail,
                                alt: this.$wire.get('elementData.image.alt') || ''
                            };
                            this.$wire.saveLayout(JSON.stringify(this.rows));
                            this.$dispatch('close-modal', { id: 'element-editor-modal' });
                        });
                    } else if (this.activeElement.type.includes('Video')) {
                        this.activeElement.content = { 
                            url: this.$wire.get('elementData.video.url') 
                        };
                        this.$wire.saveLayout(JSON.stringify(this.rows));
                        this.$dispatch('close-modal', { id: 'element-editor-modal' });
                    } else {
                        this.activeElement.content = { 
                            text: this.$wire.get('elementData.text.content') 
                        };
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
