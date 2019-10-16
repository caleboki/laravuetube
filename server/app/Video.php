<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'name', 'description', 'thumbnail', 'videoUrl'
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
