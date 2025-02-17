<?php

namespace Geosem42\Filamentor\Commands;

use Illuminate\Console\Command;

class InstallFilamentor extends Command
{
    protected $signature = 'filamentor:install';
    protected $description = 'Install Filamentor components and frontend stack';

    public function handle()
    {
        // Assets publishing
        $this->publishAssets([
            __DIR__ . '/../../node_modules/@alpinejs/sort/dist/cdn.min.js' => public_path('js/geosem42/filamentor/alpine-sort.js'),
            __DIR__ . '/../../dist/filamentor.js' => public_path('js/geosem42/filamentor/filamentor.js'),
            __DIR__ . '/../../dist/filamentor.css' => public_path('css/geosem42/filamentor/filamentor.css'),
        ]);

        // Core publishing
        $this->publishCore([
            __DIR__ . '/../../stubs/PageController.php.stub' => app_path('Http/Controllers/PageController.php'),
        ]);

        // Frontend choice and publishing will come next
        $stack = $this->choice(
            'Which frontend stack would you like to use?',
            ['Vue', 'Livewire'],
            0
        );

        // Vue components publishing
        if ($stack === 'Vue') {
            $this->publishVueComponents();
        }        

        // Show next steps
        $this->info('Filamentor installed successfully!');
        $this->info("Add this route to your routes/web.php:");
        $this->line("Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('page.show');");
    }

    private function publishAssets(array $assets)
    {
        $this->info('Publishing assets...');
        foreach ($assets as $from => $to) {
            if (file_exists($from)) {
                copy($from, $to);
            }
        }
    }

    private function publishCore(array $files)
    {
        $this->info('Installing core files...');
        foreach ($files as $from => $to) {
            if (file_exists($from)) {
                copy($from, $to);
            }
        }
    }

    private function publishVueComponents()
    {
        $this->info('Publishing Vue components...');
        
        $components = [
            __DIR__ . '/../../stubs/vue/Page.vue' => resource_path('js/Pages/Page.vue'),
            __DIR__ . '/../../stubs/vue/elements/TextElement.vue' => resource_path('js/Components/Elements/TextElement.vue'),
            __DIR__ . '/../../stubs/vue/elements/ImageElement.vue' => resource_path('js/Components/Elements/ImageElement.vue'),
            __DIR__ . '/../../stubs/vue/elements/VideoElement.vue' => resource_path('js/Components/Elements/VideoElement.vue'),
        ];

        foreach ($components as $from => $to) {
            if (!file_exists(dirname($to))) {
                mkdir(dirname($to), 0755, true);
            }
            copy($from, $to);
        }
    }
}
