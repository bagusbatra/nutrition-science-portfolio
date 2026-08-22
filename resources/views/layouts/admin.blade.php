@extends('layouts.app')

@section('content')
    @php
        $adminSections = [
            ['route' => 'admin.personal-info.edit', 'pattern' => 'admin.personal-info.*', 'label' => 'Identitas'],
            ['route' => 'admin.skripsi.edit', 'pattern' => 'admin.skripsi.*', 'label' => 'Riset Skripsi'],
            ['route' => 'admin.clinical-cases.index', 'pattern' => 'admin.clinical-cases.*', 'label' => 'Kasus Klinis'],
            ['route' => 'admin.rotations.index', 'pattern' => 'admin.rotations.*', 'label' => 'Rotasi Pengalaman'],
            ['route' => 'admin.media.index', 'pattern' => 'admin.media.*', 'label' => 'Galeri Media'],
            ['route' => 'admin.skills.edit', 'pattern' => 'admin.skills.*', 'label' => 'Kompetensi'],
            ['route' => 'admin.guestbook.index', 'pattern' => 'admin.guestbook.*', 'label' => 'Buku Tamu'],
            ['route' => 'admin.contact.index', 'pattern' => 'admin.contact.*', 'label' => 'Kotak Masuk'],
            ['route' => 'admin.settings.edit', 'pattern' => 'admin.settings.*', 'label' => 'Pengaturan'],
        ];
    @endphp

    <div class="min-h-screen flex bg-[#F9F5F6] text-[#2D2D2D]">
        <aside class="w-60 shrink-0 border-r border-[#E8E0E3] bg-white p-5 flex flex-col">
            <div class="mb-6">
                <span class="text-[10px] font-mono uppercase tracking-wider text-[#8E8E8E] font-bold">
                    Portfolio CMS
                </span>
                <h2 class="font-serif text-lg font-bold">Admin Panel</h2>
            </div>

            <nav class="flex-1 flex flex-col gap-1 text-sm">
                @foreach ($adminSections as $item)
                    <a
                        href="{{ route($item['route']) }}"
                        class="px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs($item['pattern']) ? 'bg-[#2D2D2D] text-white font-semibold' : 'text-[#4A4A4A] hover:bg-[#FCE4EC]' }}"
                    >
                        {{ $item['label'] }}
                    </a>
                @endforeach
            </nav>

            <form method="POST" action="{{ route('logout') }}" class="mt-4">
                @csrf
                <button type="submit" class="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm text-[#2D2D2D] border border-[#E8E0E3] hover:bg-[#FCE4EC] transition-colors cursor-pointer">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    <span>Keluar</span>
                </button>
            </form>
        </aside>

        <main class="flex-1 p-8 overflow-y-auto">
            @if (session('status'))
                <p class="text-xs px-3 py-2 rounded-xl border mb-4 text-green-700 bg-green-50 border-green-200 inline-block">
                    {{ session('status') }}
                </p>
            @endif

            @if ($errors->any())
                <div class="text-xs px-3 py-2 rounded-xl border mb-4 text-red-700 bg-red-50 border-red-200">
                    <ul class="list-disc list-inside space-y-0.5">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @yield('admin-content')
        </main>
    </div>
@endsection
