<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMediaRequest;
use App\Models\MediaInfographic;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class MediaController extends Controller
{
    public function index(): View
    {
        $items = MediaInfographic::orderBy('created_at')->get();

        return view('admin.media.index', compact('items'));
    }

    public function create(): View
    {
        $media = new MediaInfographic([
            'key_points' => [],
            'thumbnail_bg' => 'from-[#FDE2E4] to-[#FAD2E1]',
            'accent_color' => '#E098AA',
        ]);

        return view('admin.media.create', compact('media'));
    }

    public function store(StoreMediaRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['key_points'] = $request->input('key_points', []);

        MediaInfographic::create($data);

        return redirect()->route('admin.media.index')->with('status', 'Media tersimpan.');
    }

    public function edit(MediaInfographic $media): View
    {
        return view('admin.media.edit', compact('media'));
    }

    public function update(StoreMediaRequest $request, MediaInfographic $media): RedirectResponse
    {
        $data = $request->validated();
        $data['key_points'] = $request->input('key_points', []);

        $media->update($data);

        return redirect()->route('admin.media.index')->with('status', 'Media tersimpan.');
    }

    public function destroy(MediaInfographic $media): RedirectResponse
    {
        $media->delete();

        return back()->with('status', 'Media dihapus.');
    }
}
