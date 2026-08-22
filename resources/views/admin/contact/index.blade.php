@extends('layouts.admin')

@section('title', 'Kotak Masuk — Admin')

@section('admin-content')
    <div class="max-w-4xl">
        <div class="mb-6">
            <h1 class="font-serif text-2xl font-bold mb-1">Kotak Masuk</h1>
            <p class="text-sm text-[#666666]">
                Pesan dari form "Say Hello" publik. Hanya bisa dilihat & dihapus (tidak ada tambah/ubah, pesan
                dikirim langsung oleh pengunjung).
            </p>
        </div>

        @if ($messages->isEmpty())
            <p class="text-sm text-[#666666]">Belum ada pesan masuk.</p>
        @else
            <div class="space-y-3">
                @foreach ($messages as $msg)
                    <div class="bg-white border border-[#E8E0E3] rounded-2xl p-4" x-data="{ confirmingDelete: false }">
                        <div class="flex items-start justify-between gap-3 mb-2">
                            <div class="min-w-0">
                                <h3 class="font-serif font-bold text-sm text-[#2D2D2D] truncate">{{ $msg->sender_name }}</h3>
                                @if ($msg->sender_org)
                                    <p class="text-xs text-[#666666]">{{ $msg->sender_org }}</p>
                                @endif
                                <a href="mailto:{{ $msg->sender_email }}" class="text-xs text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-2 underline-offset-2">
                                    {{ $msg->sender_email }}
                                </a>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-[10px] text-[#8E8E8E] font-mono">
                                    {{ $msg->created_at->translatedFormat('j F Y') }}
                                </span>
                                <template x-if="!confirmingDelete">
                                    <button type="button" @click="confirmingDelete = true" aria-label="Hapus pesan" class="p-2.5 rounded-lg hover:bg-red-50 cursor-pointer">
                                        <i data-lucide="trash-2" class="w-4 h-4 text-red-600"></i>
                                    </button>
                                </template>
                                <template x-if="confirmingDelete">
                                    <div class="flex items-center gap-1.5">
                                        <form method="POST" action="{{ route('admin.contact.destroy', $msg) }}">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-xs font-semibold text-red-600 px-2.5 py-2 rounded-lg hover:bg-red-50 cursor-pointer">Ya, hapus</button>
                                        </form>
                                        <button type="button" @click="confirmingDelete = false" class="text-xs text-[#666666] px-2.5 py-2 cursor-pointer">Batal</button>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2">
                            {{ $msg->inquiry_type }}
                        </span>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed">{{ $msg->message }}</p>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
@endsection
