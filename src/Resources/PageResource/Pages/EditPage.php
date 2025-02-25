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
use Illuminate\Support\Facades\Log;
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
    protected $isLoading = false;
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

    /**
     * Prepares the form for editing a specific element type
     * 
     * @param string $type The element type class name
     * @param array|null $content The current content of the element
    */

    public function editElement(string $type, ?array $content = null)
    {
        try {
            $this->isLoading = true;
            
            // Reset element data first
            $this->resetElementData();
            
            // Store the active element type
            $this->activeElementType = $type;
            
            // Initialize and populate element data structure based on type
            if (str_contains($type, 'Text')) {
                $this->elementData['text'] = [
                    'content' => $content['text'] ?? null,
                ];
            } elseif (str_contains($type, 'Image')) {
                $this->elementData['image'] = [
                    'url' => $content['url'] ?? null,
                    'alt' => $content['alt'] ?? '',
                    'thumbnail' => $content['thumbnail'] ?? null
                ];
            } elseif (str_contains($type, 'Video')) {
                $this->elementData['video'] = [
                    'url' => $content['url'] ?? null
                ];
            }
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error initializing element editor', [
                'exception' => $e->getMessage(),
                'type' => $type,
            ]);
        } finally {
            $this->isLoading = false;
            
            // Get the element form regardless of any errors
            $this->getElementForm();
        }
    }

    /**
     * Generates a Filament form for editing the currently active element
     * 
     * @return \Filament\Forms\Form The generated form instance
    */

    public function getElementForm(): Form
    {
        try {
            // Check if we have an active element type
            if (empty($this->activeElementType)) {
                Log::warning('Attempted to build form with no active element type');
                return Form::make($this)->schema([]);
            }
            
            // Get the element registry service
            $registry = app(ElementRegistry::class);
            
            // Get the element for the active type
            $element = $registry->getElement($this->activeElementType);
            
            // Build the schema based on the element's settings
            if ($element instanceof ElementInterface) {
                return Form::make($this)
                    ->schema($this->buildElementFormSchema($element));
            }
            
            // Log that we couldn't find a valid element
            Log::warning('Element not found or invalid', [
                'type' => $this->activeElementType
            ]);
            
            // Return empty form if element doesn't exist
            return Form::make($this)->schema([]);
        } catch (\Exception $e) {
            // Log any exceptions
            Log::error('Error building element form', [
                'exception' => $e->getMessage(),
                'type' => $this->activeElementType ?? 'unknown'
            ]);
            
            // Return an empty form in case of exception
            return Form::make($this)->schema([]);
        }
    }

    /**
     * Processes and uploads media files for elements
     * Creates both original and thumbnail versions of images
     * 
     * @return array|null Image data array or null if no media uploaded
    */

    public function uploadMedia(): ?array
    {
        try {
            if (empty($this->media)) {
                return null;
            }

            // Get the first file from the media collection
            $file = collect($this->media)->first();
            if (!$file) {
                return null;
            }

            // Ensure we have a valid file
            if (!$file->isValid()) {
                throw new \Exception('Uploaded file is invalid');
            }

            // Store the original file
            $path = $file->store('elements', 'public');
            if (!$path) {
                throw new \Exception('Failed to store uploaded file');
            }

            // Create thumbnails directory if it doesn't exist
            $thumbnailDir = 'elements/thumbnails';
            if (!Storage::disk('public')->exists($thumbnailDir)) {
                Storage::disk('public')->makeDirectory($thumbnailDir);
            }

            // Generate and store thumbnail
            $thumbnailPath = $thumbnailDir . '/' . basename($path);
            
            try {
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file->getRealPath());
                $image->cover(100, 100)
                    ->save(storage_path('app/public/' . $thumbnailPath));
            } catch (\Exception $e) {
                // Log thumbnail generation error but continue with upload
                Log::warning('Failed to generate thumbnail', [
                    'error' => $e->getMessage(),
                    'file' => $path
                ]);
                // Use original as thumbnail if generation fails
                $thumbnailPath = $path;
            }

            // Generate URLs for the uploaded files
            $url = Storage::disk('public')->url($path);
            $thumbnailUrl = Storage::disk('public')->url($thumbnailPath);

            // Update element data with new image information
            $this->elementData['image'] = [
                'url' => $url,
                'thumbnail' => $thumbnailUrl,
                'alt' => $this->elementData['image']['alt'] ?? '',
            ];

            return $this->elementData['image'];
        } catch (\Exception $e) {
            Log::error('Media upload failed', [
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Saves content for the currently active element
     * Updates the appropriate data structure based on element type
     * 
     * @param mixed $content The content to save
     * @return array|null The updated element data or null if unsuccessful
    */

    public function saveElementContent($content): ?array
    {
        try {
            if (empty($this->activeElementType)) {
                Log::warning('Attempted to save content with no active element type');
                return null;
            }

            $result = null;
            
            // Using if-elseif instead of switch with str_contains which isn't proper switch-case usage
            if (str_contains($this->activeElementType, 'Text')) {
                $this->elementData['text']['content'] = $content;
                $result = ['text' => $content];
            } elseif (str_contains($this->activeElementType, 'Video')) {
                $this->elementData['video']['url'] = $content;
                $result = ['url' => $content];
            } elseif (str_contains($this->activeElementType, 'Image')) {
                $this->elementData['image']['alt'] = $content;
                $result = $this->elementData['image'];
            } else {
                Log::warning('Unknown element type for content saving', [
                    'type' => $this->activeElementType
                ]);
            }

            // Clean up the media property after saving
            $this->media = null;
            
            return $result;
        } catch (\Exception $e) {
            Log::error('Failed to save element content', [
                'error' => $e->getMessage(),
                'type' => $this->activeElementType ?? 'unknown'
            ]);
            
            // Clean up even if there's an error
            $this->media = null;
            
            return null;
        }
    }

    /**
     * Resets all element data to default values
     * Clears any uploaded media and resets element data structures for all types
    */

    protected function resetElementData(): void
    {
        // Clear any uploaded media files
        $this->media = null;
        
        // Reset all element data structures to their default states
        $this->elementData = [
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
            ],
        ];
    }

    /**
     * Builds a form schema based on an element's settings
     * Converts element settings into appropriate Filament form components
     * 
     * @param ElementInterface $element The element to build the form for
     * @return array The form schema array
    */
    protected function buildElementFormSchema(ElementInterface $element): array
    {
        try {
            // Get settings from the element
            $settings = $element->getSettings();
            
            // Validate settings is an array
            if (!is_array($settings)) {
                Log::warning('Element settings is not an array', [
                    'type' => $this->activeElementType,
                    'settings_type' => gettype($settings)
                ]);
                return [];
            }
            
            // Transform each setting into a form component
            return collect($settings)->map(function ($setting, $key) {
                // Validate setting structure
                if (!isset($setting['type']) || !isset($setting['label'])) {
                    return null; // Skip invalid settings
                }
                
                // Match setting type to appropriate form component
                return match ($setting['type']) {
                    'file' => $this->buildFileUploadComponent($setting),
                    'textarea' => RichEditor::make('elementData.text.content')
                        ->label($setting['label']),
                    'text' => $this->buildTextInputComponent($setting),
                    default => null // Skip unknown setting types
                };
            })
            ->filter() // Remove null values (invalid or unknown settings)
            ->toArray();
        } catch (\Exception $e) {
            Log::error('Error building element form schema', [
                'error' => $e->getMessage(),
                'type' => $this->activeElementType ?? 'unknown'
            ]);
            return [];
        }
    }

    /**
     * Builds a file upload component for image elements
     * 
     * @param array $setting The setting configuration
     * @return FileUpload The configured FileUpload component
    */
    protected function buildFileUploadComponent(array $setting): FileUpload
    {
        return FileUpload::make('media')
            ->image()
            ->imageEditor()
            ->directory('elements')
            ->label($setting['label'])
            ->live()
            ->maxFiles(1)
            ->disk('public')
            ->helperText(function() {
                if (str_contains($this->activeElementType, 'Image') && !empty($this->elementData['image']['url'])) {
                    // Create a basic preview with proper HTML
                    return new \Illuminate\Support\HtmlString(
                        '<div class="mt-2">
                            <p class="text-sm font-medium">Current image:</p>
                            <div class="mt-1">
                                <img src="' . $this->elementData['image']['url'] . '" 
                                    alt="Current image" 
                                    class="w-40 h-auto object-cover rounded-lg border border-gray-200" />
                            </div>
                        </div>'
                    );
                }
                return '';
            });
    }

    /**
     * Builds a text input component based on element type
     * 
     * @param array $setting The setting configuration
     * @return TextInput The configured TextInput component
    */
    protected function buildTextInputComponent(array $setting): TextInput
    {
        // Determine the field name based on element type
        $fieldName = str_contains($this->activeElementType, 'Video')
            ? 'elementData.video.url'
            : 'elementData.image.alt';
            
        return TextInput::make($fieldName)->label($setting['label']);
    }

    /**
     * Saves the page layout structure to the database
     * 
     * @param string $layout JSON string containing the layout structure
     * @return array Response with success status and message
    */
    public function saveLayout(string $layout): array
    {
        try {
            // Validate layout is valid JSON
            json_decode($layout);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \InvalidArgumentException('Invalid JSON layout data provided');
            }
            
            // Update and save the record
            $this->record->layout = $layout;
            $this->record->save();
            $this->record->refresh();
            
            return [
                'success' => true,
                'message' => 'Layout saved successfully'
            ];
        } catch (\Exception $e) {
            Log::error('Failed to save layout', [
                'error' => $e->getMessage(),
                'record_id' => $this->record->id ?? null
            ]);
            
            return [
                'success' => false,
                'message' => 'Failed to save layout: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Reorders columns within a specific row
     * 
     * @param int|string $rowId The ID of the row to update
     * @param string $columns JSON string containing the updated columns
     * @return void
    */
    public function reorderColumns($rowId, string $columns): void
    {
        try {
            // Get current layout
            $layout = json_decode($this->record->layout, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \InvalidArgumentException('Invalid layout JSON in record');
            }
            
            // Decode columns data
            $columnsData = json_decode($columns, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \InvalidArgumentException('Invalid columns JSON provided');
            }
            
            // Validate layout is an array
            if (!is_array($layout)) {
                throw new \InvalidArgumentException('Layout is not a valid array');
            }
            
            // Find and update the specific row's columns
            $rowFound = false;
            foreach ($layout as &$row) {
                if (isset($row['id']) && $row['id'] == $rowId) {
                    $row['columns'] = $columnsData;
                    $rowFound = true;
                    break;
                }
            }
            
            if (!$rowFound) {
                Log::warning('Row not found during column reordering', [
                    'row_id' => $rowId
                ]);
            }
            
            // Save the entire layout
            $this->record->layout = json_encode($layout);
            $this->record->save();
            $this->record->refresh();
        } catch (\Exception $e) {
            Log::error('Failed to reorder columns', [
                'error' => $e->getMessage(),
                'row_id' => $rowId,
                'record_id' => $this->record->id ?? null
            ]);
        }
    }

}
