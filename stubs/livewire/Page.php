<?php

namespace App\Livewire;

use Livewire\Component;

class Page extends Component
{
    public $page;
    public $layout;
    public $content;
    public $pageTitle;
    public $pageDescription;
    public $ogImage;

    public function mount($page)
    {
        $this->page = $page;
        
        // Decoded arrays and JSON strings
        if (is_string($page->layout)) {
            $cleanLayout = trim($page->layout, '"');
            $this->content = json_decode($cleanLayout, true);
        } else {
            $this->content = $page->layout;
        }

        // Set SEO metadata
        $this->pageTitle = $page->meta_title ?: $page->title;
        $this->pageDescription = $page->meta_description ?: $page->description;
        $this->ogImage = $page->og_image;

        $this->layout = json_decode($cleanLayout, true);
    }

    public function render()
    {
        return view('livewire.page', [
            'content' => $this->layout
        ]);
    }
}
