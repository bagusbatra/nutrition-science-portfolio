<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePersonalInfoRequest;
use App\Models\PersonalInfo;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class PersonalInfoController extends Controller
{
    public function edit(): View
    {
        $personalInfo = PersonalInfo::first() ?? new PersonalInfo(['stats' => []]);

        return view('admin.personal-info.edit', compact('personalInfo'));
    }

    public function update(UpdatePersonalInfoRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['stats'] = $request->input('stats', []);

        PersonalInfo::query()->first()?->update($data) ?? PersonalInfo::create($data);

        return back()->with('status', 'Perubahan tersimpan.');
    }
}
