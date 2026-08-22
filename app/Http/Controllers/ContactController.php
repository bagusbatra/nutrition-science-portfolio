<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        $messages = ContactMessage::orderByDesc('created_at')->get();

        return view('admin.contact.index', compact('messages'));
    }

    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $message = ContactMessage::create([
            'sender_name' => $request->string('senderName')->trim(),
            'sender_org' => trim((string) $request->input('senderOrg', '')),
            'sender_email' => $request->string('senderEmail')->trim(),
            'inquiry_type' => $request->string('inquiryType')->trim(),
            'message' => $request->string('message')->trim(),
        ]);

        return response()->json($message, 201);
    }

    public function destroy(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return back()->with('status', 'Pesan dihapus.');
    }
}
