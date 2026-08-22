<section
    id="skripsi"
    x-data="{
        formulations: @js($skripsi->formulations),
        selectedFormulaCode: 'F2 (Formulasi Terpilih ⭐)',
        showAbstractModal: false,
        simKelor: 15,
        simBekatul: 15,
        get selectedFormula() {
            return this.formulations.find(f => f.code === this.selectedFormulaCode) || this.formulations[0];
        },
        get simFe() { return +(1.2 + (this.simKelor * 0.38) + (this.simBekatul * 0.08)).toFixed(2); },
        get simProtein() { return +(3.1 + (this.simKelor * 0.32) + (this.simBekatul * 0.12)).toFixed(2); },
        get simSerat() { return +(1.8 + (this.simKelor * 0.18) + (this.simBekatul * 0.16)).toFixed(2); },
        get simAKGContribution() { return Math.min(100, Math.round(((this.simFe * 0.4) / 15) * 100)); },
        get tasteNote() {
            if (this.simKelor > 18) return 'Sensasi langu dan agak sepat dari klorofil daun kelor mulai terdeteksi kuat.';
            if (this.simKelor < 10) return 'Rasa sangat ringan, namun kontribusi zat besi (Fe) belum optimal untuk intervensi anemia.';
            return 'Sangat seimbang dan gurih alami (Formula Terbaik)';
        },
        get mocafRemainder() { return Math.max(0, 100 - this.simKelor - this.simBekatul); }
    }"
    class="py-16 sm:py-20 bg-[#F9F5F6] relative border-y border-[#E8E0E3] overflow-hidden"
>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                    <span>Flagship Research & Food Formulation Lab</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Riset Skripsi & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Eksperimen Pangan</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Pengembangan biskuit mocaf fortifikasi ekstrak daun kelor dan bekatul sebagai kudapan padat gizi pencegah anemia defisiensi besi pada remaja putri.
                </p>
            </div>

            <div class="flex items-center gap-2">
                <button
                    id="skripsi-read-abstract-btn"
                    @click="showAbstractModal = true"
                    class="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-[#2D2D2D] bg-white hover:bg-[#2D2D2D] hover:text-white border border-[#2D2D2D] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                    <i data-lucide="book-open" class="w-4 h-4"></i>
                    <span>Baca Naskah Abstrak</span>
                </button>
            </div>
        </div>

        {{-- Top Research Overview Banner --}}
        <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-8 shadow-sm mb-8 sm:mb-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

                <div class="lg:col-span-8 space-y-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="px-3 py-1 rounded-full bg-[#2D2D2D] text-white text-[10px] uppercase tracking-widest font-bold font-mono">
                            SKRIPSI S1 GIZI
                        </span>
                        <span class="px-3 py-1 rounded-full bg-[#E0E0E0] text-[#2D2D2D] text-xs font-medium">
                            Uji Hedonik & Analisis Proksimat
                        </span>
                        <span class="px-3 py-1 rounded-full bg-[#FCE4EC] text-[#2D2D2D] text-xs font-semibold border border-[#F8BBD0] flex items-center gap-1">
                            <i data-lucide="check" class="w-3 h-3 text-[#2D2D2D]"></i> Status: Siap Ujian Sidang
                        </span>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-serif italic text-[#2D2D2D] leading-snug">
                        "{{ $skripsi->title }}"
                    </h3>

                    <p class="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                        {{ $skripsi->sub_title }}
                    </p>

                    <div class="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#666666]">
                        <div>
                            <span class="text-[#8E8E8E] block text-[10px] uppercase tracking-wider font-mono">Dosen Pembimbing I:</span>
                            <strong class="text-[#2D2D2D] font-semibold">{{ $skripsi->advisor[0] ?? '' }}</strong>
                        </div>
                        <div>
                            <span class="text-[#8E8E8E] block text-[10px] uppercase tracking-wider font-mono">Dosen Pembimbing II:</span>
                            <strong class="text-[#2D2D2D] font-semibold">{{ $skripsi->advisor[1] ?? '' }}</strong>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4 bg-[#FCE4EC] rounded-[28px] p-6 border border-white flex flex-col justify-between shadow-xs">
                    <div>
                        <span class="text-[10px] uppercase tracking-[0.2em] text-[#2D2D2D] font-bold block mb-1 font-mono">
                            Formulasi Terpilih (F2)
                        </span>
                        <div class="text-3xl font-serif italic font-bold text-[#2D2D2D] mb-2">
                            7.8 mg Fe / 100g
                        </div>
                        <p class="text-xs text-[#666666] leading-relaxed mb-4">
                            Menyumbang <strong>52% AKG snack</strong> Fe remaja putri dalam 1 porsi (40g), dengan skor organoleptik tertinggi <strong>4.4 / 5.0</strong>.
                        </p>
                    </div>

                    <div class="pt-3 border-t border-white/60 flex items-center justify-between text-xs text-[#2D2D2D]">
                        <span class="text-[#666666]">Taraf Signifikansi:</span>
                        <strong class="font-mono font-bold">p = 0.003 (Signifikan)</strong>
                    </div>
                </div>

            </div>
        </div>

        {{-- 2-Column Interactive Lab Investigation Suite --}}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {{-- Left Column: Formulation Selector & Lab Test Results --}}
            <div class="lg:col-span-7 space-y-6">

                <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-7 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <div>
                            <h4 class="text-base font-serif italic text-[#2D2D2D] font-bold">
                                1. Perbandingan Uji 4 Perlakuan Formulasi
                            </h4>
                            <p class="text-xs text-[#666666]">Pilih kode formula untuk meninjau data organoleptik & proksimat:</p>
                        </div>
                        <span class="text-xs font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-1 rounded-full border border-[#F8BBD0] self-start sm:self-auto font-medium">
                            n = 35 Panelis
                        </span>
                    </div>

                    {{-- Formula Cards --}}
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                        <template x-for="f in formulations" :key="f.code">
                            <button
                                @click="selectedFormulaCode = f.code"
                                :class="f.code === selectedFormulaCode ? 'bg-[#FCE4EC] border-[#2D2D2D] shadow-xs' : 'bg-[#F9F5F6] border-[#E8E0E3] hover:bg-[#FCE4EC]/50'"
                                class="p-3 rounded-2xl text-left transition-all border cursor-pointer"
                            >
                                <div class="flex items-center justify-between mb-1">
                                    <span class="font-mono font-bold text-xs text-[#2D2D2D]" x-text="f.code.split(' ')[0]"></span>
                                    <i data-lucide="award" class="w-3.5 h-3.5 text-[#2D2D2D]" x-show="f.isBestChoice"></i>
                                </div>
                                <span class="text-[11px] text-[#4A4A4A] block leading-tight font-medium">
                                    Kelor <span x-text="f.kelorPercent"></span>% : Bekatul <span x-text="f.bekatulPercent"></span>%
                                </span>
                                <span class="text-[10px] text-[#8E8E8E] block mt-1 font-mono">
                                    Mocaf <span x-text="f.mocafPercent"></span>%
                                </span>
                            </button>
                        </template>
                    </div>

                    {{-- Detailed Breakdown for Selected Formula --}}
                    <div class="bg-[#F9F5F6] rounded-2xl p-5 border border-[#E8E0E3]" x-show="selectedFormula">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-[#E8E0E3] gap-2">
                            <div>
                                <span class="text-xs font-bold text-[#2D2D2D]" x-text="selectedFormula.code"></span>
                                <p class="text-xs text-[#666666]" x-text="selectedFormula.ratio"></p>
                            </div>
                            <span x-show="selectedFormula.isBestChoice" class="px-3 py-1 rounded-full bg-[#2D2D2D] text-white text-[10px] font-bold tracking-widest uppercase font-mono self-start sm:self-auto">
                                Formula Paling Optimal
                            </span>
                            <span x-show="!selectedFormula.isBestChoice" class="px-3 py-1 rounded-full bg-[#E0E0E0] text-[#2D2D2D] text-[10px] font-semibold uppercase tracking-wider font-mono self-start sm:self-auto">
                                Formula Eksperimental
                            </span>
                        </div>

                        {{-- Organoleptic Scores --}}
                        <div class="mb-5">
                            <div class="flex items-center justify-between text-xs font-semibold text-[#2D2D2D] mb-2.5">
                                <span>Hasil Uji Organoleptik (Skala Hedonik 1 - 5)</span>
                                <span class="font-mono text-[#2D2D2D] font-bold">Skor: <span x-text="selectedFormula.organolepticScore.overall"></span> / 5.0</span>
                            </div>

                            <div class="space-y-2.5">
                                <template x-for="item in [
                                    { label: 'Warna (Penampakan Hijau Zaitun)', score: selectedFormula.organolepticScore.warna, max: 5 },
                                    { label: 'Aroma (Karakteristik Rempah & Bekatul)', score: selectedFormula.organolepticScore.aroma, max: 5 },
                                    { label: 'Rasa (Tingkat Kemanisan & Ketiadaan Langu)', score: selectedFormula.organolepticScore.rasa, max: 5 },
                                    { label: 'Tekstur (Tingkat Kerenyahan / Crispness)', score: selectedFormula.organolepticScore.tekstur, max: 5 },
                                ]" :key="item.label">
                                    <div class="text-xs">
                                        <div class="flex justify-between text-[11px] text-[#4A4A4A] mb-1">
                                            <span x-text="item.label"></span>
                                            <strong class="font-mono text-[#2D2D2D]"><span x-text="item.score"></span> / 5.0</strong>
                                        </div>
                                        <div class="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                                            <div class="h-full bg-[#2D2D2D] rounded-full transition-all duration-500" :style="`width: ${(item.score / item.max) * 100}%`"></div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>

                        {{-- Proximate Values --}}
                        <div>
                            <span class="text-xs font-semibold text-[#2D2D2D] block mb-2 font-mono uppercase tracking-wider text-[10px]">
                                Analisis Proksimat & Zat Besi (per 100 gram bahan)
                            </span>
                            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                                <div class="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                                    <span class="text-[10px] text-[#8E8E8E] block">Zat Besi (Fe)</span>
                                    <strong class="text-sm font-serif italic text-[#2D2D2D]"><span x-text="selectedFormula.proximate.fe"></span> mg</strong>
                                </div>
                                <div class="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                                    <span class="text-[10px] text-[#8E8E8E] block">Protein</span>
                                    <strong class="text-sm font-mono text-[#2D2D2D]"><span x-text="selectedFormula.proximate.protein"></span> g</strong>
                                </div>
                                <div class="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                                    <span class="text-[10px] text-[#8E8E8E] block">Serat</span>
                                    <strong class="text-sm font-mono text-[#2D2D2D]"><span x-text="selectedFormula.proximate.serat"></span> g</strong>
                                </div>
                                <div class="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                                    <span class="text-[10px] text-[#8E8E8E] block">Lemak</span>
                                    <strong class="text-sm font-mono text-[#2D2D2D]"><span x-text="selectedFormula.proximate.lemak"></span> g</strong>
                                </div>
                                <div class="p-2.5 bg-white rounded-xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                                    <span class="text-[10px] text-[#8E8E8E] block">Energi</span>
                                    <strong class="text-sm font-mono text-[#2D2D2D]"><span x-text="selectedFormula.proximate.energi"></span> kkal</strong>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {{-- Key Scientific Findings --}}
                <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-6 shadow-sm">
                    <h4 class="text-base font-serif italic text-[#2D2D2D] font-bold mb-3 flex items-center gap-2">
                        <i data-lucide="sparkles" class="w-4 h-4 text-[#2D2D2D]"></i>
                        <span>Temuan Kunci Riset & Implikasi Gizi Masyarakat</span>
                    </h4>
                    <ul class="space-y-2.5">
                        @foreach($skripsi->key_takeaways as $idx => $point)
                            <li class="flex items-start gap-2.5 text-xs text-[#666666] leading-relaxed">
                                <span class="w-4 h-4 rounded-full bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#F8BBD0]">
                                    {{ $idx + 1 }}
                                </span>
                                <span>{{ $point }}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>

            </div>

            {{-- Right Column: Interactive Formulation Simulator --}}
            <div class="lg:col-span-5">
                <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-sm lg:sticky lg:top-28">

                    <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-5">
                        <div class="flex items-center gap-2">
                            <div class="p-2 rounded-full bg-[#FCE4EC] text-[#2D2D2D]">
                                <i data-lucide="sliders" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <h4 class="text-sm font-serif italic font-bold text-[#2D2D2D]">
                                    Simulator Formulasi Pangan
                                </h4>
                                <p class="text-[11px] text-[#8E8E8E]">Eksplorasi rasio bahan aktif & estimasi Fe AKG</p>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase tracking-wider font-mono bg-[#E0E0E0] text-[#2D2D2D] px-2.5 py-0.5 rounded-full font-bold">
                            Live Sim
                        </span>
                    </div>

                    {{-- Slider 1: Kelor --}}
                    <div class="mb-5">
                        <div class="flex justify-between text-xs mb-1.5">
                            <span class="font-semibold text-[#2D2D2D]">Substitusi Ekstrak Daun Kelor</span>
                            <span class="font-mono font-bold text-[#2D2D2D]" x-text="simKelor + '%'"></span>
                        </div>
                        <input
                            id="simulator-kelor-slider"
                            type="range"
                            min="0"
                            max="25"
                            step="1"
                            x-model.number="simKelor"
                            class="w-full h-2.5 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#2D2D2D]"
                        >
                        <div class="flex justify-between text-[10px] text-[#8E8E8E] mt-1 font-mono">
                            <span>0% (Kontrol)</span>
                            <span>15% (Optimal)</span>
                            <span>25% (Tinggi Fe)</span>
                        </div>
                    </div>

                    {{-- Slider 2: Bekatul --}}
                    <div class="mb-6">
                        <div class="flex justify-between text-xs mb-1.5">
                            <span class="font-semibold text-[#2D2D2D]">Substitusi Tepung Bekatul Beras</span>
                            <span class="font-mono font-bold text-[#2D2D2D]" x-text="simBekatul + '%'"></span>
                        </div>
                        <input
                            id="simulator-bekatul-slider"
                            type="range"
                            min="0"
                            max="25"
                            step="1"
                            x-model.number="simBekatul"
                            class="w-full h-2.5 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#2D2D2D]"
                        >
                        <div class="flex justify-between text-[10px] text-[#8E8E8E] mt-1 font-mono">
                            <span>0%</span>
                            <span>15% (Serat Optimal)</span>
                            <span>25%</span>
                        </div>
                    </div>

                    {{-- Remaining Base Flour --}}
                    <div class="p-3 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] flex items-center justify-between text-xs mb-5">
                        <span class="text-[#666666]">Tepung Dasar Mocaf (Bebas Gluten):</span>
                        <strong class="font-mono text-[#2D2D2D]" x-text="mocafRemainder + '%'"></strong>
                    </div>

                    {{-- Output Results --}}
                    <div class="p-5 bg-[#FCE4EC] rounded-2xl border border-white space-y-3 mb-5 shadow-xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-[#666666]">Estimasi Kandungan Fe:</span>
                            <span class="text-xl font-serif italic font-bold text-[#2D2D2D]" x-text="simFe + ' mg / 100g'"></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-xs text-[#666666]">Estimasi Protein:</span>
                            <span class="text-sm font-mono font-bold text-[#2D2D2D]" x-text="simProtein + ' g / 100g'"></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-xs text-[#666666]">Estimasi Serat Pangan:</span>
                            <span class="text-sm font-mono font-bold text-[#2D2D2D]" x-text="simSerat + ' g / 100g'"></span>
                        </div>

                        <div class="pt-2 border-t border-white/60">
                            <div class="flex justify-between text-xs mb-1">
                                <span class="font-semibold text-[#2D2D2D]">Kontribusi AKG Zat Besi Snack (40g):</span>
                                <strong class="font-mono text-[#2D2D2D]" x-text="simAKGContribution + '% dari AKG'"></strong>
                            </div>
                            <div class="h-2.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                                <div class="h-full bg-[#2D2D2D] rounded-full transition-all duration-300" :style="`width: ${Math.min(100, simAKGContribution)}%`"></div>
                            </div>
                            <span class="text-[10px] text-[#8E8E8E] block mt-1">
                                *Target kontribusi snack sehat: 10 - 20% dari total AKG harian 15 mg Fe remaja putri.
                            </span>
                        </div>
                    </div>

                    {{-- Organoleptic Feedback --}}
                    <div class="p-3.5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3] text-xs leading-relaxed text-[#4A4A4A]">
                        <div class="flex items-start gap-2">
                            <i data-lucide="info" class="w-4 h-4 shrink-0 mt-0.5 text-[#2D2D2D]"></i>
                            <div>
                                <strong class="block text-[10px] uppercase tracking-wider font-mono text-[#2D2D2D]">Sensory Prediction:</strong>
                                <span x-text="tasteNote"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>

    {{-- Full Abstract Modal --}}
    <div
        x-show="showAbstractModal"
        x-cloak
        x-transition:enter="transition-opacity duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
        @click.self="showAbstractModal = false"
    >
        <div
            x-show="showAbstractModal"
            x-transition:enter="transition duration-200"
            x-transition:enter-start="opacity-0 scale-95"
            x-transition:enter-end="opacity-100 scale-100"
            class="bg-white rounded-[28px] sm:rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-[#E8E0E3] shadow-2xl relative"
        >
            <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-4">
                <div class="flex items-center gap-2">
                    <i data-lucide="file-check-2" class="w-5 h-5 text-[#2D2D2D]"></i>
                    <span class="font-serif italic text-lg sm:text-xl font-bold text-[#2D2D2D]">Abstrak Lengkap Skripsi</span>
                </div>
                <button
                    id="close-abstract-modal-btn"
                    @click="showAbstractModal = false"
                    class="w-9 h-9 rounded-full bg-[#FCE4EC] hover:bg-[#F8BBD0] text-[#2D2D2D] flex items-center justify-center text-sm font-bold cursor-pointer transition-colors border border-[#F8BBD0]"
                >
                    ✕
                </button>
            </div>

            <div class="space-y-4 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                <h4 class="font-bold text-[#2D2D2D] font-serif italic text-base sm:text-lg">
                    {{ $skripsi->title }}
                </h4>
                <p class="italic text-[#8E8E8E] text-xs">
                    Oleh: {{ $skripsi->advisor[0] ?? '' }}, {{ $skripsi->advisor[1] ?? '' }}, & Nadhira Azzahra
                </p>
                <div class="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] text-justify font-light text-xs sm:text-sm">
                    <p>{{ $skripsi->abstract }}</p>
                </div>

                <div>
                    <h5 class="font-bold text-[#2D2D2D] mb-1.5 text-xs uppercase tracking-wider font-mono">Kata Kunci (Keywords):</h5>
                    <div class="flex flex-wrap gap-1.5">
                        @foreach(['Biskuit Fungsional', 'Tepung Mocaf', 'Daun Kelor', 'Bekatul Beras', 'Anemia Remaja Putri', 'Zat Besi (Fe)', 'Uji Organoleptik'] as $kw)
                            <span class="px-3 py-1 bg-[#FCE4EC] text-[#2D2D2D] rounded-full text-xs font-medium border border-[#F8BBD0]">
                                {{ $kw }}
                            </span>
                        @endforeach
                    </div>
                </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#E8E0E3] flex justify-end">
                <button
                    id="skripsi-modal-close-action"
                    @click="showAbstractModal = false"
                    class="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2D2D2D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer min-h-[44px]"
                >
                    Tutup Naskah
                </button>
            </div>
        </div>
    </div>

</section>
