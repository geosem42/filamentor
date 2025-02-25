<x-filament::page>
    <form wire:submit.prevent="save">
        {{ $this->form }}

        <div class="mt-3 flex justify-end">
            <x-filament::button wire:click="save">
                Save Page
            </x-filament::button>
        </div>


        <div class="filamentor-canvas pt-4" x-data="filamentor" x-load-js="[
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('filamentor', 'filamentor')),
            @js(\Filament\Support\Facades\FilamentAsset::getScriptSrc('alpine-sort', 'filamentor'))
        ]">

            <div class="flex justify-start">
                <button type="button"
                    class="bg-primary-500 hover:bg-secondary-500 text-white text-right rounded-lg flex items-center p-2 my-4"
                    @click="addRow">
                    <x-heroicon-o-plus-circle class="w-6 h-6 me-1" />
                    Add Row
                </button>
            </div>

            <input type="hidden" name="layout" x-ref="canvasData" wire:model="data.layout"
                value="{{ $this->record->layout }}">

            <div id="rows-container" x-data="filamentor" class="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
                <!-- Empty state when no rows exist -->
                <div x-show="$store.rows.items.length === 0" class="flex flex-col items-center justify-center p-12 text-center rounded-lg">
                    <x-heroicon-o-rectangle-stack class="w-8 h-8 text-gray-400 mb-2" />
                    <h3 class="text-lg font-medium text-gray-900">No rows yet</h3>
                    <p class="mt-1 text-sm text-gray-500">Get started by adding your first row.</p>
                </div>

                <template x-for="row in $store.rows.items" :key="row . id">
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4" draggable="true"
                        @dragstart="handleDragStart($event, row)" @dragover="handleDragOver($event)"
                        @dragend="handleDragEnd($event)" @drop="handleDrop($event, row)">
                        <!-- Row Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="cursor-move mr-2">
                                    <x-heroicon-o-bars-3 class="w-5 h-5 me-3" />
                                </div>
                                {{-- <div x-text="'Row ' + row.id"></div> --}}
                            </div>

                            <div class="flex items-center">
                                <!-- Row Settings Button -->
                                <button type="button" class="ml-auto p-1 filamentor-btn-hover rounded"
                                    @click.stop.prevent="$dispatch('open-modal', { id: 'row-settings-modal' }); openRowSettings(row)">
                                    <x-heroicon-o-cog class="w-5 h-5" />
                                </button>

                                <!-- Add Column Button -->
                                <button type="button"
                                    class="flex items-center justify-center p-1 filamentor-btn-hover rounded"
                                    @click="addColumn(row)">
                                    <x-heroicon-o-plus class="w-5 h-5" />
                                </button>

                                <!-- Delete Row Button -->
                                <button type="button" class="ml-auto p-1 filamentor-btn-hover rounded"
                                    @click="deleteRow(row)">
                                    <x-heroicon-o-x-mark class="w-5 h-5 text-red-500 hover:text-red-600" />
                                </button>
                            </div>
                        </div>

                        <!-- Columns Container -->
                        <div class="flex gap-2 mt-4">
                            <!-- Empty state when no columns exist in a row -->
                            <div x-show="row.columns.length === 0" class="flex flex-col items-center justify-center p-8 text-center rounded-lg my-2 w-full">
                                <x-heroicon-o-view-columns class="w-5 h-5 me-3" />
                                <h3 class="text-sm font-medium text-gray-900">No columns in this row</h3>
                                <p class="mt-1 text-xs text-gray-500">Add a column to place content elements.</p>
                            </div>

                            <template x-for="(column, columnIndex) in row.columns" :key="column . id">
                                <div class="flex-1 bg-white dark:bg-gray-900 p-4 rounded" draggable="true"
                                    @dragstart="handleColumnDragStart($event, column, row)"
                                    @dragover="handleColumnDragOver($event)" @dragend="handleColumnDragEnd($event)"
                                    @drop="handleColumnDrop($event, column, row)">
                                    <!-- Column Header -->
                                    <div class="flex items-center justify-between mb-3">
                                        <div class="flex items-center cursor-move">
                                            <x-heroicon-o-bars-3 class="w-4 h-4 me-2" />
                                            {{-- <div x-text="'Column ' + column.id" class="ms-2"></div> --}}
                                        </div>

                                        <div class="flex items-center space-x-2">
                                            <!-- Column Settings -->
                                            <button type="button" class="p-1 filamentor-btn-hover rounded"
                                                @click="$dispatch('open-modal', { id: 'column-settings-modal' }); openColumnSettings(row, column)">
                                                <x-heroicon-o-cog class="w-4 h-4" />
                                            </button>

                                            <!-- Add Column-->
                                            <button type="button" class="p-1 filamentor-btn-hover rounded"
                                                @click="setActiveColumn(row, columnIndex)">
                                                <x-heroicon-o-plus class="w-4 h-4" />
                                            </button>

                                            <!-- Delete Column -->
                                            <button type="button" class="p-1 filamentor-btn-hover rounded"
                                                @click="deleteColumn(row, columnIndex)">
                                                <x-heroicon-o-trash class="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Column Content -->
                                    <div
                                        class="min-h-[120px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded mt-2 overflow-hidden">
                                        <!-- Column has elements -->
                                        <template x-if="column.elements && column.elements.length > 0">
                                            <div class="h-full">
                                                <template x-for="(element, elementIndex) in column.elements"
                                                    :key="element . id || elementIndex">
                                                    <div class="h-full">
                                                        <!-- Element Header - Same for all types -->
                                                        <div
                                                            class="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                                            <span x-text="element.type.split('\\').pop()"
                                                                class="text-xs font-medium text-gray-600 dark:text-gray-300"></span>
                                                            <div class="flex space-x-2">
                                                                <button type="button"
                                                                    @click="editElement(row, columnIndex, elementIndex)"
                                                                    class="p-1 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 filamentor-btn-hover transition-colors">
                                                                    <x-heroicon-o-pencil-square class="w-4 h-4" />
                                                                </button>
                                                                <button type="button"
                                                                    @click="deleteElement(row, columnIndex, elementIndex)"
                                                                    class="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 filamentor-btn-hover transition-colors">
                                                                    <x-heroicon-o-trash class="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <!-- Element Content - Type-specific with consistent styling -->
                                                        <div class="p-3">
                                                            <!-- Text Element -->
                                                            <template x-if="element.type.includes('Text')">
                                                                <div
                                                                    class="prose prose-sm max-w-none dark:prose-invert max-h-[80px] overflow-y-auto">
                                                                    <div
                                                                        x-html="element.content?.text || 'Text Content'">
                                                                    </div>
                                                                </div>
                                                            </template>

                                                            <!-- Image Element -->
                                                            <template x-if="element.type.includes('Image')">
                                                                <div class="flex items-center h-[80px]">
                                                                    <template x-if="element.content?.thumbnail">
                                                                        <div class="flex flex-row items-center">
                                                                            <img :src="element . content . thumbnail"
                                                                                class="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-700" />
                                                                            <span
                                                                                class="text-xs text-gray-500 dark:text-gray-400 ml-3 line-clamp-2"
                                                                                x-text="element.content?.alt || 'Image'"></span>
                                                                        </div>
                                                                    </template>
                                                                    <template x-if="!element.content?.thumbnail">
                                                                        <div
                                                                            class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
                                                                            <x-heroicon-o-photo
                                                                                class="w-8 h-8 text-gray-400" />
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                            </template>

                                                            <!-- Video Element -->
                                                            <template x-if="element.type.includes('Video')">
                                                                <div class="flex items-center h-[80px]">
                                                                    <div
                                                                        class="flex-1 bg-gray-100 dark:bg-gray-800 rounded p-3 h-full flex items-center p-3">
                                                                        <x-heroicon-o-film
                                                                            class="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" />
                                                                        <div class="flex-1">
                                                                            <span
                                                                                class="text-xs text-gray-500 dark:text-gray-400 block truncate"
                                                                                x-text="element.content?.url || 'No URL provided'"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>

                                        <!-- Empty Column State -->
                                        <template x-if="!column.elements || column.elements.length === 0">
                                            <div class="h-full flex flex-col items-center justify-center p-3">
                                                <button type="button" @click="setActiveColumn(row, columnIndex)"
                                                    class="text-gray-400 hover:text-primary-500 transition-colors duration-200 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                                    <x-heroicon-o-plus-circle class="w-10 h-10" />
                                                </button>
                                                <span class="text-xs text-gray-400 mt-2">Add Element</span>
                                            </div>
                                        </template>
                                    </div>

                                </div>
                            </template>
                        </div>
                    </div>
                </template>

                <!-- Row Settings Modal -->
                <x-filament::modal id="row-settings-modal" slide-over width="md">
                    <x-slot name="heading">
                        Row Settings
                    </x-slot>

                    @inject('registry', 'Geosem42\Filamentor\Support\ElementRegistry')

                    <!-- Spacing Section -->
                    <div class="pb-2">
                        <h3 class="text-base font-semibold mb-4">Spacing</h3>

                        <!-- Padding -->
                        <div class="mb-4">
                            <label
                                class="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2 block">Padding</label>
                            <div class="flex">
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center rounded-l-lg dark:bg-gray-800 ring-0 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                        x-bind:value="activeRow?.padding?.top || 0"
                                        @input="activeRow && (activeRow.padding.top = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Top</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                        x-bind:value="activeRow?.padding?.right || 0"
                                        @input="activeRow && (activeRow.padding.right = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Right</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                        x-bind:value="activeRow?.padding?.bottom || 0"
                                        @input="activeRow && (activeRow.padding.bottom = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Bottom</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center rounded-r-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-last"
                                        x-bind:value="activeRow?.padding?.left || 0"
                                        @input="activeRow && (activeRow.padding.left = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Left</span>
                                </div>
                            </div>
                        </div>

                        <!-- Margin -->
                        <div class="mb-4">
                            <label
                                class="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2 block">Margin</label>
                            <div class="flex">
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center rounded-l-lg dark:bg-gray-800 ring-0 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                        x-bind:value="activeRow?.margin?.top || 0"
                                        @input="activeRow && (activeRow.margin.top = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Top</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                        x-bind:value="activeRow?.margin?.right || 0"
                                        @input="activeRow && (activeRow.margin.right = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Right</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                        x-bind:value="activeRow?.margin?.bottom || 0"
                                        @input="activeRow && (activeRow.margin.bottom = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Bottom</span>
                                </div>
                                <div class="flex-1 flex flex-col items-center">
                                    <input type="number"
                                        class="w-full text-center rounded-r-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-last"
                                        x-bind:value="activeRow?.margin?.left || 0"
                                        @input="activeRow && (activeRow.margin.left = $event.target.value)">
                                    <span class="text-xs text-gray-500 mt-1">Left</span>
                                </div>
                            </div>
                        </div>

                        <!-- Custom Classes -->
                        <div>
                            <h3 class="text-base font-semibold mb-2">Custom Classes</h3>
                            <input type="text"
                                class="w-full rounded-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                placeholder="Enter custom classes" x-bind:value="activeRow?.customClasses || ''"
                                @input="activeRow && (activeRow.customClasses = $event.target.value)">
                        </div>

                        <x-slot name="footer">
                            <x-filament::button type="button" @click="$data.saveRowSettings()">
                                Save Changes
                            </x-filament::button>
                        </x-slot>
                </x-filament::modal>

                <!-- Column Settings Modal -->
                <x-filament::modal id="column-settings-modal" slide-over width="md">
                    <x-slot name="heading">
                        Column Settings
                    </x-slot>

                    <div class="space-y-6">
                        <!-- Spacing Section -->
                        <div class="border-b pb-4">
                            <h3 class="text-base font-semibold mb-4">Spacing</h3>

                            <!-- Padding -->
                            <div class="mb-4">
                                <label
                                    class="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2 block">Padding</label>
                                <div class="flex">
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center rounded-l-lg dark:bg-gray-800 ring-0 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                            x-bind:value="activeColumn?.padding?.top || 0"
                                            @input="activeColumn && (activeColumn.padding.top = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Top</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                            x-bind:value="activeColumn?.padding?.right || 0"
                                            @input="activeColumn && (activeColumn.padding.right = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Right</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                            x-bind:value="activeColumn?.padding?.bottom || 0"
                                            @input="activeColumn && (activeColumn.padding.bottom = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Bottom</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center rounded-r-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-last"
                                            x-bind:value="activeColumn?.padding?.left || 0"
                                            @input="activeColumn && (activeColumn.padding.left = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Left</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Margin -->
                            <div class="mb-4">
                                <label
                                    class="text-sm font-medium text-gray-700 dark:text-gray-100 mb-2 block">Margin</label>
                                <div class="flex">
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center rounded-l-lg dark:bg-gray-800 ring-0 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                            x-bind:value="activeColumn?.margin?.top || 0"
                                            @input="activeColumn && (activeColumn.margin.top = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Top</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                            x-bind:value="activeColumn?.margin?.right || 0"
                                            @input="activeColumn && (activeColumn.margin.right = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Right</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-middle"
                                            x-bind:value="activeColumn?.margin?.bottom || 0"
                                            @input="activeColumn && (activeColumn.margin.bottom = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Bottom</span>
                                    </div>
                                    <div class="flex-1 flex flex-col items-center">
                                        <input type="number"
                                            class="w-full text-center rounded-r-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-last"
                                            x-bind:value="activeColumn?.margin?.left || 0"
                                            @input="activeColumn && (activeColumn.margin.left = $event.target.value)">
                                        <span class="text-xs text-gray-500 mt-1">Left</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Custom Classes -->
                        <div>
                            <h3 class="text-base font-semibold mb-2">Custom Classes</h3>
                            <input type="text"
                                class="w-full rounded-lg dark:bg-gray-800 focus:ring-0 filamentor-spacing-input filamentor-spacing-input-first"
                                placeholder="Enter custom classes" x-bind:value="activeColumn?.customClasses || ''"
                                @input="activeColumn && (activeColumn.customClasses = $event.target.value)">
                        </div>
                    </div>

                    <x-slot name="footer">
                        <x-filament::button type="button" @click="saveColumnSettings()">
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
                            <x-filament::button type="button" @click="saveElementContent($wire.get('elementData'))">
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

                            <x-filament::button type="button" color="danger" @click="confirmRowDeletion()">
                                Delete
                            </x-filament::button>
                        </div>
                    </x-slot>
                </x-filament::modal>
            </div>
        </div>
    </form>
</x-filament::page>