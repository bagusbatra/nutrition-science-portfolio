<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaInfographic extends Model
{
    protected $fillable = [
        'title', 'category', 'target_audience', 'description',
        'key_points', 'thumbnail_bg', 'accent_color', 'dimensions',
    ];

    protected $casts = [
        'key_points' => 'array',
    ];
}
