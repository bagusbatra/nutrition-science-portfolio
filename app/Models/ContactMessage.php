<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'sender_name', 'sender_org', 'sender_email', 'inquiry_type', 'message',
    ];
}
