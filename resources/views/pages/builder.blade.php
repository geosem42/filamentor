<x-filament::page>
    {{ $this->form }}

    <div class="mt-8 filamentor-canvas" x-data="filamentor">
        <div id="rows-container" class="space-y-4">
            <!-- Rows will be rendered here -->
        </div>
    </div>
</x-filament::page>
