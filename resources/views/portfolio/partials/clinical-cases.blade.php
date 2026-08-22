@php
    $clinicalCasesData = $clinicalCases->map(fn($c) => [
        'id' => $c->id,
        'code' => $c->code,
        'title' => $c->title,
        'patientProfile' => $c->patient_profile,
        'adime' => $c->adime,
        'keyLearning' => $c->key_learning,
    ])->values();
@endphp

<section
    id="cases"
    x-data="{
        cases: @js($clinicalCasesData),
        selectedCaseId: @js($clinicalCasesData->first()['id'] ?? null),
        activeStep: 'A',
        get currentCase() {
            return this.cases.find(c => c.id === this.selectedCaseId) || this.cases[0];
        },
        selectCase(id) {
            this.selectedCaseId = id;
            this.activeStep = 'A';
        }
    }"
    class="py-16 sm:py-20 bg-[#F9F5F6] relative border-b border-[#E8E0E3] overflow-hidden"
>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="stethoscope" class="w-3.5 h-3.5"></i>
                    <span>Nutrition Care Process & ADIME Dossier</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Studi Kasus <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Asuhan Gizi Terstandar</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Dokumentasi penatalaksanaan dietetik pasien rawat inap rumah sakit rujukan dengan metode ADIME, perumusan diagnosis gizi PES, dan modifikasi menu terapeutik.
                </p>
            </div>

            <div class="flex items-center gap-2">
                <span class="text-xs uppercase tracking-widest font-mono text-[#2D2D2D] bg-white px-4 py-2 rounded-full border border-[#E8E0E3] shadow-xs">
                    Standar Kemenkes RI & AsDI
                </span>
            </div>
        </div>

        {{-- Case Switcher Tabs --}}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
            <template x-for="c in cases" :key="c.id">
                <button
                    @click="selectCase(c.id)"
                    :class="c.id === selectedCaseId ? 'bg-white border-[#2D2D2D] ring-2 ring-[#F8BBD0] shadow-sm' : 'bg-white/70 border-[#E8E0E3] hover:bg-white hover:border-[#D0C4C8]'"
                    class="p-5 sm:p-6 rounded-[28px] text-left transition-all border cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-3">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] px-2.5 py-0.5 rounded-full bg-[#FCE4EC] border border-[#F8BBD0]" x-text="c.code"></span>
                        <span class="text-xs text-[#8E8E8E] font-mono" x-text="c.patientProfile.room"></span>
                    </div>
                    <h3 class="font-serif text-base sm:text-lg font-bold text-[#2D2D2D] mb-2 leading-snug" x-text="c.title"></h3>
                    <div class="flex flex-wrap items-center gap-2 text-xs text-[#666666]">
                        <span class="font-medium" x-text="c.patientProfile.initial + ', ' + c.patientProfile.age + ' th (' + c.patientProfile.gender + ')'"></span>
                        <span class="text-[#8E8E8E]">&bull;</span>
                        <span class="text-[#2D2D2D] font-semibold bg-[#F9F5F6] px-2 py-0.5 rounded-md border border-[#E8E0E3]" x-text="c.patientProfile.dietOrder"></span>
                    </div>
                </button>
            </template>
        </div>

        {{-- Main Dossier Container --}}
        <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm" x-show="currentCase">

            {{-- Patient Quick Strip --}}
            <div class="p-4 sm:p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                <div>
                    <span class="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-wider block">Diagnosa Medis:</span>
                    <h4 class="font-serif italic font-bold text-sm sm:text-base text-[#2D2D2D]" x-text="currentCase.patientProfile.medicalDiagnosis"></h4>
                </div>
                <div class="flex items-center gap-4 text-xs text-[#666666]">
                    <div>
                        <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Preskripsi Diet:</span>
                        <strong class="text-[#2D2D2D] font-mono" x-text="currentCase.patientProfile.dietOrder"></strong>
                    </div>
                </div>
            </div>

            {{-- ADIME Stage Navigation Tabs --}}
            <div class="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[#F9F5F6] p-1.5 mb-6 sm:mb-8 border border-[#E8E0E3] gap-1">
                <template x-for="step in [
                    { key: 'A', label: 'Assessment (Pengkajian)' },
                    { key: 'D', label: 'Diagnosis (PES)' },
                    { key: 'I', label: 'Intervensi & Menu' },
                    { key: 'ME', label: 'Monev (Monitoring)' },
                ]" :key="step.key">
                    <button
                        @click="activeStep = step.key"
                        :class="activeStep === step.key ? 'bg-[#2D2D2D] text-white shadow-xs' : 'text-[#666666] hover:text-[#2D2D2D]'"
                        class="py-2.5 px-2 sm:px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center"
                    >
                        <span class="font-mono mr-1" x-text="'[' + step.key + ']'"></span>
                        <span class="truncate" x-text="step.label"></span>
                    </button>
                </template>
            </div>

            {{-- Step A: Assessment --}}
            <div x-show="activeStep === 'A'" x-transition class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                            1. Antropometri (A)
                        </span>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.assessment.antropometri"></p>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                            2. Fisik & Klinis (C)
                        </span>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.assessment.fisikKlinis"></p>
                    </div>
                </div>

                {{-- Biokimia Table --}}
                <div class="p-4 sm:p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <div class="flex items-center justify-between mb-3">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block">
                            3. Biokimia & Laboratorium Pasien (B)
                        </span>
                        <span class="text-[10px] text-[#8E8E8E] font-mono sm:hidden">Geser tabel &rarr;</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left min-w-[500px]">
                            <thead class="bg-[#EAE4E7] text-[#2D2D2D] uppercase font-mono text-[10px]">
                                <tr>
                                    <th class="p-3 rounded-l-xl">Parameter Uji</th>
                                    <th class="p-3">Hasil Pasien</th>
                                    <th class="p-3">Nilai Rujukan</th>
                                    <th class="p-3 rounded-r-xl">Interpretasi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#E8E0E3]">
                                <template x-for="(b, bi) in currentCase.adime.assessment.biokimia" :key="bi">
                                    <tr class="hover:bg-white/80">
                                        <td class="p-3 font-medium text-[#2D2D2D]" x-text="b.test"></td>
                                        <td class="p-3 font-mono font-bold text-[#2D2D2D]" x-text="b.result"></td>
                                        <td class="p-3 text-[#666666]" x-text="b.normal"></td>
                                        <td class="p-3">
                                            <span x-show="b.status === 'high'" class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-semibold border border-rose-200">
                                                Tinggi / Di atas normal
                                            </span>
                                            <span x-show="b.status === 'low'" class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                                                Rendah / Defisiensi
                                            </span>
                                            <span x-show="b.status === 'normal'" class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                                                Normal
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                        4. Riwayat Gizi & Pola Makan SMRS (D)
                    </span>
                    <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.assessment.dietaryHistory"></p>
                </div>
            </div>

            {{-- Step D: Diagnosis PES --}}
            <div x-show="activeStep === 'D'" x-transition class="space-y-6">
                <div class="p-5 sm:p-6 rounded-[28px] bg-[#FCE4EC] border border-[#F8BBD0]">
                    <span class="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D] block mb-2">
                        Formulasi Rumusan Diagnosis Gizi (PES Statement):
                    </span>
                    <blockquote class="font-serif text-sm sm:text-lg text-[#2D2D2D] font-semibold italic leading-relaxed">
                        "<span x-text="currentCase.adime.diagnosisPES.formattedPES"></span>"
                    </blockquote>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <div class="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                            <i data-lucide="target" class="w-4 h-4"></i>
                            <span class="font-bold text-xs uppercase font-mono">Problem (P)</span>
                        </div>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.diagnosisPES.problem"></p>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <div class="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                            <i data-lucide="activity" class="w-4 h-4"></i>
                            <span class="font-bold text-xs uppercase font-mono">Etiology (E)</span>
                        </div>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.diagnosisPES.etiology"></p>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <div class="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                            <span class="font-bold text-xs uppercase font-mono">Signs / Symptoms (S)</span>
                        </div>
                        <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentCase.adime.diagnosisPES.signsSymptoms"></p>
                    </div>
                </div>
            </div>

            {{-- Step I: Intervensi --}}
            <div x-show="activeStep === 'I'" x-transition class="space-y-6">
                <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                        Preskripsi Kebutuhan Zat Gizi Pasien
                    </span>
                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-center text-xs">
                        <div class="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                            <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Energi</span>
                            <strong class="text-sm font-mono text-[#2D2D2D]" x-text="currentCase.adime.intervention.perhitunganKebutuhan.energi"></strong>
                        </div>
                        <div class="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                            <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Protein</span>
                            <strong class="text-sm font-mono text-[#2D2D2D]" x-text="currentCase.adime.intervention.perhitunganKebutuhan.protein"></strong>
                        </div>
                        <div class="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                            <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Lemak</span>
                            <strong class="text-sm font-mono text-[#2D2D2D]" x-text="currentCase.adime.intervention.perhitunganKebutuhan.lemak"></strong>
                        </div>
                        <div class="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                            <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Karbohidrat</span>
                            <strong class="text-sm font-mono text-[#2D2D2D]" x-text="currentCase.adime.intervention.perhitunganKebutuhan.karbohidrat"></strong>
                        </div>
                        <div class="p-3 bg-white rounded-xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                            <span class="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Cairan</span>
                            <strong class="text-sm font-mono text-[#2D2D2D]" x-text="currentCase.adime.intervention.perhitunganKebutuhan.cairan"></strong>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                            Tujuan Diet:
                        </span>
                        <ul class="space-y-2 text-xs text-[#4A4A4A]">
                            <template x-for="(g, idx) in currentCase.adime.intervention.tujuanDiet" :key="idx">
                                <li class="flex items-start gap-2">
                                    <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-[#2D2D2D] shrink-0 mt-0.5"></i>
                                    <span x-text="g"></span>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                        <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                            Prinsip & Syarat Diet:
                        </span>
                        <ul class="space-y-2 text-xs text-[#4A4A4A]">
                            <template x-for="(p, idx) in currentCase.adime.intervention.prinsipSyaratDiet" :key="idx">
                                <li class="flex items-start gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-[#2D2D2D] shrink-0 mt-1.5"></span>
                                    <span x-text="p"></span>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                        Perencanaan Menu Sehari & Estimasi Nilai Gizi
                    </span>
                    <div class="space-y-2.5">
                        <template x-for="(m, idx) in currentCase.adime.intervention.menuContoh" :key="idx">
                            <div class="p-3.5 bg-white rounded-xl border border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div>
                                    <span class="font-bold text-[#2D2D2D] mr-2 uppercase tracking-wide text-[11px] font-mono" x-text="m.waktu + ':'"></span>
                                    <span class="text-[#4A4A4A] font-medium" x-text="m.menu"></span>
                                </div>
                                <span class="font-mono text-[11px] text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full shrink-0 border border-[#F8BBD0]" x-text="m.komposisi"></span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            {{-- Step ME: Monitoring & Evaluasi --}}
            <div x-show="activeStep === 'ME'" x-transition class="space-y-6">
                <div class="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                        Rencana Monitoring & Evaluasi Asuhan Gizi
                    </span>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <template x-for="(me, idx) in currentCase.adime.monitoringEvaluasi" :key="idx">
                            <div class="p-3.5 bg-white rounded-xl border border-[#E8E0E3] text-xs text-[#4A4A4A] flex items-start gap-2.5">
                                <i data-lucide="clock" class="w-4 h-4 text-[#2D2D2D] shrink-0 mt-0.5"></i>
                                <span x-text="me"></span>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="p-5 sm:p-6 rounded-[28px] bg-[#FCE4EC] border border-[#F8BBD0]">
                    <span class="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-1">
                        💡 Refleksi Klinis & Pembelajaran Praktik:
                    </span>
                    <p class="text-xs text-[#4A4A4A] leading-relaxed italic">
                        "<span x-text="currentCase.keyLearning || currentCase.adime.keyLearning"></span>"
                    </p>
                </div>
            </div>

        </div>

    </div>

</section>
