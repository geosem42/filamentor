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
use Geosem42\Filamentor\Elements\Video;
use Illuminate\Support\Facades\Config;
use Livewire\Livewire;
use Illuminate\Support\Str;

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
        $registry->register(Video::class);
        $this->app->instance(ElementRegistry::class, $registry);

        // Register Livewire Components Right Here!
        Livewire::component('page', \App\Livewire\Page::class);
        Livewire::component('text-element', \App\Livewire\Elements\TextElement::class);
        Livewire::component('image-element', \App\Livewire\Elements\ImageElement::class);
        Livewire::component('video-element', \App\Livewire\Elements\VideoElement::class);
        
        if ($this->app->runningInConsole()) {
            $this->commands([
                Commands\InstallFilamentor::class
            ]);
        }

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
        return 'filamentor';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            Js::make('alpine-sort', __DIR__ . '/../dist/alpine-sort.js'),
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
