<div>
    @foreach($content as $row)
        <div class="row">
            @foreach($row['columns'] as $column)
                <div class="column" style="width: {{ $column['width'] }}%">
                    @foreach($column['elements'] as $element)
                        @livewire("elements.{$element['type']}-element", 
                            ['content' => $element['content']], 
                            key($element['id']))
                    @endforeach
                </div>
            @endforeach
        </div>
    @endforeach
</div>
