<?php

namespace Geosem42\Filamentor\Commands;

use Illuminate\Console\Command;

class InstallFilamentor extends Command
{
    protected $signature = 'filamentor:install';
    protected $description = 'Install Filamentor components and frontend stack';

    public function handle()
    {
        // Migrations publishing
        $this->publishMigrations();

        // Assets publishing
        $this->publishAssets([
            __DIR__ . '/../../node_modules/@alpinejs/sort/dist/cdn.min.js' => public_path('js/filamentor/alpine-sort.js'),
            __DIR__ . '/../../dist/filamentor.js' => public_path('js/filamentor/filamentor.js'),
            __DIR__ . '/../../dist/filamentor.css' => public_path('css/filamentor/filamentor.css'),
        ]);

        // Frontend choice and publishing will come next
        $stack = $this->choice(
            'Which frontend stack would you like to use?',
            ['Vue', 'Livewire'],
            0
        );
       
        $this->publishStackFiles($stack);

        // Show next steps
        $this->info('Filamentor installed successfully!');
        $this->info("Add this route to your routes/web.php:");
        $this->line("Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('page.show');");
    }

    private function publishAssets(array $assets)
    {
        $this->info('Publishing assets...');
        foreach ($assets as $from => $to) {
            if (!file_exists(dirname($to))) {
                mkdir(dirname($to), 0755, true);
            }

            if (file_exists($from)) {
                copy($from, $to);
            }
        }
    }

    private function publishMigrations()
    {
        $this->info('Publishing migrations...');
        
        $from = __DIR__ . '/../../database/migrations';
        $to = database_path('migrations');

        if (!is_dir($from)) {
            return;
        }

        if (!is_dir($to)) {
            mkdir($to, 0755, true);
        }

        $files = scandir($from);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }

            // Strip both .stub and .php extensions and add fresh .php
            $baseName = preg_replace('/\.(php|stub)$/', '', $file);
            $newFileName = date('Y_m_d_His_') . $baseName;
            copy($from . '/' . $file, $to . '/' . $newFileName);
        }
    }

    private function publishStackFiles(string $stack)
    {
        $this->info("Publishing {$stack} files...");

        $files = match ($stack) {
            'Vue' => [
                __DIR__ . '/../../stubs/vue/Page.vue' => resource_path('js/Pages/Page.vue'),
                __DIR__ . '/../../stubs/vue/elements/TextElement.vue' => resource_path('js/Components/Elements/TextElement.vue'),
                __DIR__ . '/../../stubs/vue/elements/ImageElement.vue' => resource_path('js/Components/Elements/ImageElement.vue'),
                __DIR__ . '/../../stubs/vue/elements/VideoElement.vue' => resource_path('js/Components/Elements/VideoElement.vue'),
                __DIR__ . '/../../stubs/controllers/InertiaPageController.php.stub' => app_path('Http/Controllers/PageController.php'),
            ],
            'Livewire' => [
                __DIR__ . '/../../stubs/livewire/Page.php' => app_path('Livewire/Page.php'),
                __DIR__ . '/../../stubs/livewire/elements/TextElement.php' => app_path('Livewire/Elements/TextElement.php'),
                __DIR__ . '/../../stubs/livewire/elements/ImageElement.php' => app_path('Livewire/Elements/ImageElement.php'),
                __DIR__ . '/../../stubs/livewire/elements/VideoElement.php' => app_path('Livewire/Elements/VideoElement.php'),
                __DIR__ . '/../../stubs/controllers/LivewirePageController.php.stub' => app_path('Http/Controllers/PageController.php'),
            ],
        };

        foreach ($files as $from => $to) {
            if (!file_exists(dirname($to))) {
                mkdir(dirname($to), 0755, true);
            }
            copy($from, $to);
        }
    }

}
