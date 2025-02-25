document.addEventListener('alpine:init', () => {
    Alpine.store('rows', {
        items: [],
        
        init() {
        },
        
        setRows(rows) {
            this.items = rows;
        },

        getColumn(rowIndex, columnIndex) {
            return this.items[rowIndex]?.columns[columnIndex] || {};
        },

        getColumns(rowIndex) {
            return this.items[rowIndex]?.columns || [];
        },

        reorderRows(evt) {
            // Guard against undefined values
            if (!evt || typeof evt.newIndex === 'undefined' || typeof evt.oldIndex === 'undefined') {
                return this.items;
            }
        
            const newIndex = evt.newIndex;
            const oldIndex = evt.oldIndex;
            
            // Create a new array reference
            let newItems = [...this.items];
            const item = newItems.splice(oldIndex, 1)[0];
            newItems.splice(newIndex, 0, item);
            
            // Update order properties
            newItems.forEach((row, index) => {
                row.order = index;
            });
        
            // Assign the new array
            this.items = newItems;
        
            return this.items;
        },

        reorderColumns({ sourceRowId, targetRowId, oldIndex, newIndex }) {
            const rows = [...this.items];
            const sourceRow = rows.find(r => r.id === parseInt(sourceRowId));
            const targetRow = rows.find(r => r.id === parseInt(targetRowId));
            
            const [movedColumn] = sourceRow.columns.splice(oldIndex, 1);
            targetRow.columns.splice(newIndex, 0, movedColumn);
            
            this.items = rows;
            return rows;
        },        
        
    });
});
