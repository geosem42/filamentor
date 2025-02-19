export class ColumnManager {
    constructor(containerId) {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            console.log(`Container #${containerId} not found, waiting for DOM`);
            return;
        }
        this.container = container;
        this.context = Alpine.$data(this.container);
        this.columns = [];
        console.log('ColumnManager initialized with context:', this.context);
    }

    init(columns) {
        // Get all column elements with data-column-id attributes
        const columnElements = this.container?.querySelectorAll('[data-column-id]');
        if (!columnElements) {
            console.log('Column elements not found');
            return this;
        }
        
        this.columns = columns;
        console.log('ColumnManager initialized with columns:', this.columns);
        return this;
    }

    reorder(evt) {
        console.log('Reorder event:', evt);
        console.log('Current columns:', this.columns);
        
        const columnElements = [...evt.to.querySelectorAll('[data-column-id]')];
        console.log('Found column elements:', columnElements);
            
        const newColumns = columnElements.map((element, index) => {
            const columnId = parseInt(element.dataset.columnId);
            const originalColumn = this.columns.find(col => col.id === columnId);
            console.log('Processing column:', { columnId, originalColumn });
            
            return {
                ...originalColumn,
                order: index
            };
        });

        console.log('New column order:', newColumns);
        this.sync(newColumns);
        this.save(newColumns);
    }

    sync(newColumns) {
        // Create a fresh array with new references
        const updatedColumns = newColumns.map(col => ({...col}));
        
        // Update both the manager and context
        this.columns = updatedColumns;
        this.context.columns = updatedColumns;
        
        console.log('Synced new columns:', updatedColumns);
    }    

    save(columns) {
        const rowId = this.container.id.replace('columns-container-', '');
        console.log('Saving columns for row:', rowId);
        Livewire.find(this.container.closest('[wire\\:id]').getAttribute('wire:id'))
            .call('reorderColumns', rowId, JSON.stringify(columns));
    }
}
