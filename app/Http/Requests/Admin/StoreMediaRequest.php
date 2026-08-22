<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'category' => ['required', 'string'],
            'target_audience' => ['required', 'string'],
            'description' => ['required', 'string'],
            'key_points' => ['nullable', 'array'],
            'thumbnail_bg' => ['required', 'string'],
            'accent_color' => ['required', 'string'],
            'dimensions' => ['required', 'string'],
        ];
    }
}
