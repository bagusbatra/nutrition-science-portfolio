<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalInfo extends Model
{
    protected $fillable = [
        'name', 'title', 'tagline', 'university', 'faculty', 'gpa', 'status',
        'target_graduation', 'email', 'phone', 'linkedin', 'location', 'bio', 'stats',
    ];

    protected $casts = [
        'stats' => 'array',
    ];
}
