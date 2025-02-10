<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}

        <div class="filamentor-canvas pt-4" x-data="filamentor" x-effect="console.log('Effect triggered:', rows)">
            <input type="hidden" name="layout" x-ref="canvasData" wire:model="data.layout"
                value="{{ $this->record->layout }}">

            <div id="rows-container" class="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
                <template x-for="(row, index) in rows" :key="row.id + '-' + row.order">
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded"
                        x-init="console.log('Rendering row:', row, 'at index:', index)">
                        <div class="flex items-center mb-3">
                            <div class="row-handle cursor-move mr-2">
                                <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM15 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM15 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                                        fill="#000000" />
                                </svg>
                            </div>
                            <div x-text="`Row ${row.id} (index: ${index}, order: ${row.order})`"></div>
                            <button type="button" class="ml-auto"
                                @click.stop.prevent="$dispatch('open-modal', { id: 'row-settings-modal' }); openRowSettings(row)">
                                <x-heroicon-o-cog class="w-5 h-5" />
                            </button>
                        </div>
                
                        <div class="flex gap-2 mt-2" x-show="row.columns.length">
                            <template x-for="(column, columnIndex) in row.columns" :key="columnIndex">
                                <div class="flex-1 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                                    <span class="text-xs text-gray-500 dark:text-gray-400">
                                        <x-heroicon-o-plus-circle class="w-6 h-6" />
                                    </span>
                                </div>
                            </template>
                        </div>
                        
                    </div>
                </template>
                
            </div>

            <button type="button"
                class="mt-4 w-full bg-primary-500 text-white rounded-lg p-4 text-center hover:bg-primary-600"
                @click="addRow">
                Add Row
            </button>

            <div class="mt-4 flex justify-end">
                <x-filament::button type="submit" @click="console.log('Save button clicked!', $refs.canvasData.value)">
                    Save page
                </x-filament::button>
            </div>

            <!-- Settings Panel -->
            <x-filament::modal id="row-settings-modal" slide-over width="md">
                <x-slot name="heading">
                    Row Settings
                </x-slot>

                <div class="space-y-4">
                    <div x-text="'Editing Row ' + activeRow?.id"></div>
                    <div class="border-b pb-4">
                        <h3 class="text-base font-semibold mb-2">Column Layout</h3>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Columns
                                </label>
                                <span class="text-sm text-gray-500" x-text="`${activeRow?.columns?.length || 0} columns`"></span>
                            </div>
                            
                            <input 
                            type="range" 
                            min="1" 
                            max="12" 
                            class="w-full"
                            x-bind:value="activeRow?.columns?.length || 1"
                            @input="updateColumns($event.target.value)">
                                                       
                        </div>
                        
                    </div>

                    <div
                        x-text="activeRow ? 'Current columns: ' + JSON.stringify(activeRow.columns) : 'No row selected'">
                    </div>
                </div>

                <x-slot name="footer">
                    <x-filament::button
                        type="button"
                        @click="saveRowSettings()">
                        Save Changes
                    </x-filament::button>
                </x-slot>
            </x-filament::modal>
        </div>
    </form>
</x-filament::page>