<?php

namespace Geosem42\Filamentor\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $table = 'filamentor_pages';
    
    protected $guarded = [];
    
    protected $casts = [
        'layout' => 'array',
        'is_published' => 'boolean',
    ];
    
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($page) {
            $page->slug = Str::slug($page->title);
        });
    }
}
