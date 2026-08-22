@extends('layouts.app')

@section('title', 'Admin Login')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-[#F9F5F6] px-4">
        <div class="w-full max-w-sm bg-white rounded-[32px] border border-[#E8E0E3] shadow-sm p-8">
            <div class="mb-6 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center shrink-0">
                    <i data-lucide="lock" class="w-4 h-4 text-[#2D2D2D]"></i>
                </div>
                <div>
                    <span class="text-[10px] font-mono uppercase tracking-wider text-[#8E8E8E] font-bold block">
                        Restricted Area
                    </span>
                    <h1 class="font-serif text-xl font-bold text-[#2D2D2D]">Admin Login</h1>
                </div>
            </div>

            <form method="POST" action="{{ route('login.submit') }}" class="space-y-4">
                @csrf
                <div>
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">
                        Username
                    </label>
                    <input
                        id="admin-login-username"
                        type="text"
                        name="username"
                        required
                        autofocus
                        value="{{ old('username') }}"
                        class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                    >
                </div>

                <div>
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">
                        Password
                    </label>
                    <input
                        id="admin-login-password"
                        type="password"
                        name="password"
                        required
                        class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                    >
                </div>

                @if ($errors->any())
                    <p class="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                        {{ $errors->first() }}
                    </p>
                @endif

                <button
                    id="admin-login-submit"
                    type="submit"
                    class="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer"
                >
                    Masuk
                </button>
            </form>
        </div>
    </div>
@endsection
