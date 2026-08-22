<div
    x-show="resumeOpen"
    x-cloak
    x-transition:enter="transition-opacity duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto print:hidden"
    @click.self="resumeOpen = false"
>
    <div
        x-show="resumeOpen"
        x-transition:enter="transition duration-200"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        class="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E0E3] shadow-2xl relative p-6 sm:p-10 my-auto print:max-h-none print:overflow-visible print:shadow-none print:border-0"
    >
        {{-- Header Controls (Don't print) --}}
        <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6 print:hidden">
            <div class="flex items-center gap-2.5">
                <div class="p-2 rounded-xl bg-[#FCE4EC] text-[#2D2D2D]">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                </div>
                <div>
                    <span class="font-serif font-bold text-xl text-[#2D2D2D] block">
                        Curriculum Vitae
                    </span>
                    <span class="text-[11px] font-mono text-[#8E8E8E] uppercase tracking-wider">
                        {{ $personalInfo->name }}, S.Gz (Cand.)
                    </span>
                </div>
            </div>

            <div class="flex items-center gap-2.5">
                <button
                    id="resume-print-btn"
                    onclick="window.print()"
                    class="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#FCE4EC] hover:bg-[#F8BBD0] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F8BBD0]"
                >
                    <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                    <span>Cetak / PDF</span>
                </button>
                <button
                    id="resume-close-btn"
                    @click="resumeOpen = false"
                    class="w-9 h-9 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors"
                >
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        </div>

        {{-- Clean Printable CV Document --}}
        <div class="space-y-6 text-[#2D2D2D] font-sans">

            {{-- Header Resume --}}
            <div class="pb-6 border-b border-[#E8E0E3] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#2D2D2D]">
                        {{ $personalInfo->name }}
                    </h1>
                    <p class="text-xs font-mono uppercase tracking-wider font-semibold text-[#2D2D2D] mt-1 bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0]">
                        Sarjana Gizi (Candidate) &bull; Clinical Nutritionist & Food Formulator
                    </p>
                    <p class="text-xs text-[#666666] mt-2 max-w-xl leading-relaxed">
                        {{ $personalInfo->bio }}
                    </p>
                </div>

                <div class="space-y-1.5 text-xs text-[#666666] shrink-0 font-mono">
                    <div class="flex items-center gap-2">
                        <i data-lucide="mail" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                        <span>{{ $personalInfo->email }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="phone" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                        <span>{{ $personalInfo->phone }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                        <span>{{ $personalInfo->location }}</span>
                    </div>
                </div>
            </div>

            {{-- Education --}}
            <div>
                <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-[#2D2D2D]"></i>
                    <span>Pendidikan Formal</span>
                </h2>
                <div class="space-y-2 text-xs">
                    <div class="flex justify-between items-start">
                        <div>
                            <strong class="text-sm font-serif font-bold text-[#2D2D2D]">{{ $personalInfo->university }}</strong>
                            <p class="text-[#666666]">S1 Ilmu Gizi (Dietetika Klinis & Gizi Masyarakat)</p>
                        </div>
                        <div class="text-right">
                            <span class="font-mono text-[#2D2D2D] font-bold bg-[#FCE4EC] px-2 py-0.5 rounded-md border border-[#F8BBD0]">IPK: {{ $personalInfo->gpa }}</span>
                            <p class="text-[11px] font-mono text-[#8E8E8E] mt-1">2022 — 2026 (Menjelang Sidang)</p>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Thesis --}}
            <div>
                <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                    <i data-lucide="flask-conical" class="w-4 h-4 text-[#2D2D2D]"></i>
                    <span>Riset Tugas Akhir (Skripsi)</span>
                </h2>
                <div class="text-xs space-y-1 bg-[#F9F5F6] p-4 rounded-2xl border border-[#E8E0E3]">
                    <strong class="text-sm text-[#2D2D2D] font-serif block">
                        "{{ $skripsi->title }}"
                    </strong>
                    <p class="text-[#666666] text-[11px] leading-relaxed">
                        <strong>Hasil Utama:</strong> Formulasi F2 (Mocaf 70% : Kelor 15% : Bekatul 15%) mengandung Fe 7.8 mg/100g (mencukupi 52% AKG snack remaja putri), protein 9.4g/100g, dengan skor hedonik rasa 4.3/5.0.
                    </p>
                </div>
            </div>

            {{-- Clinical & Fieldwork Experience --}}
            <div>
                <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                    <i data-lucide="stethoscope" class="w-4 h-4 text-[#2D2D2D]"></i>
                    <span>Pengalaman Praktik Klinis & Lapangan (850+ Jam)</span>
                </h2>
                <div class="space-y-4 text-xs">
                    @foreach($rotations as $rot)
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-start">
                                <div>
                                    <strong class="text-sm font-serif font-bold text-[#2D2D2D]">{{ $rot->role }}</strong>
                                    <p class="text-[#666666] font-semibold">{{ $rot->institution }} — {{ $rot->location }}</p>
                                </div>
                                <span class="font-mono text-[11px] text-[#8E8E8E]">{{ $rot->period }}</span>
                            </div>
                            <ul class="list-disc list-inside space-y-0.5 text-[#4A4A4A] pl-1">
                                @foreach(array_slice($rot->achievements, 0, 2) as $ach)
                                    <li>{{ $ach }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                </div>
            </div>

            {{-- Core Competencies & Software --}}
            <div>
                <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                    <i data-lucide="award" class="w-4 h-4 text-[#2D2D2D]"></i>
                    <span>Kompetensi Teknis & Perangkat Lunak</span>
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div class="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                        <strong class="text-[#2D2D2D] block mb-1 uppercase tracking-wider font-mono text-[10px]">Keahlian Gizi Klinis:</strong>
                        <p class="text-[#666666] leading-relaxed">PAGT / NCP (ADIME format), Penilaian Status Gizi (Antropometri, Biokimia, Fisik/Klinis, Dietary Recall), Perhitungan BMR/TEE, Konseling Gizi Motivatif.</p>
                    </div>
                    <div class="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                        <strong class="text-[#2D2D2D] block mb-1 uppercase tracking-wider font-mono text-[10px]">Software & Standard:</strong>
                        <p class="text-[#666666] leading-relaxed">NutriSurvey (Analisis Nilai Gizi), WHO Anthro/AnthroPlus, SPSS Statistics, Canva Medical Media, HACCP Food Safety System.</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="mt-8 pt-4 border-t border-[#E8E0E3] flex justify-end print:hidden">
            <button
                @click="resumeOpen = false"
                class="px-6 py-2.5 rounded-full bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer"
            >
                Tutup CV
            </button>
        </div>
    </div>
</div>
