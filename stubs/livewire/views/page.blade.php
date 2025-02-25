@php
use Illuminate\Support\Str;
@endphp

@push('meta')
    <title>{{ $pageTitle }}</title>
    @if($pageDescription)
        <meta name="description" content="{{ $pageDescription }}">
    @endif
    @if($pageTitle)
        <meta property="og:title" content="{{ $pageTitle }}">
    @endif
    @if($pageDescription)
        <meta property="og:description" content="{{ $pageDescription }}">
    @endif
    @if($ogImage)
        <meta property="og:image" content="{{ $ogImage }}">
    @endif
    <meta property="og:type" content="website">
@endpush

<div>
    <div class="container mx-auto max-w-7xl">
        @foreach($content as $row)
            <div class="grid mb-4 grid-cols-{{ count($row['columns']) }} grid-rows-1 {{ $row['customClasses'] ?? '' }}"
                style="
                    padding-top: {{ $row['padding']['top'] ?? 0 }}px;
                    padding-right: {{ $row['padding']['right'] ?? 0 }}px;
                    padding-bottom: {{ $row['padding']['bottom'] ?? 0 }}px;
                    padding-left: {{ $row['padding']['left'] ?? 0 }}px;
                    margin-top: {{ $row['margin']['top'] ?? 0 }}px;
                    margin-right: {{ $row['margin']['right'] ?? 0 }}px;
                    margin-bottom: {{ $row['margin']['bottom'] ?? 0 }}px;
                    margin-left: {{ $row['margin']['left'] ?? 0 }}px;
                ">
                @foreach($row['columns'] as $column)
                    <div class="{{ $column['customClasses'] ?? '' }}"
                        style="
                            padding-top: {{ $column['padding']['top'] ?? 0 }}px;
                            padding-right: {{ $column['padding']['right'] ?? 0 }}px;
                            padding-bottom: {{ $column['padding']['bottom'] ?? 0 }}px;
                            padding-left: {{ $column['padding']['left'] ?? 0 }}px;
                            margin-top: {{ $column['margin']['top'] ?? 0 }}px;
                            margin-right: {{ $column['margin']['right'] ?? 0 }}px;
                            margin-bottom: {{ $column['margin']['bottom'] ?? 0 }}px;
                            margin-left: {{ $column['margin']['left'] ?? 0 }}px;
                        ">
                        @foreach($column['elements'] as $element)
                            @livewire(Str::lower(class_basename($element['type'])) . '-element', 
                                ['content' => $element['content']], key($element['type'] . '-' . $loop->index))
                        @endforeach
                    </div>
                @endforeach
            </div>
        @endforeach
    </div>
</div>
