document.addEventListener('alpine:init', () => {
    Alpine.store('rows', {
        items: [],
        
        init() {
            // Existing init logic
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
            if (!evt || typeof evt.newIndex === 'undefined' || typeof evt.oldIndex === 'undefined') {
                return this.items;
            }
        
            const newIndex = evt.newIndex;
            const oldIndex = evt.oldIndex;
            
            let newItems = [...this.items];
            const item = newItems.splice(oldIndex, 1)[0];
            newItems.splice(newIndex, 0, item);
            
            newItems.forEach((row, index) => {
                row.order = index;
            });
        
            this.items = newItems;
            return this.items;
        },

        // Modified reorderColumns to handle columns within the same row (existing functionality)
        reorderColumns({ rowId, oldIndex, newIndex }) {
            const rows = [...this.items];
            const targetRow = rows.find(r => r.id === rowId);

            if (targetRow && Array.isArray(targetRow.columns)) {
                const [movedColumn] = targetRow.columns.splice(oldIndex, 1);
                targetRow.columns.splice(newIndex, 0, movedColumn);
                targetRow.columns.forEach((col, idx) => col.order = idx); // Update order
            }
            
            this.items = rows;
            return this.items;
        },

        // New method to move columns between rows or reorder within the same row
        moveColumnAndReorder({ sourceRowId, draggedColumnId, targetRowId, newIndexInTargetRow }) {
            const rows = [...this.items]; // Create a new array reference for Alpine reactivity
            const sourceRow = rows.find(r => r.id === sourceRowId);
            const targetRow = rows.find(r => r.id === targetRowId);
        
            if (!sourceRow || !targetRow) {
                console.error("Source or Target Row not found for moving column", { sourceRowId, targetRowId });
                return this.items; // Return original if error
            }
        
            // Ensure columns arrays exist
            if (!Array.isArray(sourceRow.columns)) sourceRow.columns = [];
            if (!Array.isArray(targetRow.columns)) targetRow.columns = [];
        
            const sourceColumnIndex = sourceRow.columns.findIndex(c => c.id === draggedColumnId);
            if (sourceColumnIndex === -1) {
                console.error("Dragged column not found in source row", { draggedColumnId, sourceRowId });
                return this.items;
            }
        
            const [movedColumn] = sourceRow.columns.splice(sourceColumnIndex, 1);
        
            // Ensure newIndexInTargetRow is within bounds for the target row's columns array
            const clampedNewIndex = Math.max(0, Math.min(newIndexInTargetRow, targetRow.columns.length));
            targetRow.columns.splice(clampedNewIndex, 0, movedColumn);
        
            // Update order property for columns in both affected rows
            sourceRow.columns.forEach((col, index) => col.order = index);
            targetRow.columns.forEach((col, index) => col.order = index);
            
            this.items = rows; // Assign the modified array back to trigger reactivity
            return this.items;
        }
    });
});