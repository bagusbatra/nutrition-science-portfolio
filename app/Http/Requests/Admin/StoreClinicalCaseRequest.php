<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreClinicalCaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string'],
            'title' => ['required', 'string'],
            'patient_profile' => ['required', 'array'],
            'patient_profile.initial' => ['required', 'string'],
            'patient_profile.age' => ['nullable', 'numeric'],
            'patient_profile.gender' => ['required', 'string'],
            'patient_profile.room' => ['nullable', 'string'],
            'patient_profile.medicalDiagnosis' => ['nullable', 'string'],
            'patient_profile.dietOrder' => ['nullable', 'string'],
            'adime' => ['required', 'array'],
        ];
    }
}
