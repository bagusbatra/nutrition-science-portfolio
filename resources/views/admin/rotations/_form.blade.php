@php
    $labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
    $inputClass = 'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';
    $categoryOptions = ['Klinis (Dietetik RS)', 'MSPM (Food Service)', 'Gizi Masyarakat (Puskesmas)', 'Akademik & Riset'];
    $iconOptions = ['Stethoscope', 'UtensilsCrossed', 'HeartPulse', 'FlaskConical'];
@endphp

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label class="{{ $labelClass }}">Kategori</label>
        <select name="category" class="{{ $inputClass }}">
            @foreach ($categoryOptions as $c)
                <option value="{{ $c }}" @selected(old('category', $rotation->category) === $c)>{{ $c }}</option>
            @endforeach
        </select>
    </div>
    <div>
        <label class="{{ $labelClass }}">Ikon</label>
        <select name="icon_name" class="{{ $inputClass }}">
            @foreach ($iconOptions as $i)
                <option value="{{ $i }}" @selected(old('icon_name', $rotation->icon_name) === $i)>{{ $i }}</option>
            @endforeach
        </select>
    </div>
</div>

<div>
    <label class="{{ $labelClass }}">Peran / Jabatan</label>
    <input type="text" name="role" value="{{ old('role', $rotation->role) }}" class="{{ $inputClass }}">
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label class="{{ $labelClass }}">Institusi</label>
        <input type="text" name="institution" value="{{ old('institution', $rotation->institution) }}" class="{{ $inputClass }}">
    </div>
    <div>
        <label class="{{ $labelClass }}">Lokasi</label>
        <input type="text" name="location" value="{{ old('location', $rotation->location) }}" class="{{ $inputClass }}">
    </div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label class="{{ $labelClass }}">Periode</label>
        <input type="text" name="period" value="{{ old('period', $rotation->period) }}" class="{{ $inputClass }}">
    </div>
    <div>
        <label class="{{ $labelClass }}">Pencapaian Kunci (Highlight Metric)</label>
        <input type="text" name="highlight_metric" value="{{ old('highlight_metric', $rotation->highlight_metric) }}" class="{{ $inputClass }}">
    </div>
</div>

<x-admin.string-repeater name="badges" label="Badge Kompetensi" :items="old('badges', $rotation->badges ?? [])" placeholder="mis. PAGT / NCP" />
<x-admin.string-repeater name="achievements" label="Pencapaian (Achievements)" :items="old('achievements', $rotation->achievements ?? [])" placeholder="Deskripsi pencapaian" />
