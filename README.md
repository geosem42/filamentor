# Filamentor - Drag & Drop Page Builder for Filament

Filamentor is a powerful, flexible page builder plugin for Laravel Filament that empowers you to create dynamic pages with a modern drag-and-drop interface. Build professional layouts without writing code using an intuitive grid-based system.

![Filamentor Screenshot](https://i.imgur.com/hbOquvS.png)

## Key Features

- **Drag & Drop Interface**: Easily create and arrange content with intuitive drag-and-drop interactions
- **Responsive Grid System**: Build layouts using a flexible row/column grid that adapts to different screen sizes
- **Ready-to-Use Elements**: Includes text, image, and video elements out of the box
- **Margin & Padding Controls**: Fine-tune spacing with visual controls for perfect layouts
- **Custom CSS Classes**: Apply custom styling to any row or column for unlimited design possibilities
- **Multiple Frontend Options**: Works with both Vue/Inertia and Livewire stacks
- **Seamless Filament Integration**: Appears as a native feature in your Filament admin panel
## Installation

### Prerequisites

- PHP 8.1 or higher
- Laravel 11.x or higher
- Filament 3.x
- Tailwind CSS

## CSS Framework Dependency

Filamentor relies on TailwindCSS for its layout system, particularly for:

- Grid layouts (`grid-cols-*` classes)
- Spacing utilities (`p-*`, `m-*` classes)
- Responsive design classes

Make sure your layout includes Tailwind CSS.

### Step 1: Install the Package

```bash
composer require geosem42/filamentor
```

### Step 2: Run the Installation Command

```bash
php artisan filamentor:install
```

This command will:

1. Publish migration files to your database/migrations directory
2. Create necessary public asset directories and copy required files:
    - `/public/js/filamentor/filamentor.js`
    - `/public/css/filamentor/filamentor.css`
3. Prompt you to select your preferred frontend stack (Vue or Livewire)
4. Publish stack-specific files.

### Step 3: Run Migrations

After installing the package, run the migrations:

```bash
php artisan migrate
```

This will create the necessary database tables for pages, layouts, and related entities.

### Step 4: Add Route

Add the following route to your `routes/web.php`:

```php
Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('page.show');
```

### Step 5: Update Tailwind Configuration

To ensure dynamic grid classes work properly, add the following to your `tailwind.config.js` file:

```javascript
module.exports = {
    // ...other config
    safelist: [
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols-6',
        'grid-cols-7',
        'grid-cols-8',
        'grid-cols-9',
        'grid-cols-10',
        'grid-cols-11',
        'grid-cols-12'
    ],
    // ...other config
}
```

### Step 6: Register with Filament

Add the Filamentor plugin to your Filament panel provider in `app/Providers/Filament/AdminPanelProvider.php`:

```php
use Geosem42\Filamentor\FilamentorPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...other configuration
        ->plugins([
            // ...other plugins
            FilamentorPlugin::make(),
        ]);
}
```

### Step 7: Compile Assets (if using Vue)

If you're using the Vue stack, run:

```bash
npm run build
```

## Post-installation

After installation, you'll find the Filamentor page builder in your Filament admin panel. You can create and manage pages through the interface.

## Template Integration Note

The Filamentor page templates (both Vue and Livewire versions) do not come pre-integrated with any application layout. You will need to manually include them in your own application layout to ensure proper styling, navigation, and site structure.

For example:

- In Livewire: Wrap `resources/views/pages/show.blade.php` in your layout.
- In Vue: Include the `resources/js/Pages/Page.vue` within your `AppLayout` layout component.

This design gives you complete flexibility to integrate Filamentor pages within your existing site structure.

## Stack-Specific Notes

### Vue/Inertia Setup

If you selected the Vue stack, ensure Inertia.js is properly installed and configured in your application. The page rendering happens through the Inertia Page component published during installation.

### Livewire Setup

If you selected the Livewire stack, ensure Livewire is properly installed. The page rendering will use the Livewire components published during installation.

For proper SEO functionality with Filamentor's Livewire implementation, your layout must include a `@stack('meta')` directive in the `<head>` section.

## Published Files

The installation command will publish the following files depending on your selected stack.
#### For Vue:

- `resources/js/Pages/Page.vue`
- `resources/js/Components/Elements/TextElement.vue`
- `resources/js/Components/Elements/ImageElement.vue`
- `resources/js/Components/Elements/VideoElement.vue`
- `app/Http/Controllers/PageController.php`

#### For Livewire:

- `app/Livewire/Page.php`
- `app/Livewire/Elements/TextElement.php`
- `app/Livewire/Elements/ImageElement.php`
- `app/Livewire/Elements/VideoElement.php`
- `app/Http/Controllers/PageController.php`
- `resources/views/livewire/page.blade.php`
- `resources/views/pages/show.blade.php`
- `resources/views/livewire/elements/text-element.blade.php`
- `resources/views/livewire/elements/image-element.blade.php`
- `resources/views/livewire/elements/video-element.blade.php`


## Troubleshooting

If you encounter issues with the Filamentor UI after installation:

1. Ensure all frontend assets have been published correctly
2. Verify that you've added the Tailwind safelist configuration
3. Make sure you've registered the plugin with your Filament panel
4. Check that you've run migrations and your database tables are created correctly

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
