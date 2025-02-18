@php
use Illuminate\Support\Str;
@endphp

<div class="container mx-auto max-w-7xl">
    @foreach($content as $row)
        <div class="grid gap-4 mb-4 grid-cols-3">
            @foreach($row['columns'] as $column)
                <div>
                    @foreach($column['elements'] as $element)
                        @livewire(Str::lower(class_basename($element['type'])) . '-element', 
                            ['content' => $element['content']])
                    @endforeach
                </div>
            @endforeach
        </div>
    @endforeach
</div>
