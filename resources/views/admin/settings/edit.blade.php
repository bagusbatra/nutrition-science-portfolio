@extends('layouts.admin')

@section('title', 'Pengaturan — Admin')

@php
    $sectionMeta = [
        'skripsi' => ['label' => 'Riset Skripsi', 'desc' => 'Section formulasi & uji lab skripsi.'],
        'workbench' => ['label' => 'Meja Dietisien (Kalkulator)', 'desc' => 'Kalkulator interaktif BMR/TEE, juga menyembunyikan tombol "Kalkulator" di header.'],
        'cases' => ['label' => 'Kasus Klinis', 'desc' => 'Studi kasus asuhan gizi (ADIME).'],
        'rotations' => ['label' => 'Rotasi Pengalaman', 'desc' => 'Rotasi klinis & PKL rumah sakit.'],
        'media' => ['label' => 'Galeri Media', 'desc' => 'Leaflet & infografis edukasi gizi.'],
        'skills' => ['label' => 'Kompetensi & Sertifikasi', 'desc' => 'Keahlian klinis, software, dan sertifikat.'],
    ];
@endphp

@section('admin-content')
    <div class="max-w-2xl">
        <h1 class="font-serif text-2xl font-bold mb-1">Pengaturan</h1>
        <p class="text-sm text-[#666666] mb-6">
            Aktifkan/nonaktifkan section mana yang tampil di halaman index publik. Section yang dimatikan
            juga otomatis hilang dari menu navigasi & footer, jadi pengunjung tidak akan melihat link mati.
        </p>

        <form method="POST" action="{{ route('admin.settings.update') }}" class="space-y-3">
            @csrf
            @method('PUT')

            @foreach ($sectionMeta as $key => $meta)
                <label class="flex items-start gap-3.5 bg-white border border-[#E8E0E3] rounded-2xl p-4 cursor-pointer hover:border-[#F8BBD0] transition-colors">
                    <input
                        type="checkbox"
                        name="{{ $key }}"
                        value="1"
                        @checked(old($key, $visibility->$key))
                        class="mt-0.5 w-4 h-4 accent-[#2D2D2D] cursor-pointer shrink-0"
                    >
                    <div>
                        <span class="text-sm font-semibold text-[#2D2D2D] block">{{ $meta['label'] }}</span>
                        <span class="text-xs text-[#666666]">{{ $meta['desc'] }}</span>
                    </div>
                </label>
            @endforeach

            <button type="submit" class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer">
                <i data-lucide="save" class="w-3.5 h-3.5"></i>
                Simpan Perubahan
            </button>
        </form>
    </div>
@endsection
