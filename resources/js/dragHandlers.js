export function createDragHandlers($wire) {
    return {
        // Row drag handlers (existing - keep as is)
        handleDragStart(e, row) {
            e.dataTransfer.setData('text/plain', row.id.toString());
            e.target.classList.add('dragging');
        },
        handleDragOver(e) {
            e.preventDefault();
            const dropTarget = e.target.closest('.bg-gray-50'); // Assuming this is a row element
            if (dropTarget && !dropTarget.classList.contains('dragging')) {
                document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
                dropTarget.classList.add('drop-target');
            }
        },
        handleDragEnd(e) {
            e.target.classList.remove('dragging');
            document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
        },
        handleDrop(e, targetRow) {
            e.preventDefault();
            document.querySelectorAll('.dragging, .drop-target').forEach(el => el.classList.remove('dragging', 'drop-target'));
            
            const draggedId = e.dataTransfer.getData('text/plain');
            const rows = Alpine.store('rows').items;
            const draggedIndex = rows.findIndex(r => r.id.toString() === draggedId);
            const targetIndex = rows.findIndex(r => r.id === targetRow.id);
            
            if (draggedIndex === -1 || targetIndex === -1) return;

            const updatedRows = Alpine.store('rows').reorderRows({
                newIndex: targetIndex,
                oldIndex: draggedIndex
            });
            
            const livewire = window.Livewire.find(document.querySelector('[wire\\:id]').getAttribute('wire:id'));
            livewire.saveLayout(JSON.stringify(updatedRows));
        },

        // Column drag handlers (updated)
        handleColumnDragStart(e, column, row) {
            e.stopPropagation();
            e.dataTransfer.setData('text/plain', JSON.stringify({
                columnId: column.id,
                rowId: row.id,
                type: 'column' // Add a type to distinguish from other draggables if any
            }));
            e.target.classList.add('dragging-column');
            // Optionally add a class to the body to indicate a column is being dragged
            document.body.classList.add('dragging-active-column');
        },

        handleColumnDragEnd(e) {
            e.stopPropagation();
            document.querySelectorAll('.dragging-column').forEach(el => el.classList.remove('dragging-column'));
            document.querySelectorAll('.drop-before, .drop-after, .drop-inside').forEach(el => el.classList.remove('drop-before', 'drop-after', 'drop-inside'));
            document.body.classList.remove('dragging-active-column');
        },

        // Drag over an existing column item
        handleColumnItemDragOver(e, targetColumnData, targetRowData) {
            e.preventDefault();
            e.stopPropagation();
            
            const transferData = e.dataTransfer.types.includes('text/plain') ? e.dataTransfer.getData('text/plain') : null;
            if (transferData) {
                try {
                    const parsedData = JSON.parse(transferData);
                    if (parsedData.type !== 'column') return; // Only handle column drags
                } catch (err) { return; } // Not our drag type
            }


            document.querySelectorAll('.drop-before, .drop-after, .drop-inside').forEach(el => el.classList.remove('drop-before', 'drop-after', 'drop-inside'));

            const columnWrapper = e.currentTarget; // The div.column-item-wrapper
            if (columnWrapper && !columnWrapper.classList.contains('dragging-column')) {
                const rect = columnWrapper.getBoundingClientRect();
                const isRightHalf = e.clientX > rect.left + rect.width / 2;
                if (isRightHalf) {
                    columnWrapper.classList.add('drop-after');
                } else {
                    columnWrapper.classList.add('drop-before');
                }
            }
        },

        handleColumnItemDragLeave(e) {
            e.stopPropagation();
            const columnWrapper = e.currentTarget;
            if (columnWrapper) {
                columnWrapper.classList.remove('drop-before', 'drop-after');
            }
        },

        // Drag over the general columns container of a row (for empty rows or appending)
        handleColumnContainerDragOver(e, targetRowData) {
            e.preventDefault();
            e.stopPropagation();

            const transferData = e.dataTransfer.types.includes('text/plain') ? e.dataTransfer.getData('text/plain') : null;
            if (transferData) {
                try {
                    const parsedData = JSON.parse(transferData);
                    if (parsedData.type !== 'column') return;
                } catch (err) { return; }
            } else { return; }


            document.querySelectorAll('.drop-before, .drop-after, .drop-inside').forEach(el => el.classList.remove('drop-before', 'drop-after', 'drop-inside'));
            
            const container = e.currentTarget; // The div.columns-container
            const isEmpty = targetRowData.columns.length === 0;
            // Check if directly over container or its empty state
            const isDirectlyOverContainerOrEmptyState = e.target === container || e.target.closest('.column-empty-state');

            if (isEmpty || isDirectlyOverContainerOrEmptyState) {
               container.classList.add('drop-inside');
            }
        },

        handleColumnContainerDragLeave(e) {
            e.stopPropagation();
            const container = e.currentTarget;
            container.classList.remove('drop-inside');
        },
        
        // Drop onto an existing column item
        handleColumnDropOnItem(e, targetColumnData, targetRowData) {
            e.preventDefault();
            e.stopPropagation();
            
            const transfer = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (transfer.type !== 'column') return;

            const sourceRowId = transfer.rowId;
            const draggedColumnId = transfer.columnId;
            const targetRowId = targetRowData.id;
        
            const columnWrapper = e.currentTarget;
            let newIndexInTargetRow;
        
            const targetRowInStore = Alpine.store('rows').items.find(r => r.id === targetRowId);
            if (!targetRowInStore) return;
        
            const targetColumnIndexInStore = targetRowInStore.columns.findIndex(c => c.id === targetColumnData.id);
            if (targetColumnIndexInStore === -1) return; 
        
            if (columnWrapper.classList.contains('drop-after')) {
                newIndexInTargetRow = targetColumnIndexInStore + 1;
            } else { // Assumes drop-before or directly on
                newIndexInTargetRow = targetColumnIndexInStore;
            }
            
            columnWrapper.classList.remove('drop-before', 'drop-after');
            document.querySelectorAll('.dragging-column').forEach(el => el.classList.remove('dragging-column'));
            document.body.classList.remove('dragging-active-column');

            const updatedRows = Alpine.store('rows').moveColumnAndReorder({
                sourceRowId: sourceRowId,
                draggedColumnId: draggedColumnId,
                targetRowId: targetRowId,
                newIndexInTargetRow: newIndexInTargetRow
            });
            
            if (updatedRows) {
                const livewire = window.Livewire.find(document.querySelector('[wire\\:id]').getAttribute('wire:id'));
                livewire.saveLayout(JSON.stringify(updatedRows));
            }
        },

        // Drop into the general columns container of a row
        handleColumnDropInContainer(e, targetRowData) {
            e.preventDefault();
            e.stopPropagation();
        
            const transfer = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (transfer.type !== 'column') return;

            const sourceRowId = transfer.rowId;
            const draggedColumnId = transfer.columnId;
            const targetRowId = targetRowData.id;
        
            const container = e.currentTarget;
            container.classList.remove('drop-inside');
            document.querySelectorAll('.dragging-column').forEach(el => el.classList.remove('dragging-column'));
            document.body.classList.remove('dragging-active-column');
        
            const targetRowInStore = Alpine.store('rows').items.find(r => r.id === targetRowId);
            if (!targetRowInStore) return;
        
            // Append to the end of the target row's columns
            const newIndexInTargetRow = targetRowInStore.columns.length; 
        
            const updatedRows = Alpine.store('rows').moveColumnAndReorder({
                sourceRowId: sourceRowId,
                draggedColumnId: draggedColumnId,
                targetRowId: targetRowId,
                newIndexInTargetRow: newIndexInTargetRow
            });
            
            if (updatedRows) {
                const livewire = window.Livewire.find(document.querySelector('[wire\\:id]').getAttribute('wire:id'));
                livewire.saveLayout(JSON.stringify(updatedRows));
            }
        }      
    };
}