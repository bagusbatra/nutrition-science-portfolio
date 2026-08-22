<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'senderName' => ['required', 'string'],
            'senderOrg' => ['nullable', 'string'],
            'senderEmail' => ['required', 'string'],
            'inquiryType' => ['required', 'string'],
            'message' => ['required', 'string'],
        ];
    }
}
