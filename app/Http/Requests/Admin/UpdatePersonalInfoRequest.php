<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonalInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'title' => ['required', 'string'],
            'tagline' => ['required', 'string'],
            'university' => ['required', 'string'],
            'faculty' => ['required', 'string'],
            'gpa' => ['required', 'string'],
            'status' => ['required', 'string'],
            'target_graduation' => ['required', 'string'],
            'email' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'linkedin' => ['required', 'string'],
            'location' => ['required', 'string'],
            'bio' => ['required', 'string'],
            'stats' => ['nullable', 'array'],
            'stats.*.label' => ['nullable', 'string'],
            'stats.*.value' => ['nullable', 'string'],
            'stats.*.sub' => ['nullable', 'string'],
        ];
    }
}
