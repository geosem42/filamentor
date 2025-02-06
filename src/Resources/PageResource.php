<?php

namespace Geosem42\Filamentor\Resources;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use geosem42\Filamentor\Models\Page;
use Illuminate\Support\Str;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $state, Forms\Set $set) => 
                                $set('slug', Str::slug($state))),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Textarea::make('description')
                            ->maxLength(65535),
                    ]),
                
                Forms\Components\Section::make('Publishing')
                    ->schema([
                        Forms\Components\Toggle::make('is_published')
                            ->default(false)
                            ->helperText('Make this page visible to the public'),
                    ]),
            ]);
    }
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('slug')->prefix('/'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
            ]);
    }
    
    public static function getPages(): array
{
    return [
        'index' => PageResource\Pages\ListPages::route('/'),
        'create' => PageResource\Pages\CreatePage::route('/create'),
        'edit' => PageResource\Pages\EditPage::route('/{record}/edit'),
    ];
}

}
