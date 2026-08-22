<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSkillsRequest;
use App\Models\SkillsAndCompetency;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SkillsController extends Controller
{
    public function edit(): View
    {
        $skills = SkillsAndCompetency::first() ?? new SkillsAndCompetency([
            'clinical' => [], 'food_service' => [], 'software' => [], 'certifications' => [],
        ]);

        return view('admin.skills.edit', compact('skills'));
    }

    public function update(UpdateSkillsRequest $request): RedirectResponse
    {
        $data = [
            'clinical' => $request->input('clinical', []),
            'food_service' => $request->input('food_service', []),
            'software' => $request->input('software', []),
            'certifications' => $request->input('certifications', []),
        ];

        SkillsAndCompetency::query()->first()?->update($data) ?? SkillsAndCompetency::create($data);

        return back()->with('status', 'Perubahan tersimpan.');
    }
}
