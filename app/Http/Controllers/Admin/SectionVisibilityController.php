<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSectionVisibilityRequest;
use App\Models\SectionVisibility;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SectionVisibilityController extends Controller
{
    public function edit(): View
    {
        $visibility = SectionVisibility::first() ?? new SectionVisibility();

        return view('admin.settings.edit', compact('visibility'));
    }

    public function update(UpdateSectionVisibilityRequest $request): RedirectResponse
    {
        $keys = ['skripsi', 'workbench', 'cases', 'rotations', 'media', 'skills'];
        $data = collect($keys)->mapWithKeys(fn ($key) => [$key => $request->boolean($key)])->all();

        SectionVisibility::query()->first()?->update($data) ?? SectionVisibility::create($data);

        return back()->with('status', 'Perubahan tersimpan.');
    }
}
