<?php

namespace Geosem42\Filamentor\Commands;

use Illuminate\Console\Command;

class FilamentorCommand extends Command
{
    public $signature = 'filamentor';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
