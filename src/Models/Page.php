<?php

namespace Geosem42\Filamentor\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $table = 'filamentor_pages';
    
    // Instead of guarded, let's explicitly define fillable for better security
    protected $fillable = [
        'title',
        'slug',
        'description',
        'layout',
        'is_published',
        'meta_title',
        'meta_description',
        'og_image',
    ];
    
    protected $casts = [
        'layout' => 'array',
        'is_published' => 'boolean',
    ];
    
    // Get the meta title or fall back to the regular title
    public function getMetaTitleAttribute($value)
    {
        return $value ?: $this->title;
    }
    
    // Get URL-friendly slug
    public function getUrlAttribute()
    {
        return url($this->slug);
    }
    
    // Is the page accessible to visitors?
    public function getIsAccessibleAttribute()
    {
        return $this->is_published;
    }
    
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($page) {
            // Only auto-generate slug if not provided
            if (empty($page->slug)) {
                $page->slug = Str::slug($page->title);
            }
        });
        
        static::updating(function ($page) {
            // If title changed but slug didn't, update the slug
            if ($page->isDirty('title') && !$page->isDirty('slug')) {
                $page->slug = Str::slug($page->title);
            }
        });
    }
}
