<?php

namespace Geosem42\Filamentor\Pages;

use Filament\Pages\Page;

class Filamentor extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Page Builder';
    protected static ?string $title = 'Page Builder';
    protected static string $view = 'filamentor::pages.filamentor';
}
