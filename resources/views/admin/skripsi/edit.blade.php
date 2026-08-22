@extends('layouts.admin')

@section('title', 'Riset Skripsi — Admin')

@php
    $numInputClass = 'w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]';
    $emptyFormulation = [
        'code' => '', 'ratio' => '', 'kelorPercent' => 0, 'bekatulPercent' => 0, 'mocafPercent' => 0,
        'organolepticScore' => ['warna' => 0, 'aroma' => 0, 'rasa' => 0, 'tekstur' => 0, 'overall' => 0],
        'proximate' => ['fe' => 0, 'protein' => 0, 'serat' => 0, 'lemak' => 0, 'energi' => 0],
        'isBestChoice' => false,
    ];
@endphp

@section('admin-content')
    <div class="max-w-4xl">
        <h1 class="font-serif text-2xl font-bold mb-1">Riset Skripsi</h1>
        <p class="text-sm text-[#666666] mb-6">Dipakai di section Riset Skripsi & Lab, dan modal CV.</p>

        <form method="POST" action="{{ route('admin.skripsi.update') }}" class="space-y-6">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Judul Skripsi</label>
                <textarea name="title" rows="2" class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none">{{ old('title', $skripsi->title) }}</textarea>
            </div>

            <div>
                <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Sub-judul</label>
                <textarea name="sub_title" rows="2" class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none">{{ old('sub_title', $skripsi->sub_title) }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Status</label>
                    <input type="text" name="status" value="{{ old('status', $skripsi->status) }}" class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Target Selesai</label>
                    <input type="text" name="completion_date" value="{{ old('completion_date', $skripsi->completion_date) }}" class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Abstrak</label>
                <textarea name="abstract" rows="5" class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none">{{ old('abstract', $skripsi->abstract) }}</textarea>
            </div>

            <x-admin.string-repeater name="advisor" label="Dosen Pembimbing" :items="old('advisor', $skripsi->advisor ?? [])" placeholder="Nama dosen pembimbing" />
            <x-admin.string-repeater name="hypotheses" label="Hipotesis" :items="old('hypotheses', $skripsi->hypotheses ?? [])" placeholder="Pernyataan hipotesis" />
            <x-admin.string-repeater name="key_takeaways" label="Temuan Kunci" :items="old('key_takeaways', $skripsi->key_takeaways ?? [])" placeholder="Poin temuan kunci" />

            <div x-data="{ items: @js(!empty($skripsi->formulations) ? $skripsi->formulations : []) }">
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Formulasi Uji Coba</label>
                    <button type="button" @click="items.push(@js($emptyFormulation))" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah Formulasi
                    </button>
                </div>

                <div class="space-y-4">
                    <template x-for="(formula, idx) in items" :key="idx">
                        <div class="bg-white border border-[#E8E0E3] rounded-2xl p-4 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-bold text-[#2D2D2D]" x-text="`Formulasi #${idx + 1}`"></span>
                                <div class="flex items-center gap-3">
                                    <label class="flex items-center gap-1.5 text-xs text-[#666666] cursor-pointer">
                                        <input type="checkbox" :name="`formulations[${idx}][isBestChoice]`" value="1" x-model="formula.isBestChoice">
                                        Formula Terpilih
                                    </label>
                                    <button type="button" @click="items.splice(idx, 1)" aria-label="Hapus formulasi" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input type="text" placeholder="Kode (mis. F2 (Formulasi Terpilih))" :name="`formulations[${idx}][code]`" x-model="formula.code" class="{{ $numInputClass }}">
                                <input type="text" placeholder="Rasio (mis. 70% Mocaf : 15% Kelor : 15% Bekatul)" :name="`formulations[${idx}][ratio]`" x-model="formula.ratio" class="{{ $numInputClass }}">
                            </div>

                            <div class="grid grid-cols-3 gap-2">
                                <div>
                                    <span class="text-[9px] text-[#8E8E8E] block mb-0.5">Kelor %</span>
                                    <input type="number" step="any" :name="`formulations[${idx}][kelorPercent]`" x-model="formula.kelorPercent" class="{{ $numInputClass }}">
                                </div>
                                <div>
                                    <span class="text-[9px] text-[#8E8E8E] block mb-0.5">Bekatul %</span>
                                    <input type="number" step="any" :name="`formulations[${idx}][bekatulPercent]`" x-model="formula.bekatulPercent" class="{{ $numInputClass }}">
                                </div>
                                <div>
                                    <span class="text-[9px] text-[#8E8E8E] block mb-0.5">Mocaf %</span>
                                    <input type="number" step="any" :name="`formulations[${idx}][mocafPercent]`" x-model="formula.mocafPercent" class="{{ $numInputClass }}">
                                </div>
                            </div>

                            <div>
                                <span class="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-1">Skor Organoleptik (skala 1-5)</span>
                                <div class="grid grid-cols-5 gap-2">
                                    <template x-for="key in ['warna','aroma','rasa','tekstur','overall']" :key="key">
                                        <div>
                                            <span class="text-[9px] text-[#8E8E8E] block mb-0.5 capitalize" x-text="key"></span>
                                            <input type="number" step="any" :name="`formulations[${idx}][organolepticScore][${key}]`" x-model="formula.organolepticScore[key]" class="{{ $numInputClass }}">
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div>
                                <span class="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-1">Proksimat (per 100 gram)</span>
                                <div class="grid grid-cols-5 gap-2">
                                    <template x-for="key in ['fe','protein','serat','lemak','energi']" :key="key">
                                        <div>
                                            <span class="text-[9px] text-[#8E8E8E] block mb-0.5 capitalize" x-text="key"></span>
                                            <input type="number" step="any" :name="`formulations[${idx}][proximate][${key}]`" x-model="formula.proximate[key]" class="{{ $numInputClass }}">
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <button type="submit" class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer">
                <i data-lucide="save" class="w-3.5 h-3.5"></i>
                Simpan Perubahan
            </button>
        </form>
    </div>
@endsection
