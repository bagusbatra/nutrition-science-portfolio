@php
    $labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
    $inputClass = 'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';
    $smallInputClass = 'w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]';
    $legendClass = 'text-xs font-bold uppercase tracking-wider text-[#2D2D2D] mb-3 block';

    $profile = old('patient_profile', $case->patient_profile ?? []);
    $adime = old('adime', $case->adime ?? []);
    $kebutuhan = $adime['intervention']['perhitunganKebutuhan'] ?? [];
@endphp

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
        <label class="{{ $labelClass }}">Kode Kasus</label>
        <input type="text" name="code" value="{{ old('code', $case->code) }}" class="{{ $inputClass }}">
    </div>
    <div>
        <label class="{{ $labelClass }}">Judul Kasus</label>
        <input type="text" name="title" value="{{ old('title', $case->title) }}" class="{{ $inputClass }}">
    </div>
</div>

<fieldset>
    <legend class="{{ $legendClass }}">Profil Pasien</legend>
    <div class="space-y-3">
        <div class="grid grid-cols-3 gap-3">
            <div>
                <label class="{{ $labelClass }}">Inisial</label>
                <input type="text" name="patient_profile[initial]" value="{{ $profile['initial'] ?? '' }}" class="{{ $inputClass }}">
            </div>
            <div>
                <label class="{{ $labelClass }}">Usia</label>
                <input type="number" name="patient_profile[age]" value="{{ $profile['age'] ?? 0 }}" class="{{ $inputClass }}">
            </div>
            <div>
                <label class="{{ $labelClass }}">Jenis Kelamin</label>
                <select name="patient_profile[gender]" class="{{ $inputClass }}">
                    <option value="Perempuan" @selected(($profile['gender'] ?? '') === 'Perempuan')>Perempuan</option>
                    <option value="Laki-laki" @selected(($profile['gender'] ?? '') === 'Laki-laki')>Laki-laki</option>
                </select>
            </div>
        </div>
        <div>
            <label class="{{ $labelClass }}">Ruang Rawat</label>
            <input type="text" name="patient_profile[room]" value="{{ $profile['room'] ?? '' }}" class="{{ $inputClass }}">
        </div>
        <div>
            <label class="{{ $labelClass }}">Diagnosis Medis</label>
            <input type="text" name="patient_profile[medicalDiagnosis]" value="{{ $profile['medicalDiagnosis'] ?? '' }}" class="{{ $inputClass }}">
        </div>
        <div>
            <label class="{{ $labelClass }}">Preskripsi Diet</label>
            <input type="text" name="patient_profile[dietOrder]" value="{{ $profile['dietOrder'] ?? '' }}" class="{{ $inputClass }}">
        </div>
    </div>
</fieldset>

<fieldset>
    <legend class="{{ $legendClass }}">Assessment (Pengkajian)</legend>
    <div class="space-y-3">
        <div>
            <label class="{{ $labelClass }}">Antropometri</label>
            <textarea name="adime[assessment][antropometri]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['assessment']['antropometri'] ?? '' }}</textarea>
        </div>
        <div>
            <label class="{{ $labelClass }}">Fisik & Klinis</label>
            <textarea name="adime[assessment][fisikKlinis]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['assessment']['fisikKlinis'] ?? '' }}</textarea>
        </div>
        <div>
            <label class="{{ $labelClass }}">Riwayat Gizi (Dietary History)</label>
            <textarea name="adime[assessment][dietaryHistory]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['assessment']['dietaryHistory'] ?? '' }}</textarea>
        </div>

        <div x-data="{ items: @js(array_values($adime['assessment']['biokimia'] ?? [])) }">
            <div class="flex items-center justify-between mb-2">
                <span class="{{ $labelClass }} mb-0">Data Biokimia / Laboratorium</span>
                <button type="button" @click="items.push({ test: '', result: '', normal: '', status: 'normal' })" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah Baris
                </button>
            </div>
            <div class="space-y-2">
                <template x-for="(b, idx) in items" :key="idx">
                    <div class="grid grid-cols-5 gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                        <input type="text" placeholder="Parameter" :name="`adime[assessment][biokimia][${idx}][test]`" x-model="b.test" class="{{ $smallInputClass }}">
                        <input type="text" placeholder="Hasil" :name="`adime[assessment][biokimia][${idx}][result]`" x-model="b.result" class="{{ $smallInputClass }}">
                        <input type="text" placeholder="Nilai normal" :name="`adime[assessment][biokimia][${idx}][normal]`" x-model="b.normal" class="{{ $smallInputClass }}">
                        <select :name="`adime[assessment][biokimia][${idx}][status]`" x-model="b.status" class="{{ $smallInputClass }}">
                            <option value="normal">Normal</option>
                            <option value="high">Tinggi</option>
                            <option value="low">Rendah</option>
                        </select>
                        <button type="button" @click="items.splice(idx, 1)" aria-label="Hapus baris biokimia" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer justify-self-end">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</fieldset>

<fieldset>
    <legend class="{{ $legendClass }}">Diagnosis Gizi (PES)</legend>
    <div class="space-y-3">
        <div>
            <label class="{{ $labelClass }}">Problem (P)</label>
            <textarea name="adime[diagnosisPES][problem]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['diagnosisPES']['problem'] ?? '' }}</textarea>
        </div>
        <div>
            <label class="{{ $labelClass }}">Etiology (E)</label>
            <textarea name="adime[diagnosisPES][etiology]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['diagnosisPES']['etiology'] ?? '' }}</textarea>
        </div>
        <div>
            <label class="{{ $labelClass }}">Signs / Symptoms (S)</label>
            <textarea name="adime[diagnosisPES][signsSymptoms]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['diagnosisPES']['signsSymptoms'] ?? '' }}</textarea>
        </div>
        <div>
            <label class="{{ $labelClass }}">Kalimat PES Lengkap</label>
            <textarea name="adime[diagnosisPES][formattedPES]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['diagnosisPES']['formattedPES'] ?? '' }}</textarea>
        </div>
    </div>
</fieldset>

<fieldset>
    <legend class="{{ $legendClass }}">Intervensi Gizi</legend>
    <div class="space-y-4">
        <div>
            <span class="{{ $labelClass }}">Preskripsi Kebutuhan Zat Gizi</span>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <input type="text" placeholder="Energi" name="adime[intervention][perhitunganKebutuhan][energi]" value="{{ $kebutuhan['energi'] ?? '' }}" class="{{ $smallInputClass }}">
                <input type="text" placeholder="Protein" name="adime[intervention][perhitunganKebutuhan][protein]" value="{{ $kebutuhan['protein'] ?? '' }}" class="{{ $smallInputClass }}">
                <input type="text" placeholder="Lemak" name="adime[intervention][perhitunganKebutuhan][lemak]" value="{{ $kebutuhan['lemak'] ?? '' }}" class="{{ $smallInputClass }}">
                <input type="text" placeholder="Karbohidrat" name="adime[intervention][perhitunganKebutuhan][karbohidrat]" value="{{ $kebutuhan['karbohidrat'] ?? '' }}" class="{{ $smallInputClass }}">
                <input type="text" placeholder="Cairan" name="adime[intervention][perhitunganKebutuhan][cairan]" value="{{ $kebutuhan['cairan'] ?? '' }}" class="{{ $smallInputClass }}">
            </div>
        </div>

        <x-admin.string-repeater name="adime[intervention][tujuanDiet]" label="Tujuan Diet" :items="$adime['intervention']['tujuanDiet'] ?? []" />
        <x-admin.string-repeater name="adime[intervention][prinsipSyaratDiet]" label="Prinsip & Syarat Diet" :items="$adime['intervention']['prinsipSyaratDiet'] ?? []" />

        <div x-data="{ items: @js(array_values($adime['intervention']['menuContoh'] ?? [])) }">
            <div class="flex items-center justify-between mb-2">
                <span class="{{ $labelClass }} mb-0">Menu Contoh Sehari</span>
                <button type="button" @click="items.push({ waktu: '', menu: '', komposisi: '' })" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah Menu
                </button>
            </div>
            <div class="space-y-2">
                <template x-for="(m, idx) in items" :key="idx">
                    <div class="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                        <input type="text" placeholder="Waktu" :name="`adime[intervention][menuContoh][${idx}][waktu]`" x-model="m.waktu" class="{{ $smallInputClass }}">
                        <input type="text" placeholder="Menu" :name="`adime[intervention][menuContoh][${idx}][menu]`" x-model="m.menu" class="{{ $smallInputClass }}">
                        <input type="text" placeholder="Komposisi gizi" :name="`adime[intervention][menuContoh][${idx}][komposisi]`" x-model="m.komposisi" class="{{ $smallInputClass }}">
                        <button type="button" @click="items.splice(idx, 1)" aria-label="Hapus menu" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</fieldset>

<fieldset>
    <legend class="{{ $legendClass }}">Monitoring & Evaluasi</legend>
    <div class="space-y-3">
        <x-admin.string-repeater name="adime[monitoringEvaluasi]" label="Rencana Monitoring" :items="$adime['monitoringEvaluasi'] ?? []" />
        <div>
            <label class="{{ $labelClass }}">Refleksi / Pembelajaran Klinis</label>
            <textarea name="adime[keyLearning]" rows="2" class="{{ $inputClass }} resize-none">{{ $adime['keyLearning'] ?? '' }}</textarea>
        </div>
    </div>
</fieldset>
