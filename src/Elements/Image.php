<?php

namespace Geosem42\Filamentor\Elements;

use Geosem42\Filamentor\Contracts\ElementInterface;

class Image implements ElementInterface
{
    public function render(): string
    {
        return view('filamentor::elements.image')->render();
    }

    public function getIcon(): string
    {
        return 'heroicon-o-photo';
    }

    public function getName(): string
    {
        return 'Image';
    }

    public function getSettings(): array
    {
        return [
            'image' => [
                'type' => 'file',
                'label' => 'Image',
                'default' => ''
            ],
            'alt' => [
                'type' => 'text',
                'label' => 'Alt Text',
                'default' => ''
            ]
        ];
    }
}
