<?php

namespace App\Livewire;

use Livewire\Component;

class Page extends Component
{
    public $page;
    public $layout;

    public function mount($page)
    {
        $this->page = $page;
        $cleanLayout = trim($page->layout, '"');
        $this->layout = json_decode($cleanLayout, true);
    }

    public function render()
    {
        return view('livewire.page', [
            'content' => $this->layout
        ]);
    }
}
