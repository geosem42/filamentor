<?php

namespace Geosem42\Filamentor\Elements;

use Geosem42\Filamentor\Contracts\ElementInterface;

class Video implements ElementInterface
{
    public function render(): string
    {
        return 'elements.video';
    }
    
    public function getName(): string
    {
        return 'Video';
    }

    public function getIcon(): string
    {
        return 'heroicon-o-video-camera';
    }

    public function getSettings(): array
    {
        return [
            'url' => [
                'type' => 'text',
                'label' => 'YouTube URL',
                'default' => ''
            ]
        ];
    }
}
