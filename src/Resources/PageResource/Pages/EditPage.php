<?php

namespace Geosem42\Filamentor\Resources\PageResource\Pages;

use geosem42\Filamentor\Resources\PageResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Form;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Grid;
use Illuminate\Database\Eloquent\Model;
use Filament\Forms\Components\FileUpload;
use Geosem42\Filamentor\Support\ElementRegistry;
use Geosem42\Filamentor\Contracts\ElementInterface;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;

class EditPage extends EditRecord
{
    use WithFileUploads;

    protected static string $resource = PageResource::class;
    protected static string $view = 'filamentor::pages.builder';
    protected $listeners = ['editElement'];
    public $activeElementType = '';
    public $temporaryUpload;
    public ?array $media = [];
    public ?array $data = null;
    public ?array $elementData = [
        'text' => [
            'content' => null,
        ],
        'image' => [
            'url' => null,
            'alt' => null,
            'thumbnail' => null,
        ],
        'video' => [
            'url' => null,
        ]
    ];

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Page Details')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, callable $set) {
                                $set('slug', Str::slug($state));
                            }),
                            
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(table: 'filamentor_pages', column: 'slug', ignorable: fn ($record) => $record)
                            ->dehydrated()
                            ->rules(['alpha_dash'])
                            ->helperText('The URL-friendly name for your page (auto-generated from title)'),
                            
                        Textarea::make('description')
                            ->maxLength(255)
                            ->helperText('A brief summary of this page (optional)'),
                            
                        Grid::make()
                            ->schema([
                                Toggle::make('is_published')
                                    ->label('Published')
                                    ->helperText('Make this page visible to users')
                                    ->default(false),
                            ]),
                    ]),
                    
                Section::make('SEO Information')
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('Meta Title')
                            ->helperText('Overrides the default title tag. Recommended length: 50-60 characters')
                            ->maxLength(60),
                            
                        Textarea::make('meta_description')
                            ->label('Meta Description')
                            ->helperText('A short description of the page for search engines. Recommended length: 150-160 characters')
                            ->maxLength(160),
                            
                        FileUpload::make('og_image')
                            ->label('Social Media Image')
                            ->image()
                            ->directory('page-social-images')
                            ->helperText('Used when sharing this page on social media (1200x630 pixels recommended)'),
                    ]),
            ]);
    }

    public function editElement($type, $content = null)
    {
        $this->activeElementType = $type;
        
        // Initialize and populate element data structure based on type
        if (str_contains($type, 'Text')) {
            $this->elementData['text'] = ['content' => $content['text'] ?? null];
        } elseif (str_contains($type, 'Image')) {
            $this->elementData['image'] = [
                'url' => $content['url'] ?? null,
                'alt' => $content['alt'] ?? null,
                'thumbnail' => $content['thumbnail'] ?? null
            ];
        } elseif (str_contains($type, 'Video')) {
            $this->elementData['video'] = ['url' => $content['url'] ?? null];
        }
        
        $this->getElementForm();
    }    

    public function getElementForm(): Form
    {
        $registry = app(ElementRegistry::class);
        $element = $registry->getElement($this->activeElementType);
        
        return Form::make($this)
            ->schema($element ? $this->buildElementFormSchema($element) : []);
    }

    public function uploadMedia()
    {
        if ($this->media) {
            $file = collect($this->media)->first();
            
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
            
            $this->elementData['image'] = [
                'url' => $url,
                'thumbnail' => $thumbnailUrl,
                'alt' => $this->elementData['image']['alt'] ?? '',
            ];
            
            return $this->elementData['image'];
        }
    }

    public function saveElementContent($content)
    {
        switch ($this->activeElementType) {
            case str_contains($this->activeElementType, 'Text'):
                $this->elementData['text']['content'] = $content;
                return ['text' => $content];
            case str_contains($this->activeElementType, 'Video'):
                $this->elementData['video']['url'] = $content;
                return ['url' => $content];
            case str_contains($this->activeElementType, 'Image'):
                $this->elementData['image']['alt'] = $content;
                return $this->elementData['image'];
        }
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
                'textarea' => RichEditor::make('elementData.text.content')
                    ->label($setting['label']),
                'text' => TextInput::make(
                    str_contains($this->activeElementType, 'Video') 
                        ? 'elementData.video.url' 
                        : 'elementData.image.alt'
                )->label($setting['label']),
            };
        })->toArray();
    }

    public function saveLayout($layout)
    {
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
