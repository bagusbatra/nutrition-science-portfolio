@php
    $labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
    $inputClass = 'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';
    $categoryOptions = ['Leaflet Pasien', 'Poster Edukasi', 'Formulasi Pangan', 'Media Digital'];
@endphp

<div>
    <label class="{{ $labelClass }}">Judul</label>
    <input type="text" name="title" value="{{ old('title', $media->title) }}" class="{{ $inputClass }}">
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label class="{{ $labelClass }}">Kategori</label>
        <select name="category" class="{{ $inputClass }}">
            @foreach ($categoryOptions as $c)
                <option value="{{ $c }}" @selected(old('category', $media->category) === $c)>{{ $c }}</option>
            @endforeach
        </select>
    </div>
    <div>
        <label class="{{ $labelClass }}">Dimensi / Format</label>
        <input type="text" name="dimensions" value="{{ old('dimensions', $media->dimensions) }}" placeholder="mis. Trifold A4 / Siap Cetak" class="{{ $inputClass }}">
    </div>
</div>

<div>
    <label class="{{ $labelClass }}">Target Audiens</label>
    <input type="text" name="target_audience" value="{{ old('target_audience', $media->target_audience) }}" class="{{ $inputClass }}">
</div>

<div>
    <label class="{{ $labelClass }}">Deskripsi</label>
    <textarea name="description" rows="3" class="{{ $inputClass }} resize-none">{{ old('description', $media->description) }}</textarea>
</div>

<x-admin.string-repeater name="key_points" label="Poin Kunci Edukasi" :items="old('key_points', $media->key_points ?? [])" placeholder="Poin edukasi singkat" />

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4" x-data="{ thumbnailBg: @js(old('thumbnail_bg', $media->thumbnail_bg)), accentColor: @js(old('accent_color', $media->accent_color)) }">
    <div>
        <label class="{{ $labelClass }}">Gradient Thumbnail (kelas Tailwind)</label>
        <input type="text" name="thumbnail_bg" x-model="thumbnailBg" placeholder="from-[#FDE2E4] to-[#FAD2E1]" class="{{ $inputClass }}">
        <div class="mt-2 h-12 rounded-xl border border-[#E8E0E3] bg-gradient-to-br" :class="thumbnailBg"></div>
    </div>
    <div>
        <label class="{{ $labelClass }}">Warna Aksen (hex)</label>
        <div class="flex items-center gap-2">
            <input type="text" name="accent_color" x-model="accentColor" placeholder="#E098AA" class="{{ $inputClass }}">
            <span class="w-10 h-10 rounded-xl border border-[#E8E0E3] shrink-0" :style="`background-color: ${accentColor}`"></span>
        </div>
    </div>
</div>
