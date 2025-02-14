<div class="filamentor-element filamentor-image-element">
    @if(isset($image) && $image)
        <img src="{{ $image }}" alt="{{ $alt ?? '' }}" class="max-w-full h-auto">
    @else
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            Add an image
        </div>
    @endif
</div>
