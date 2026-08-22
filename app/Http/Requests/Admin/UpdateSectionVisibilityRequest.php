<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSectionVisibilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skripsi' => ['nullable', 'boolean'],
            'workbench' => ['nullable', 'boolean'],
            'cases' => ['nullable', 'boolean'],
            'rotations' => ['nullable', 'boolean'],
            'media' => ['nullable', 'boolean'],
            'skills' => ['nullable', 'boolean'],
        ];
    }
}
