<?php

namespace Geosem42\Filamentor\Elements;

use Geosem42\Filamentor\Contracts\ElementInterface;

class Text implements ElementInterface
{
    public function render(): string
    {
        return view('filamentor::elements.text')->render();
    }

    public function getIcon(): string
    {
        return 'heroicon-o-document-text';
    }

    public function getName(): string
    {
        return 'Text';
    }

    public function getSettings(): array
    {
        return [
            'content' => [
                'type' => 'textarea',
                'label' => 'Content',
                'default' => ''
            ]
        ];
    }
}
