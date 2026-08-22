<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicalCase extends Model
{
    protected $fillable = [
        'code', 'title', 'patient_profile', 'adime', 'key_learning',
    ];

    protected $casts = [
        'patient_profile' => 'array',
        'adime' => 'array',
    ];
}
