<div class="video-element">
    <iframe 
        src="{{ str_replace('watch?v=', 'embed/', $content['url']) }}"
        width="100%" 
        height="{{ $content['height'] ?? '315' }}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>
