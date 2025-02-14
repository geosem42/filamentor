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

                //this.initializeColumnSorting();
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
                //console.log('Modal trigger:', { row, showSettings: this.showSettings });
                this.activeRow = row;
                this.showSettings = true;
                //console.log('After trigger:', { row: this.activeRow, showSettings: this.showSettings });
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
                this.rows.push(row);
                console.log('Updated rows:', this.rows);
                this.updateCanvasData();
                console.log('Canvas data:', this.$refs.canvasData.value);

                // Initialize sorting for the new row
                this.$nextTick(() => {
                    this.initializeColumnSorting();
                });
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

                row.columns.push(newColumn);

                // Update all column widths
                row.columns.forEach(column => {
                    column.width = `w-${Math.floor(12 / row.columns.length)}/12`;
                });

                this.$wire.saveLayout(JSON.stringify(this.rows));
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
                // Ensure proper namespace formatting
                elementType = 'Geosem42\\Filamentor\\Elements\\Text';

                if (this.activeRow && this.activeColumnIndex !== null) {
                    console.log('Current row state:', JSON.stringify(this.activeRow));

                    this.activeRow.columns[this.activeColumnIndex].elements.push({
                        type: elementType,
                        content: {}
                    });

                    console.log('Updated row state:', JSON.stringify(this.activeRow));
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                }
            },

            editElement(row, columnIndex) {
                console.log('Edit Element clicked:', { row, columnIndex });

                this.activeRow = row;
                this.activeColumnIndex = columnIndex;
                this.activeElement = row.columns[columnIndex].elements[0];

                console.log('Active element:', this.activeElement);

                // Set the content specific to this element
                this.$wire.set('elementContent', this.activeElement.content.text || '');
                console.log('Element content set:', this.activeElement.content.text || '');

                this.$dispatch('open-modal', { id: 'element-editor-modal' });
            },

            saveElementContent(content) {
                if (this.activeElement) {
                    this.activeElement.content = { text: content };
                    this.$wire.saveLayout(JSON.stringify(this.rows));
                    this.$dispatch('close-modal', { id: 'element-editor-modal' });
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
