<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreRotationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => ['required', 'string'],
            'institution' => ['required', 'string'],
            'period' => ['required', 'string'],
            'role' => ['required', 'string'],
            'location' => ['required', 'string'],
            'badges' => ['nullable', 'array'],
            'achievements' => ['nullable', 'array'],
            'highlight_metric' => ['required', 'string'],
            'icon_name' => ['required', 'string'],
        ];
    }
}
