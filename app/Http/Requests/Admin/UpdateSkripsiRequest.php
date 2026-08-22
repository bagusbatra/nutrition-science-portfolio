<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSkripsiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'sub_title' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'completion_date' => ['nullable', 'string'],
            'abstract' => ['nullable', 'string'],
            'advisor' => ['nullable', 'array'],
            'hypotheses' => ['nullable', 'array'],
            'key_takeaways' => ['nullable', 'array'],
            'formulations' => ['nullable', 'array'],
        ];
    }
}
