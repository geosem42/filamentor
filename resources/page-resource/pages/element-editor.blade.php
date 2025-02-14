<x-filament::modal id="element-editor-modal">
    @if(str_contains($activeElementType, 'Text'))
        <x-filament-forms::field-wrapper>
            {{ $this->form }}
        </x-filament-forms::field-wrapper>
    @else
        <input 
            type="file" 
            x-on:change="$event.target.files[0] && $wire.upload('media', $event.target.files[0], 
                (uploadedFilename) => {
                    $wire.uploadMedia(uploadedFilename)
                }
            )"
        >
    @endif
</x-filament::modal>
