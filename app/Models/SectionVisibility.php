<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionVisibility extends Model
{
    protected $fillable = [
        'skripsi', 'workbench', 'cases', 'rotations', 'media', 'skills',
    ];

    protected $casts = [
        'skripsi' => 'boolean',
        'workbench' => 'boolean',
        'cases' => 'boolean',
        'rotations' => 'boolean',
        'media' => 'boolean',
        'skills' => 'boolean',
    ];
}
