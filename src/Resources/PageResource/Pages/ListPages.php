<?php

namespace Geosem42\Filamentor\Resources\PageResource\Pages;

use geosem42\Filamentor\Resources\PageResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;

class ListPages extends ListRecords
{
    protected static string $resource = PageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
