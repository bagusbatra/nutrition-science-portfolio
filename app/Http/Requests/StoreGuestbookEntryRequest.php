<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuestbookEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'role' => ['required', 'string'],
            'message' => ['required', 'string'],
            'emoji' => ['nullable', 'string'],
        ];
    }
}
