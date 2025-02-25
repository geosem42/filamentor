<?php

namespace App\Http\Controllers;

use Geosem42\Filamentor\Models\Page;

class PageController extends Controller
{
    public function show($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        if (!$page->is_published) {
            abort(404);
        }

        return view('pages.show', compact('page'));
    }
}
