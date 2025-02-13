<?php

namespace Geosem42\Filamentor\Resources\PageResource\Pages;

use geosem42\Filamentor\Resources\PageResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Form;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Toggle;
use Illuminate\Database\Eloquent\Model;
class EditPage extends EditRecord
{
    protected static string $resource = PageResource::class;
    protected static string $view = 'filamentor::pages.builder';
    public $elementContent = '';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Page Details')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('description')
                            ->maxLength(255),
                        Toggle::make('is_published')
                            ->label('Published')
                            ->helperText('Make this page visible to users'),
                    ])
                    ->columns(2)
            ]);
    }

    protected function getFormModel(): Model
    {
        return $this->record;
    }

    public function getElementForm(): Form
    {
        return Form::make($this)
            ->schema([
                RichEditor::make('elementContent')
                    ->label('Content')
            ]);
    }

    public function saveLayout($layout)
    {
        \Log::info('saveLayout test');
        
        \Log::info('saveLayout received:', [
            'layout type' => gettype($layout),
            'layout' => $layout
        ]);
        
        $this->record->layout = $layout;
        $this->record->save();
        $this->record->refresh();
        
        \Log::info('saveLayout saved:', [
            'layout type' => gettype($this->record->layout),
            'layout' => $this->record->layout
        ]);
    }

    public function reorderColumns($rowId, $columns)
    {
        \Log::info('reorderColumns starting with:', [
            'rowId' => $rowId,
            'columns' => $columns
        ]);
    
        // Get current layout
        $layout = json_decode($this->record->layout, true);
    
        // Find and update the specific row's columns
        foreach ($layout as &$row) {
            if ($row['id'] == $rowId) {
                $row['columns'] = json_decode($columns, true);
                break;
            }
        }
    
        \Log::info('Updated layout:', ['layout' => $layout]);
    
        // Save the entire layout
        $this->record->layout = json_encode($layout);
        $this->record->save();
        $this->record->refresh();
    }
    
}
