<section
    id="hero"
    x-data="{ activeTab: 'profil', copiedEmail: false, copyEmail() { navigator.clipboard.writeText('{{ $personalInfo->email }}'); this.copiedEmail = true; setTimeout(() => this.copiedEmail = false, 2000); } }"
    class="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#E8E0E3]"
>
    {{-- Background Soft Gradient Blurs & Watermark --}}
    <div class="absolute -top-20 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none -z-10"></div>
    <div class="absolute top-1/2 -right-20 w-72 sm:w-80 h-72 sm:h-80 bg-[#E0E0E0] rounded-full blur-3xl opacity-40 pointer-events-none -z-10"></div>
    <div class="absolute inset-0 lab-grid-pattern opacity-40 pointer-events-none"></div>

    <div class="hidden lg:flex absolute bottom-20 left-[5%] w-11 h-11 rounded-2xl bg-white border border-[#E8E0E3] items-center justify-center text-[#2D2D2D] shadow-xs pointer-events-none -z-0 opacity-80">
        <i data-lucide="flask-conical" class="w-5 h-5 text-[#2D2D2D]"></i>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {{-- Left Column --}}
            <div class="lg:col-span-7 flex flex-col justify-center relative">

                <span class="absolute -top-10 sm:-top-14 -left-4 sm:-left-6 text-[5.5rem] sm:text-[9rem] lg:text-[10rem] font-serif italic text-[#F8BBD0]/20 select-none pointer-events-none -z-10 leading-none">
                    Gizi
                </span>

                <div>
                    <div class="flex items-center gap-2 mb-3 sm:mb-4">
                        <span class="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-[#8E8E8E]">
                            Nutrisi & Dietetika Terapan
                        </span>
                        <span class="w-8 h-[1px] bg-[#2D2D2D]"></span>
                    </div>

                    <h1 class="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2D2D2D] leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6">
                        Bridging Science <br class="hidden sm:inline">
                        & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">The Plate.</span>
                    </h1>

                    <p class="text-sm sm:text-base lg:text-lg text-[#666666] leading-relaxed mb-6 sm:mb-8 max-w-xl font-light">
                        Mahasiswi tingkat akhir <strong class="font-semibold text-[#2D2D2D]">Ilmu Gizi Universitas Indonesia</strong> yang berfokus pada asuhan gizi klinis penyakit degeneratif (PAGT/ADIME), manajemen nutrisi rumah sakit, serta inovasi pangan fungsional pencegah anemia.
                    </p>

                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                        <button
                            id="hero-skripsi-cta-btn"
                            onclick="scrollToSection('skripsi')"
                            class="px-7 py-3.5 bg-[#2D2D2D] text-white text-xs uppercase tracking-widest rounded-full hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group min-h-[44px]"
                        >
                            <i data-lucide="flask-conical" class="w-4 h-4 group-hover:rotate-12 transition-transform"></i>
                            <span>View Research</span>
                        </button>

                        <button
                            id="hero-workbench-cta-btn"
                            onclick="scrollToSection('workbench')"
                            class="px-6 py-3.5 border border-[#2D2D2D] text-[#2D2D2D] text-xs uppercase tracking-widest rounded-full hover:bg-[#2D2D2D] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                        >
                            <i data-lucide="stethoscope" class="w-4 h-4"></i>
                            <span>Kalkulator Gizi</span>
                        </button>

                        <button
                            id="hero-contact-cta-btn"
                            @click="contactOpen = true"
                            class="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#666666] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-1.5 cursor-pointer underline decoration-[#DDD] underline-offset-4 min-h-[44px]"
                        >
                            <span>Say Hello</span>
                        </button>
                    </div>
                </div>

                {{-- Quick Metrics Bar --}}
                <div class="pt-5 sm:pt-6 border-t border-[#E8E0E3] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    @foreach($personalInfo->stats as $st)
                        <div class="flex flex-col p-2.5 sm:p-0 bg-[#F9F5F6] sm:bg-transparent rounded-2xl sm:rounded-none border border-[#E8E0E3] sm:border-0">
                            <span class="font-serif italic text-2xl sm:text-3xl text-[#2D2D2D] font-bold tracking-tight">
                                {{ $st['value'] }}
                            </span>
                            <span class="text-xs font-semibold text-[#2D2D2D] mt-0.5">{{ $st['label'] }}</span>
                            <span class="text-[10px] sm:text-[11px] text-[#8E8E8E] leading-tight mt-0.5">{{ $st['sub'] }}</span>
                        </div>
                    @endforeach
                </div>
            </div>

            {{-- Right Column: Showcase Card --}}
            <div class="lg:col-span-5 relative flex items-center justify-center pt-2 sm:pt-6 lg:pt-0">

                <div class="w-full bg-[#FCE4EC] rounded-[32px] sm:rounded-[40px] relative overflow-hidden border border-white shadow-xl sm:rotate-1 transition-transform hover:rotate-0 duration-500">

                    <div class="absolute inset-0 bg-gradient-to-tr from-[#F8BBD0]/40 to-transparent opacity-60 pointer-events-none"></div>

                    <div class="p-5 sm:p-7 relative z-10">

                        <div class="flex items-center justify-between pb-3 border-b border-white/60 mb-4">
                            <div class="flex items-center gap-2">
                                <span class="text-[9px] uppercase tracking-[0.25em] font-bold text-[#2D2D2D] font-mono">
                                    Clinical Dossier
                                </span>
                            </div>
                            <span class="text-[10px] uppercase tracking-wider text-[#2D2D2D] bg-white/80 px-2.5 py-0.5 rounded-full font-mono font-bold border border-white">
                                GPA {{ $personalInfo->gpa }}
                            </span>
                        </div>

                        <div class="flex items-center gap-3 sm:gap-3.5 mb-4">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-white/80 shadow-xs flex items-center justify-center text-[#2D2D2D] font-serif italic text-xl sm:text-2xl font-bold shrink-0">
                                NA
                            </div>
                            <div class="min-w-0">
                                <h2 class="text-base sm:text-lg font-serif italic font-bold text-[#2D2D2D] truncate">
                                    {{ $personalInfo->name }}
                                </h2>
                                <p class="text-xs text-[#666666] truncate">Sarjana Gizi (Cand.) &bull; Angkatan 2022</p>
                                <p class="text-[11px] text-[#8E8E8E] font-mono truncate">FKM Universitas Indonesia</p>
                            </div>
                        </div>

                        {{-- Tab Switcher --}}
                        <div class="flex rounded-full bg-white/70 p-1 mb-4 border border-white/80 backdrop-blur-xs">
                            <button
                                id="hero-tab-profil"
                                @click="activeTab = 'profil'"
                                :class="activeTab === 'profil' ? 'bg-[#2D2D2D] text-white shadow-xs' : 'text-[#666666] hover:text-[#2D2D2D]'"
                                class="flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer text-[10px]"
                            >Pilar Ilmu</button>
                            <button
                                id="hero-tab-fokus"
                                @click="activeTab = 'fokus'"
                                :class="activeTab === 'fokus' ? 'bg-[#2D2D2D] text-white shadow-xs' : 'text-[#666666] hover:text-[#2D2D2D]'"
                                class="flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer text-[10px]"
                            >Minat Karir</button>
                            <button
                                id="hero-tab-metrik"
                                @click="activeTab = 'metrik'"
                                :class="activeTab === 'metrik' ? 'bg-[#2D2D2D] text-white shadow-xs' : 'text-[#666666] hover:text-[#2D2D2D]'"
                                class="flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer text-[10px]"
                            >Prestasi</button>
                        </div>

                        {{-- Tab 1: Pilar Ilmu --}}
                        <div x-show="activeTab === 'profil'" x-transition class="space-y-2.5">
                            <div class="p-3 rounded-2xl bg-white/85 backdrop-blur-xs border border-white flex items-start gap-2.5">
                                <div class="p-1.5 rounded-lg bg-[#FCE4EC] text-[#2D2D2D] shrink-0">
                                    <i data-lucide="stethoscope" class="w-3.5 h-3.5"></i>
                                </div>
                                <div>
                                    <h3 class="text-xs font-bold text-[#2D2D2D]">Dietetika Penyakit Kronis</h3>
                                    <p class="text-[11px] text-[#666666] mt-0.5 leading-relaxed">
                                        Penatalaksanaan gizi DM, GGK, Hipertensi, dan Malnutrisi berbasis ADIME.
                                    </p>
                                </div>
                            </div>

                            <div class="p-3 rounded-2xl bg-white/85 backdrop-blur-xs border border-white flex items-start gap-2.5">
                                <div class="p-1.5 rounded-lg bg-[#FCE4EC] text-[#2D2D2D] shrink-0">
                                    <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                                </div>
                                <div>
                                    <h3 class="text-xs font-bold text-[#2D2D2D]">Formulasi & Biokimia Pangan</h3>
                                    <p class="text-[11px] text-[#666666] mt-0.5 leading-relaxed">
                                        Pengembangan kudapan fungsional mocaf-kelor, uji hedonik, dan analisis proksimat Fe.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {{-- Tab 2: Minat Karir --}}
                        <div x-show="activeTab === 'fokus'" x-transition class="space-y-2">
                            @foreach([
                                ['role' => 'Clinical Dietitian (RS Inpatient / Outpatient)', 'match' => 'Minat Utama ⭐'],
                                ['role' => 'R&D Pangan Fungsional & Formulasi Nutrisi', 'match' => 'Riset Skripsi'],
                                ['role' => 'Community Nutrition & Edukator Gizi', 'match' => 'Pengalaman PKL'],
                            ] as $item)
                                <div class="p-2.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white flex items-center justify-between text-xs">
                                    <span class="font-medium text-[#2D2D2D] text-[11px] truncate pr-2">{{ $item['role'] }}</span>
                                    <span class="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-[#2D2D2D] text-white shrink-0">
                                        {{ $item['match'] }}
                                    </span>
                                </div>
                            @endforeach
                        </div>

                        {{-- Tab 3: Metrik & Prestasi --}}
                        <div x-show="activeTab === 'metrik'" x-transition class="space-y-2.5">
                            <div class="grid grid-cols-2 gap-2 text-center">
                                <div class="p-2.5 bg-white/85 rounded-xl border border-white">
                                    <span class="text-[10px] text-[#8E8E8E] font-medium block uppercase tracking-wider">Mata Kuliah Utama</span>
                                    <strong class="text-base font-serif italic text-[#2D2D2D]">A (4.00)</strong>
                                    <span class="text-[9px] text-[#666666] block">Dietetik Penyakit Kronis</span>
                                </div>
                                <div class="p-2.5 bg-white/85 rounded-xl border border-white">
                                    <span class="text-[10px] text-[#8E8E8E] font-medium block uppercase tracking-wider">TOEFL Score</span>
                                    <strong class="text-base font-serif italic text-[#2D2D2D]">580</strong>
                                    <span class="text-[9px] text-[#666666] block">ITP Test UI</span>
                                </div>
                            </div>
                            <div class="p-2 bg-white/85 rounded-lg border border-white text-[11px] text-[#2D2D2D]">
                                <strong>Hibah Riset:</strong> Peraih Hibah Penelitian Pangan Lokal 2025.
                            </div>
                        </div>

                        {{-- Bottom Latest Thesis Overlay --}}
                        <div class="mt-4 pt-3 border-t border-white/60 flex items-center justify-between">
                            <div>
                                <span class="text-[9px] uppercase tracking-widest font-bold text-[#2D2D2D] block font-mono">
                                    Skripsi Terpilih
                                </span>
                                <span class="text-xs font-serif italic text-[#2D2D2D]">Biskuit Kelor-Bekatul Fe 7.8mg</span>
                            </div>
                            <button
                                onclick="scrollToSection('skripsi')"
                                class="text-[10px] uppercase tracking-wider font-semibold text-[#2D2D2D] hover:underline cursor-pointer font-mono"
                            >
                                Detail &rarr;
                            </button>
                        </div>

                    </div>
                </div>

                {{-- Circular Floating Badge --}}
                <div class="absolute -bottom-4 -left-3 sm:-bottom-7 sm:-left-7 w-28 h-28 sm:w-36 sm:h-36 bg-[#E0E0E0] rounded-full flex items-center justify-center p-2.5 sm:p-4 text-center border-4 border-[#F9F5F6] shadow-md z-20 pointer-events-none">
                    <div class="flex flex-col items-center justify-center">
                        <i data-lucide="sparkles" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2D2D2D] mb-0.5 sm:mb-1"></i>
                        <span class="text-[8px] sm:text-[10px] leading-tight font-bold uppercase tracking-tight text-[#2D2D2D]">
                            Certified Nutritionist Trainee
                        </span>
                        <span class="text-[7px] sm:text-[8px] text-[#666666] mt-0.5 font-mono">850+ Jam PKL</span>
                    </div>
                </div>

            </div>

        </div>

    </div>
</section>
