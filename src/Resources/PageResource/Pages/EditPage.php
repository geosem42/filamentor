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
use Filament\Forms\Components\FileUpload;
use Geosem42\Filamentor\Support\ElementRegistry;
use Geosem42\Filamentor\Contracts\ElementInterface;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class EditPage extends EditRecord
{
    use WithFileUploads;

    protected static string $resource = PageResource::class;
    protected static string $view = 'filamentor::pages.builder';
    protected $listeners = ['editElement'];
    public $activeElementType = '';
    public $temporaryUpload;
    public ?array $media = [];
    public string $elementContent = '';
    public ?array $data = null;

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

    public function editElement($type)
    {
        $this->activeElementType = $type;
        $this->getElementForm();
    }

    public function getElementForm(): Form
    {
        \Log::info('Active Element Type:', ['type' => $this->activeElementType]);
        
        $registry = app(ElementRegistry::class);
        $element = $registry->getElement($this->activeElementType);
        
        \Log::info('Element Settings:', [
            'element' => $element ? get_class($element) : null,
            'settings' => $element ? $element->getSettings() : null
        ]);

        return Form::make($this)
            ->schema($element ? $this->buildElementFormSchema($element) : []);
    }

    public function uploadMedia()
    {
        \Log::info('Starting uploadMedia', [
            'media' => $this->media,
            'elementContent' => $this->elementContent
        ]);

        if ($this->media) {
            $file = collect($this->media)->first();
            $altText = $this->elementContent;
            
            // Store original file
            $path = $file->store('elements', 'public');
            
            // Create thumbnails directory if it doesn't exist
            Storage::disk('public')->makeDirectory('elements/thumbnails');
            
            // Generate and store thumbnail
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getRealPath());
            $thumbnailPath = 'elements/thumbnails/' . basename($path);
            
            $image->cover(100, 100)
                  ->save(storage_path('app/public/' . $thumbnailPath));
            
            $url = Storage::disk('public')->url($path);
            $thumbnailUrl = Storage::disk('public')->url($thumbnailPath);
            
            $this->elementContent = $url;
            
            $response = [
                'url' => $url,
                'thumbnail' => $thumbnailUrl,
                'alt' => $altText,
            ];

            \Log::info('Completed uploadMedia', [
                'response' => $response
            ]);
            
            return $response;
        }
    }    

    public function saveElementContent($content)
    {
        return ['text' => $content];
    }    

    protected function buildElementFormSchema(ElementInterface $element): array
    {
        $settings = $element->getSettings();
        return collect($settings)->map(function ($setting, $key) {
            return match ($setting['type']) {
                'file' => FileUpload::make('media')
                    ->image()
                    ->imageEditor()
                    ->directory('elements')
                    ->label($setting['label'])
                    ->live()
                    ->maxFiles(1)
                    ->disk('public'),
                'textarea' => RichEditor::make('elementContent')
                    ->label($setting['label']),
                'text' => TextInput::make('elementContent')
                    ->label($setting['label']),
            };
        })->toArray();
    }

    public function saveLayout($layout)
    {
        // Store directly since it's already in the correct format
        $this->record->layout = $layout;
        $this->record->save();
        $this->record->refresh();

        return [
            'success' => true,
            'message' => 'Layout saved successfully'
        ];
    }

    public function reorderColumns($rowId, $columns)
    {
        // Get current layout
        $layout = json_decode($this->record->layout, true);
    
        // Find and update the specific row's columns
        foreach ($layout as &$row) {
            if ($row['id'] == $rowId) {
                $row['columns'] = json_decode($columns, true);
                break;
            }
        }
    
        // Save the entire layout
        $this->record->layout = json_encode($layout);
        $this->record->save();
        $this->record->refresh();
    }
    
}
