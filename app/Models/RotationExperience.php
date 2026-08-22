<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RotationExperience extends Model
{
    protected $fillable = [
        'category', 'institution', 'period', 'role', 'location',
        'badges', 'achievements', 'highlight_metric', 'icon_name',
    ];

    protected $casts = [
        'badges' => 'array',
        'achievements' => 'array',
    ];
}
