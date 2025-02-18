<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}

        <div class="filamentor-canvas pt-4" x-data="filamentor" x-effect="console.log('Effect triggered:', rows)"
            x-load-js="[
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('filamentor', 'filamentor')),
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('alpine-sort', 'filamentor'))
        ]">

            <div class="flex justify-end">
                <button type="button"
                    class="bg-primary-500 hover:bg-secondary-500 text-white text-right rounded-lg flex items-center p-2 my-4"
                    @click="addRow">
                    <x-heroicon-o-plus-circle class="w-6 h-6 me-1" />
                    Add Row
                </button>
            </div>

            <input type="hidden" name="layout" x-ref="canvasData" wire:model="data.layout"
                value="{{ $this->record->layout }}">

            <div id="rows-container" class="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
                <template x-if="!rows.length">
                    <div class="text-center text-sm py-8 text-gray-500 dark:text-gray-400">
                        Start by adding a row
                    </div>
                </template>
                <template x-for="(row, index) in rows" :key="row . id + '-' + row . order">
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded"
                        x-init="console.log('Rendering row:', row, 'at index:', index)">
                        <div class="flex items-center mb-3">
                            <!-- Drag Button -->
                            <div class="row-handle cursor-move mr-2">
                                <x-heroicon-o-bars-3 class="w-5 h-5 me-3" />
                            </div>
                            <div x-text="`Row ${row.id} (index: ${index}, order: ${row.order})`"></div>

                            <!-- Row Settings Button -->
                            <button type="button" class="ml-auto"
                                @click.stop.prevent="$dispatch('open-modal', { id: 'row-settings-modal' }); openRowSettings(row)">
                                <x-heroicon-o-cog class="w-5 h-5" />
                            </button>

                            <!-- Add Column Button -->
                            <button type="button" class="flex items-center justify-center h-16 px-4"
                                @click="addColumn(row)">
                                <x-heroicon-o-plus class="w-5 h-5" />
                            </button>

                            <!-- Delete Row Button -->
                            <button type="button"
                                @click="deleteRow(row)">
                                <x-heroicon-o-x-mark class="w-5 h-5 text-red-500 hover:text-red-600" />
                            </button>
                        </div>

                        <div class="columns-container flex gap-2 w-full mt-2" 
                            :id="'columns-' + row . id" 
                            x-data="{ 
                                columns: row.columns,
                                getColumn(index) {
                                    return this.columns[index] || {};
                                },
                                init() {
                                    this.$watch('row.columns', value => {
                                        this.columns = value;
                                    });
                                }
                            }" 
                            x-effect="$nextTick(() => { columns = [...columns] })" 
                            x-sort="handleSort"
                            x-sort:group="'columns-' + row.id" 
                            x-sort:config="{ 
                                animation: 150,
                                handle: '.column-handle',
                                direction: 'horizontal',
                                ghostClass: 'sortable-ghost'
                            }">
                            <template x-for="(column, index) in columns" :key="index">
                                <div class="column-item bg-white dark:bg-gray-900 flex-1 min-h-[120px] border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col relative"
                                    x-sort:item="getColumn(index).id" :data-index="index">
                                    
                                    <!-- Column Delete Button -->
                                    <button type="button"
                                        class="absolute top-1 right-1 text-red-600 hover:text-red-500 delete-column-button pr-2"
                                        @click="deleteColumn(row, index)">
                                        <x-heroicon-o-x-mark class="w-4 h-4" />
                                    </button>
                            
                                    <!-- Column Handle -->
                                    <div class="column-handle cursor-move p-2">
                                        <x-heroicon-o-bars-3 class="w-4 h-4" />
                                    </div>
                            
                                    <!-- Column Content -->
                                    <div class="flex-1 p-2">
                                        <template x-if="getColumn(index)['elements']?.length > 0">
                                            <div class="flex flex-col gap-2 filamentor-border rounded-md p-2">
                                                <!-- Actions Row -->
                                                <div class="flex justify-between gap-2">
                                                    <div class="text-sm text-gray-600 dark:text-gray-400" x-text="getColumn(index)['elements'][0]['type'].split('\\').pop()"></div>
                                                    <div>
                                                        <button type="button" class="text-primary-600 hover:text-primary-500 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            @click="editElement(row, index)">
                                                            <x-heroicon-o-pencil class="w-4 h-4" />
                                                        </button>
                                                        <button type="button" class="text-red-600 hover:text-red-500 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            @click="deleteElement(row, index)">
                                                            <x-heroicon-o-trash class="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                            
                                                <!-- Preview Area -->
                                                <div class="bg-white dark:bg-gray-800 rounded p-2">
                                                    <template x-if="getColumn(index)['elements'][0]['type'].includes('Text')">
                                                        <div class="flex gap-4 items-start">
                                                            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded">
                                                                <x-heroicon-o-pencil class="w-8 h-8 text-gray-400" />
                                                            </div>
                                                            <div class="text-sm text-gray-600 dark:text-gray-400 flex-1"
                                                                x-html="(getColumn(index)['elements'][0]['content']?.text || 'Click to edit text').substring(0, 300) + '...'">
                                                            </div>
                                                        </div>
                                                    </template>                                                    
                                                    
                                                    <template x-if="getColumn(index)['elements'][0]['type'].includes('Image')">
                                                        <div class="w-full aspect-video rounded overflow-hidden">
                                                            <template x-if="getColumn(index)['elements'][0]['content']?.thumbnail">
                                                                <div x-html="`<img src='${getColumn(index)['elements'][0]['content']['thumbnail']}' class='w-16 h-16 object-cover' alt='Thumbnail'>`"></div>
                                                            </template>
                                                            <template x-if="!getColumn(index)['elements'][0]['content']?.thumbnail">
                                                                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                                    <x-heroicon-o-photo class="w-8 h-8 text-gray-400" />
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </template>

                                                    <template x-if="getColumn(index)['elements'][0]['type'].includes('Video')">
                                                        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded">
                                                            <x-heroicon-o-video-camera class="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    </template>
                                                    
                                                </div>
                                            </div>
                                        </template>
                            
                                        <!-- Empty State -->
                                        <template x-if="!getColumn(index).elements?.length">
                                            <div class="flex items-center justify-center h-full">
                                                <span class="text-xs text-gray-500 dark:text-gray-400">
                                                    <svg @click="setActiveColumn(row, index)" class="w-6 h-6 cursor-pointer"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            
                        </div>
                    </div>
                </template>
            </div>

            {{-- <div class="mt-4 flex justify-end">
                <x-filament::button type="submit" @click="console.log('Save button clicked!', $refs.canvasData.value)">
                    Save page
                </x-filament::button>
            </div> --}}

            <!-- Settings Panel -->
            <x-filament::modal id="row-settings-modal" slide-over width="md">
                <x-slot name="heading">
                    Row Settings
                </x-slot>

                @inject('registry', 'Geosem42\Filamentor\Support\ElementRegistry')

                <div>
                    <h3>Available Elements:</h3>
                    @foreach($registry->getElements() as $element)
                        <div class="flex items-center gap-2">
                            {{ $element->getName() }}
                            @svg($element->getIcon(), 'w-5 h-5')
                        </div>
                    @endforeach
                </div>


                <div class="space-y-4">
                    <div x-text="'Editing Row ' + activeRow?.id"></div>
                    <div class="border-b pb-4">
                        <h3 class="text-base font-semibold mb-2">Column Layout</h3>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Columns
                                </label>
                                <span class="text-sm text-gray-500"
                                    x-text="`${activeRow?.columns?.length || 0} columns`"></span>
                            </div>

                            <input type="range" min="1" max="12" class="w-full"
                                x-bind:value="activeRow?.columns?.length || 1"
                                @input="updateColumns($event.target.value)">

                        </div>

                    </div>

                    <div
                        x-text="activeRow ? 'Current columns: ' + JSON.stringify(activeRow.columns) : 'No row selected'">
                    </div>
                </div>

                <x-slot name="footer">
                    <x-filament::button type="button" @click="saveRowSettings()">
                        Save Changes
                    </x-filament::button>
                </x-slot>
            </x-filament::modal>

            <!-- Element Picker Modal -->
            <x-filament::modal id="element-picker-modal" slide-over width="sm">
                <x-slot name="heading">
                    Add Element
                </x-slot>

                <div class="filamentor-grid">
                    @foreach($registry->getElements() as $element)
                    <button type="button"
                        class="filamentor-element-card p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 focus-visible:outline-none"
                        @click="addElement('{{ get_class($element) }}')">
                        @svg($element->getIcon(), 'w-8 h-8')
                        <span class="text-sm">{{ $element->getName() }}</span>
                    </button>                
                    @endforeach
                </div>
            </x-filament::modal>

            <!-- Element Edit Modal -->
            <x-filament::modal id="element-editor-modal" width="4xl">
                <x-slot name="heading">
                    Edit Text Element
                </x-slot>

                <div class="min-h-[300px]" x-data="{ content: '' }">
                    {{ $this->getElementForm() }}

                    <x-slot name="footer">
                        <x-filament::button type="button" @click="saveElementContent($wire.get('elementContent'))">
                            Save Content
                        </x-filament::button>
                    </x-slot>
                </div>
            </x-filament::modal>

            <!-- Delete Row Confirmation Modal -->
            <x-filament::modal id="confirm-row-deletion">
                <x-slot name="heading">
                    Delete Row
                </x-slot>

                <div class="py-4">
                    <p>This row contains elements that will be permanently deleted. Would you like to proceed?</p>
                </div>

                <x-slot name="footer">
                    <div class="flex gap-x-4">
                        <x-filament::button type="button" color="gray"
                            @click="$dispatch('close-modal', { id: 'confirm-row-deletion' })">
                            Cancel
                        </x-filament::button>

                        <x-filament::button type="button" color="danger" 
                            @click="confirmRowDeletion()">
                            Delete
                        </x-filament::button>
                    </div>
                </x-slot>
            </x-filament::modal>

        </div>
    </form>
</x-filament::page>