@extends('layouts.admin')

@section('title', 'Buku Tamu — Admin')

@section('admin-content')
    <div class="max-w-4xl">
        <div class="mb-6">
            <h1 class="font-serif text-2xl font-bold mb-1">Buku Tamu</h1>
            <p class="text-sm text-[#666666]">
                Moderasi pesan dari modal Buku Tamu & Dukungan Sidang publik. Hanya bisa dihapus, tidak ada tambah/ubah
                (entri dikirim langsung oleh pengunjung).
            </p>
        </div>

        @if ($entries->isEmpty())
            <p class="text-sm text-[#666666]">Belum ada pesan buku tamu.</p>
        @else
            <div class="space-y-3">
                @foreach ($entries as $entry)
                    <div class="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-start gap-3.5" x-data="{ confirmingDelete: false }">
                        <div class="w-10 h-10 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-lg shrink-0">
                            {{ $entry->emoji ?: '🌸' }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h3 class="font-serif font-bold text-sm text-[#2D2D2D] truncate">{{ $entry->name }}</h3>
                                <span class="text-[10px] text-[#8E8E8E] font-mono shrink-0">
                                    {{ $entry->created_at->translatedFormat('j F Y') }}
                                </span>
                            </div>
                            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2">
                                {{ $entry->role }}
                            </span>
                            <p class="text-xs text-[#4A4A4A] leading-relaxed italic">"{{ $entry->message }}"</p>
                        </div>
                        <div class="shrink-0">
                            <template x-if="!confirmingDelete">
                                <button type="button" @click="confirmingDelete = true" aria-label="Hapus entri" class="p-2.5 rounded-lg hover:bg-red-50 cursor-pointer">
                                    <i data-lucide="trash-2" class="w-4 h-4 text-red-600"></i>
                                </button>
                            </template>
                            <template x-if="confirmingDelete">
                                <div class="flex items-center gap-1.5">
                                    <form method="POST" action="{{ route('admin.guestbook.destroy', $entry) }}">
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
