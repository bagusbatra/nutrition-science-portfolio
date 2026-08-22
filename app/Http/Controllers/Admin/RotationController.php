<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRotationRequest;
use App\Models\RotationExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class RotationController extends Controller
{
    public function index(): View
    {
        $rotations = RotationExperience::orderBy('created_at')->get();

        return view('admin.rotations.index', compact('rotations'));
    }

    public function create(): View
    {
        $rotation = new RotationExperience(['badges' => [], 'achievements' => []]);

        return view('admin.rotations.create', compact('rotation'));
    }

    public function store(StoreRotationRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['badges'] = $request->input('badges', []);
        $data['achievements'] = $request->input('achievements', []);

        RotationExperience::create($data);

        return redirect()->route('admin.rotations.index')->with('status', 'Rotasi tersimpan.');
    }

    public function edit(RotationExperience $rotation): View
    {
        return view('admin.rotations.edit', compact('rotation'));
    }

    public function update(StoreRotationRequest $request, RotationExperience $rotation): RedirectResponse
    {
        $data = $request->validated();
        $data['badges'] = $request->input('badges', []);
        $data['achievements'] = $request->input('achievements', []);

        $rotation->update($data);

        return redirect()->route('admin.rotations.index')->with('status', 'Rotasi tersimpan.');
    }

    public function destroy(RotationExperience $rotation): RedirectResponse
    {
        $rotation->delete();

        return back()->with('status', 'Rotasi dihapus.');
    }
}
