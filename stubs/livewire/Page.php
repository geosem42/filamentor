<?php

namespace App\Livewire;

use Livewire\Component;

class Page extends Component
{
    public $page;
    public $content;

    public function mount($page)
    {
        $this->page = $page;
        $this->content = json_decode($page->content, true);
    }

    public function render()
    {
        return view('livewire.page');
    }
}
