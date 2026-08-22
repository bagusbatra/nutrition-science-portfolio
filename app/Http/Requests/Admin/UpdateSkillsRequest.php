<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSkillsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'clinical' => ['nullable', 'array'],
            'food_service' => ['nullable', 'array'],
            'software' => ['nullable', 'array'],
            'certifications' => ['nullable', 'array'],
        ];
    }
}
