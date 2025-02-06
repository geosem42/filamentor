<?php

namespace Geosem42\Filamentor\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Geosem42\Filamentor\Filamentor
 */
class Filamentor extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Geosem42\Filamentor\Filamentor::class;
    }
}
