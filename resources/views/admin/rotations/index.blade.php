@extends('layouts.admin')

@section('title', 'Rotasi Pengalaman — Admin')

@section('admin-content')
    <div class="max-w-4xl">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="font-serif text-2xl font-bold mb-1">Rotasi Pengalaman</h1>
                <p class="text-sm text-[#666666]">Dipakai di section Rotasi PKL, dan modal CV.</p>
            </div>
            <a href="{{ route('admin.rotations.create') }}" class="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer shrink-0">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah Rotasi
            </a>
        </div>

        @if ($rotations->isEmpty())
            <p class="text-sm text-[#666666]">Belum ada data rotasi. Klik "Tambah Rotasi" untuk membuat yang pertama.</p>
        @else
            <div class="space-y-3">
                @foreach ($rotations as $r)
                    <div class="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-center justify-between gap-3" x-data="{ confirmingDelete: false }">
                        <div class="min-w-0">
                            <span class="text-[10px] font-mono font-bold text-[#2D2D2D] bg-[#FCE4EC] px-2 py-0.5 rounded-full border border-[#F8BBD0]">
                                {{ $r->category }}
                            </span>
                            <h3 class="font-serif font-bold text-sm text-[#2D2D2D] mt-1.5 truncate">{{ $r->role }}</h3>
                            <p class="text-xs text-[#666666] mt-0.5">
                                {{ $r->institution }} — {{ $r->location }} · {{ $r->period }}
                            </p>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <a href="{{ route('admin.rotations.edit', $r) }}" aria-label="Edit rotasi" class="p-2.5 rounded-lg hover:bg-[#FCE4EC] cursor-pointer inline-flex">
                                <i data-lucide="pencil" class="w-4 h-4 text-[#2D2D2D]"></i>
                            </a>
                            <template x-if="!confirmingDelete">
                                <button type="button" @click="confirmingDelete = true" aria-label="Hapus rotasi" class="p-2.5 rounded-lg hover:bg-red-50 cursor-pointer">
                                    <i data-lucide="trash-2" class="w-4 h-4 text-red-600"></i>
                                </button>
                            </template>
                            <template x-if="confirmingDelete">
                                <div class="flex items-center gap-1.5">
                                    <form method="POST" action="{{ route('admin.rotations.destroy', $r) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-xs font-semibold text-red-600 px-2.5 py-2 rounded-lg hover:bg-red-50 cursor-pointer">Ya, hapus</button>
                                    </form>
                                    <button type="button" @click="confirmingDelete = false" class="text-xs text-[#666666] px-2.5 py-2 cursor-pointer">Batal</button>
                                </div>
                            </template>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
@endsection
