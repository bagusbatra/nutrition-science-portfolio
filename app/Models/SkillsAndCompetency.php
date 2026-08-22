<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillsAndCompetency extends Model
{
    protected $table = 'skills_and_competencies';

    protected $fillable = [
        'clinical', 'food_service', 'software', 'certifications',
    ];

    protected $casts = [
        'clinical' => 'array',
        'food_service' => 'array',
        'software' => 'array',
        'certifications' => 'array',
    ];
}
