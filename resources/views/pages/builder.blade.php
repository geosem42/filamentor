<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}

        <div class="filamentor-canvas pt-4" x-data="filamentor" x-effect="console.log('Effect triggered:', rows)"
            x-load-js="[
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('filamentor', 'geosem42/filamentor')),
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('alpine-sort', 'geosem42/filamentor'))
        ]">
            <input type="hidden" name="layout" x-ref="canvasData" wire:model="data.layout"
                value="{{ $this->record->layout }}">

            <div id="rows-container" class="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
                <template x-for="(row, index) in rows" :key="row . id + '-' + row . order">
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded"
                        x-init="console.log('Rendering row:', row, 'at index:', index)">
                        <div class="flex items-center mb-3">
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
                        </div>

                        <div class="columns-container flex gap-2 w-full mt-2" 
                            :id="'columns-' + row.id"
                            x-data="{ 
                                columns: row.columns,
                                getColumn(index) {
                                    return this.columns[index] || {};
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
                                <div class="column-item flex-1 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center relative"
                                    x-sort:item="getColumn(index).id"
                                    :data-index="index">
                                    <!-- Column Delete Button - Top Right Corner -->
                                    <button type="button"
                                        class="absolute top-1 right-1 text-red-600 hover:text-red-500 delete-column-button pr-2"
                                        @click="deleteColumn(row, index)">
                                        <x-heroicon-o-x-mark class="w-4 h-4" />
                                    </button>

                                    <div class="column-handle cursor-move p-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 6h8v2H8V6zm0 5h8v2H8v-2zm0 5h8v2H8v-2z"></path>
                                        </svg>
                                    </div>
                                    <div class="flex items-center justify-center flex-1">
                                        <template x-if="getColumn(index).elements?.length > 0">
                                            <div class="flex items-center gap-2">
                                                {{-- <div class="text-xs text-gray-500 dark:text-gray-400"
                                                    x-text="getColumn(index).elements[0].type.split('\\').pop()"></div> --}}
                                                <div class="text-content text-xs text-gray-500 dark:text-gray-400" x-html="getColumn(index).elements[0].content.text"></div>
                                                <button type="button" class="text-primary-600 hover:text-primary-500"
                                                    @click="editElement(row, index)">
                                                    <x-heroicon-o-pencil class="w-4 h-4" />
                                                </button>
                                                <button type="button" class="text-red-600 hover:text-red-500"
                                                    @click="deleteElement(row, index)">
                                                    <x-heroicon-o-trash class="w-4 h-4" />
                                                </button>
                                            </div>
                                        </template>

                                        <template x-if="!getColumn(index).elements?.length">
                                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                                <svg @click="setActiveColumn(row, index)" class="w-6 h-6 cursor-pointer"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </span>
                                        </template>
                                    </div>
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

                <div class="grid grid-cols-2 gap-4">
                    @foreach($registry->getElements() as $element)
                        <button type="button"
                            class="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center gap-2"
                            x-on:click="addElement('{{ get_class($element) }}')">
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

            <!-- Reduce Columns Confirmation Modal -->
            <x-filament::modal id="confirm-column-reduction">
                <x-slot name="heading">
                    Reduce Columns
                </x-slot>

                <div class="py-4">
                    <p>Reducing columns will remove content from the extra columns. Would you like to proceed?</p>
                </div>

                <x-slot name="footer">
                    <div class="flex gap-x-4">
                        <x-filament::button type="button" color="gray"
                            @click="$dispatch('close-modal', { id: 'confirm-column-reduction' }); event.target.value = activeRow.columns.length;">
                            Cancel
                        </x-filament::button>

                        <x-filament::button type="button" color="danger" @click="confirmColumnReduction()">
                            Confirm
                        </x-filament::button>
                    </div>
                </x-slot>
            </x-filament::modal>

        </div>
    </form>
</x-filament::page>