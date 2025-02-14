<?php

namespace Geosem42\Filamentor;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Geosem42\Filamentor\Commands\FilamentorCommand;
use Geosem42\Filamentor\Testing\TestsFilamentor;
use Geosem42\Filamentor\Support\ElementRegistry;
use Geosem42\Filamentor\Elements\Text;
use Geosem42\Filamentor\Elements\Image;

class FilamentorServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filamentor';

    public static string $viewNamespace = 'filamentor';

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package->name(static::$name)
            ->hasCommands($this->getCommands())
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->publishConfigFile()
                    ->publishMigrations()
                    ->askToRunMigrations()
                    ->askToStarRepoOnGitHub('geosem42/filamentor');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../database/migrations'))) {
            $package->hasMigrations($this->getMigrations());
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }
    }

    public function packageRegistered(): void {}

    public function packageBooted(): void
    {
        // Register Elements
        $registry = new ElementRegistry();
        $registry->register(Text::class);
        $registry->register(Image::class);
        $this->app->instance(ElementRegistry::class, $registry);
        
        $this->publishes([
            __DIR__ . '/../node_modules/@alpinejs/sort/dist/cdn.min.js' => public_path('js/geosem42/filamentor/alpine-sort.js'),
            __DIR__ . '/../dist/filamentor.js' => public_path('js/geosem42/filamentor/filamentor.js'),
            __DIR__ . '/../dist/filamentor.css' => public_path('css/geosem42/filamentor/filamentor.css'),
        ], 'filamentor-assets');

        // Asset Registration
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        // Icon Registration
        FilamentIcon::register($this->getIcons());

        // Handle Stubs
        if (app()->runningInConsole()) {
            foreach (app(Filesystem::class)->files(__DIR__ . '/../stubs/') as $file) {
                $this->publishes([
                    $file->getRealPath() => base_path("stubs/filamentor/{$file->getFilename()}"),
                ], 'filamentor-stubs');
            }
        }

        // Testing
        Testable::mixin(new TestsFilamentor);
    }

    protected function getAssetPackageName(): ?string
    {
        return 'geosem42/filamentor';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            Js::make('alpine-sort', __DIR__ . '/../node_modules/@alpinejs/sort/dist/cdn.min.js'),
            Js::make('filamentor', __DIR__ . '/../dist/filamentor.js'),
            Css::make('filamentor', __DIR__ . '/../dist/filamentor.css'),
        ];
    }

    /**
     * @return array<class-string>
     */
    protected function getCommands(): array
    {
        return [
            FilamentorCommand::class,
        ];
    }

    /**
     * @return array<string>
     */
    protected function getIcons(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getRoutes(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getMigrations(): array
    {
        return [
            'create_filamentor_table',
        ];
    }
}
