<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}
        
        <div class="filamentor-canvas pt-4" x-data="filamentor" x-effect="console.log('Effect triggered:', rows)">
            <input type="hidden" name="layout" x-ref="canvasData" wire:model="data.layout" value="{{ $this->record->layout }}">
            
            <div id="rows-container" class="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
                <template x-for="(row, index) in rows" :key="row.id + '-' + row.order">
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded flex items-center"
                        x-init="console.log('Rendering row:', row, 'at index:', index)">
                        <div class="row-handle cursor-move mr-2">⋮⋮</div>
                        <div x-text="`Row ${row.id} (index: ${index}, order: ${row.order})`"></div>
                    </div>
                </template>
            </div>
                        
            <button type="button" 
                    class="mt-4 w-full bg-primary-500 text-white rounded-lg p-4 text-center hover:bg-primary-600"
                    @click="addRow">
                Add Row
            </button>

            <div class="mt-4 flex justify-end">
                <x-filament::button 
                    type="submit"
                    @click="console.log('Save button clicked!', $refs.canvasData.value)">
                    Save page
                </x-filament::button>
            </div>
        </div>
    </form>
</x-filament::page>
