<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkripsiResearch extends Model
{
    protected $table = 'skripsi_research';

    protected $fillable = [
        'title', 'sub_title', 'advisor', 'status', 'completion_date',
        'abstract', 'hypotheses', 'formulations', 'key_takeaways',
    ];

    protected $casts = [
        'advisor' => 'array',
        'hypotheses' => 'array',
        'formulations' => 'array',
        'key_takeaways' => 'array',
    ];
}
