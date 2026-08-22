@extends('layouts.admin')

@section('title', 'Tambah Media — Admin')

@section('admin-content')
    <div class="max-w-3xl">
        <div class="flex items-center justify-between mb-6">
            <h1 class="font-serif text-2xl font-bold">Tambah Media Baru</h1>
            <a href="{{ route('admin.media.index') }}" class="flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#2D2D2D] cursor-pointer">
                <i data-lucide="x" class="w-4 h-4"></i> Batal
            </a>
        </div>

        <form method="POST" action="{{ route('admin.media.store') }}" class="space-y-6">
            @csrf
            @include('admin.media._form')

            <button type="submit" class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer">
                <i data-lucide="save" class="w-3.5 h-3.5"></i> Simpan Media
            </button>
        </form>
    </div>
@endsection
