import '../css/filamentor.css';
import Sortable from 'sortablejs';

console.log('Filamentor loaded!');

window.addEventListener('alpine:init', () => {
    console.log('Alpine init event fired!');

    Alpine.data('filamentor', () => {
        console.log('Component definition called');
        return {
            rows: [],

            init() {
                console.log('Filamentor initialized from JS!');
                console.log('Raw canvas data:', this.$refs.canvasData.value);

                // Load saved layout data
                const savedLayout = this.$refs.canvasData.value;
                if (savedLayout) {
                    this.rows = JSON.parse(savedLayout).sort((a, b) => a.order - b.order);
                    console.log('Sorted initial rows:', this.rows);
                }
                
                new Sortable(document.getElementById('rows-container'), {
                    animation: 150,
                    handle: '.row-handle',
                    ghostClass: 'sortable-ghost',
                    onEnd: (evt) => {
                        console.log('Before reorder:', this.rows);
                        
                        const currentRows = [...this.rows];
                        const [movedRow] = currentRows.splice(evt.oldIndex, 1);
                        currentRows.splice(evt.newIndex, 0, movedRow);
                        
                        // Create new array reference with updated orders
                        const updatedRows = currentRows.map((row, index) => ({
                            ...row,
                            order: index
                        }));
                        
                        // Force reactive update
                        this.$nextTick(() => {
                            this.rows = updatedRows;
                            console.log('After reorder:', this.rows);
                            this.updateCanvasData();
                        });
                    }
                });
            },

            addRow() {
                console.log('Adding new row');
                const row = {
                    id: Date.now(),
                    order: this.rows.length,
                    columns: []
                };
                this.rows.push(row);
                console.log('Updated rows:', this.rows);
                this.updateCanvasData();
                console.log('Canvas data:', this.$refs.canvasData.value);
            },

            updateCanvasData() {
                const jsonData = JSON.stringify(this.rows);
                this.$refs.canvasData.value = jsonData;
                this.$wire.set('data.layout', jsonData);
            }

        };
    });
});
