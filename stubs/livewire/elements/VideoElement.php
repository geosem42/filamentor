<?php

namespace App\Livewire\Elements;

use Livewire\Component;

class VideoElement extends Component
{
    public $content;

    public function mount($content)
    {
        $this->content = $content;
    }

    public function render()
    {
        return view('livewire.elements.video-element');
    }
}
