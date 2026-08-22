<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class AdminAuthController extends Controller
{
    public function showLogin(): View
    {
        return view('auth.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $validUsername = config('admin.username');
        $validPassword = config('admin.password');

        if (! $validUsername || ! $validPassword) {
            return back()->withErrors(['username' => 'Admin login is not configured'])->withInput();
        }

        if ($credentials['username'] !== $validUsername || $credentials['password'] !== $validPassword) {
            return back()->withErrors(['username' => 'Username atau password salah'])->withInput();
        }

        $request->session()->regenerate();
        $request->session()->put('is_admin', true);

        return redirect()->route('admin.personal-info.edit');
    }

    public function logout(Request $request): RedirectResponse
    {
        $request->session()->forget('is_admin');
        $request->session()->regenerate();

        return redirect()->route('login');
    }
}
