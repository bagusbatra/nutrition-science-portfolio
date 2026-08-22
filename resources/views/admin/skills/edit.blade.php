@extends('layouts.admin')

@section('title', 'Kompetensi — Admin')

@section('admin-content')
    <div class="max-w-3xl">
        <h1 class="font-serif text-2xl font-bold mb-1">Kompetensi</h1>
        <p class="text-sm text-[#666666] mb-6">Dipakai di section Kompetensi & Sertifikasi.</p>

        <form method="POST" action="{{ route('admin.skills.update') }}" class="space-y-8">
            @csrf
            @method('PUT')

            <x-admin.skill-repeater name="clinical" label="Klinis & Asuhan Gizi" :items="old('clinical', $skills->clinical ?? [])" />
            <x-admin.skill-repeater name="food_service" label="MSPM & Keamanan Pangan" :items="old('food_service', $skills->food_service ?? [])" />
            <x-admin.skill-repeater name="software" label="Software & Komputasi" :items="old('software', $skills->software ?? [])" />
            <x-admin.certification-repeater name="certifications" :items="old('certifications', $skills->certifications ?? [])" />

            <button type="submit" class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer">
                <i data-lucide="save" class="w-3.5 h-3.5"></i>
                Simpan Perubahan
            </button>
        </form>
    </div>
@endsection
