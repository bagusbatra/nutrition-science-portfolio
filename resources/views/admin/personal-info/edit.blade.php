@extends('layouts.admin')

@section('title', 'Identitas — Admin')

@php
    $textFields = [
        'name' => 'Nama Lengkap',
        'title' => 'Gelar / Titel',
        'tagline' => 'Tagline',
        'university' => 'Universitas',
        'faculty' => 'Fakultas / Program Studi',
        'gpa' => 'IPK',
        'status' => 'Status Studi',
        'target_graduation' => 'Target Kelulusan',
        'email' => 'Email',
        'phone' => 'No. Telepon',
        'linkedin' => 'LinkedIn',
        'location' => 'Lokasi',
    ];
@endphp

@section('admin-content')
    <div class="max-w-3xl">
        <h1 class="font-serif text-2xl font-bold mb-1">Identitas</h1>
        <p class="text-sm text-[#666666] mb-6">
            Dipakai di Hero, Header, Footer, modal Kontak, dan modal CV.
        </p>

        <form method="POST" action="{{ route('admin.personal-info.update') }}" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @foreach ($textFields as $field => $label)
                    <div>
                        <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
                            {{ $label }}
                        </label>
                        <input
                            type="text"
                            name="{{ $field }}"
                            value="{{ old($field, $personalInfo->$field) }}"
                            class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]"
                        >
                    </div>
                @endforeach
            </div>

            <div>
                <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
                    Bio
                </label>
                <textarea
                    name="bio"
                    rows="4"
                    class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none"
                >{{ old('bio', $personalInfo->bio) }}</textarea>
            </div>

            <div x-data="{ items: @js(array_values($personalInfo->stats ?? [])) }">
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
                        Statistik Ringkas (Hero)
                    </label>
                    <button type="button" @click="items.push({ label: '', value: '', sub: '' })" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah
                    </button>
                </div>
                <div class="space-y-2">
                    <template x-for="(stat, idx) in items" :key="idx">
                        <div class="flex gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                            <input type="text" placeholder="Value (mis. 3.89)" :name="`stats[${idx}][value]`" x-model="stat.value" class="w-28 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs">
                            <input type="text" placeholder="Label" :name="`stats[${idx}][label]`" x-model="stat.label" class="flex-1 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs">
                            <input type="text" placeholder="Sub-label" :name="`stats[${idx}][sub]`" x-model="stat.sub" class="flex-1 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs">
                            <button type="button" @click="items.splice(idx, 1)" aria-label="Hapus statistik" class="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </template>
                </div>
            </div>

            <button
                type="submit"
                class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer"
            >
                <i data-lucide="save" class="w-3.5 h-3.5"></i>
                Simpan Perubahan
            </button>
        </form>
    </div>
@endsection
