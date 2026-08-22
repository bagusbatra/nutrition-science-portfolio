<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGuestbookEntryRequest;
use App\Models\GuestbookEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class GuestbookController extends Controller
{
    public function index(): View
    {
        $entries = GuestbookEntry::orderByDesc('created_at')->get();

        return view('admin.guestbook.index', compact('entries'));
    }

    public function store(StoreGuestbookEntryRequest $request): JsonResponse
    {
        $entry = GuestbookEntry::create([
            'name' => $request->string('name')->trim(),
            'role' => $request->string('role')->trim(),
            'message' => $request->string('message')->trim(),
            'emoji' => $request->input('emoji') ?: '🌸',
        ]);

        return response()->json($entry, 201);
    }

    public function destroy(Request $request, GuestbookEntry $guestbookEntry): RedirectResponse
    {
        $guestbookEntry->delete();

        return back()->with('status', 'Entri dihapus.');
    }
}
