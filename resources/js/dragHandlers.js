export function createDragHandlers($wire) {
    return {
        handleDragStart(e, row) {
            e.dataTransfer.setData('text/plain', row.id);
            e.target.classList.add('dragging');
        },
        
        handleDragOver(e) {
            e.preventDefault();
            const dropTarget = e.target.closest('.bg-gray-50');
            if (dropTarget) {
                document.querySelectorAll('.drop-target').forEach(el => {
                    el.classList.remove('drop-target');
                });
                dropTarget.classList.add('drop-target');
            }
        },
        
        handleDragEnd(e) {
            e.target.classList.remove('dragging');
            document.querySelectorAll('.drop-target').forEach(el => {
                el.classList.remove('drop-target');
            });
        },
        
        handleDrop(e, targetRow) {
            e.preventDefault();
            document.querySelectorAll('.dragging, .drop-target').forEach(el => {
                el.classList.remove('dragging', 'drop-target');
            });
            
            const draggedId = e.dataTransfer.getData('text/plain');
            const rows = Alpine.store('rows').items;
            const draggedIndex = rows.findIndex(r => r.id.toString() === draggedId);
            const targetIndex = rows.findIndex(r => r.id === targetRow.id);
            
            const updatedRows = Alpine.store('rows').reorderRows({
                newIndex: targetIndex,
                oldIndex: draggedIndex
            });
            
            // Get the Livewire component instance
            const livewire = window.Livewire.find(
                document.querySelector('[wire\\:id]').getAttribute('wire:id')
            );
            livewire.saveLayout(JSON.stringify(updatedRows));
        },

        handleColumnDragStart(e, column, row) {
            e.stopPropagation();
            e.dataTransfer.setData('text/plain', JSON.stringify({
                columnId: column.id,
                rowId: row.id
            }));
            e.target.classList.add('dragging-column');
        },

        handleColumnDragOver(e) {
            e.stopPropagation();
            e.preventDefault();
            const columnTarget = e.target.closest('[draggable="true"]');
            if (columnTarget && !columnTarget.classList.contains('dragging-column')) {
                document.querySelectorAll('.drop-target-column').forEach(el => {
                    el.classList.remove('drop-target-column');
                });
                columnTarget.classList.add('drop-target-column');
            }
        },

        handleColumnDragEnd(e) {
            e.stopPropagation();
            document.querySelectorAll('.dragging-column, .drop-target-column').forEach(el => {
                el.classList.remove('dragging-column', 'drop-target-column');
            });
        },

        handleColumnDrop(e, targetColumn, row) {
            e.stopPropagation();
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            // Only proceed if we're in the same row
            if (data.rowId !== row.id) return;
            
            const sourceIndex = row.columns.findIndex(c => c.id === data.columnId);
            const targetIndex = row.columns.findIndex(c => c.id === targetColumn.id);
            
            const updatedRows = Alpine.store('rows').reorderColumns({
                sourceRowId: row.id,
                targetRowId: row.id,
                oldIndex: sourceIndex,
                newIndex: targetIndex
            });
            
            const livewire = window.Livewire.find(
                document.querySelector('[wire\\:id]').getAttribute('wire:id')
            );
            livewire.saveLayout(JSON.stringify(updatedRows));
        }        
    };
}
