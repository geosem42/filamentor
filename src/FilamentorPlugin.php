<?php

namespace Geosem42\Filamentor;

use Filament\Contracts\Plugin;
use Filament\Panel;

class FilamentorPlugin implements Plugin
{
    public function getId(): string
    {
        return 'filamentor';
    }

    public function register(Panel $panel): void
    {
        $panel
        ->resources([
            Resources\PageResource::class,
        ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }
}
