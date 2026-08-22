<section id="skills" class="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden">

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="award" class="w-3.5 h-3.5"></i>
                    <span>Skills, Software & Verified Credentials</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Kompetensi & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Sertifikasi Gizi</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Keahlian teknis asuhan gizi terstandar, penguasaan perangkat lunak analisis dietetik, standar keamanan pangan HACCP, dan sertifikasi profesi.
                </p>
            </div>

            <div class="text-xs text-[#666666]">
                <span class="font-mono bg-[#F9F5F6] px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
                    Kualifikasi Standar AsDI & PERSAGI
                </span>
            </div>
        </div>

        {{-- 3-Column Skills Grid --}}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">

            {{-- Column 1: Clinical --}}
            <div class="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
                <div>
                    <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                        <div class="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                            <i data-lucide="stethoscope" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-serif text-lg font-bold text-[#2D2D2D]">Klinis & Asuhan Gizi</h3>
                            <span class="text-[11px] text-[#8E8E8E] font-mono">Clinical Dietetics</span>
                        </div>
                    </div>

                    <div class="space-y-3.5">
                        @foreach($skills->clinical as $sk)
                            <div class="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                                <div class="flex items-center justify-between mb-1.5 gap-2">
                                    <span class="font-bold text-[#2D2D2D]">{{ $sk['name'] }}</span>
                                    <span class="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                                        {{ $sk['level'] }}
                                    </span>
                                </div>
                                <p class="text-[11px] text-[#666666] leading-relaxed">
                                    {{ $sk['desc'] }}
                                </p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            {{-- Column 2: Food Service --}}
            <div class="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
                <div>
                    <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                        <div class="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-serif text-lg font-bold text-[#2D2D2D]">MSPM & Keamanan Pangan</h3>
                            <span class="text-[11px] text-[#8E8E8E] font-mono">Food Service Management</span>
                        </div>
                    </div>

                    <div class="space-y-3.5">
                        @foreach($skills->food_service as $sk)
                            <div class="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                                <div class="flex items-center justify-between mb-1.5 gap-2">
                                    <span class="font-bold text-[#2D2D2D]">{{ $sk['name'] }}</span>
                                    <span class="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                                        {{ $sk['level'] }}
                                    </span>
                                </div>
                                <p class="text-[11px] text-[#666666] leading-relaxed">
                                    {{ $sk['desc'] }}
                                </p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            {{-- Column 3: Software --}}
            <div class="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
                <div>
                    <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                        <div class="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                            <i data-lucide="cpu" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-serif text-lg font-bold text-[#2D2D2D]">Software & Komputasi</h3>
                            <span class="text-[11px] text-[#8E8E8E] font-mono">Nutrition Analysis Tools</span>
                        </div>
                    </div>

                    <div class="space-y-3.5">
                        @foreach($skills->software as $sk)
                            <div class="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                                <div class="flex items-center justify-between mb-1.5 gap-2">
                                    <span class="font-bold text-[#2D2D2D]">{{ $sk['name'] }}</span>
                                    <span class="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                                        {{ $sk['level'] }}
                                    </span>
                                </div>
                                <p class="text-[11px] text-[#666666] leading-relaxed">
                                    {{ $sk['desc'] }}
                                </p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

        </div>

        {{-- Certifications Banner --}}
        <div class="bg-[#FCE4EC] rounded-[32px] border border-white p-6 sm:p-8 shadow-xs">
            <div class="flex items-center justify-between pb-4 border-b border-[#F8BBD0] mb-6">
                <h3 class="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] flex items-center gap-2">
                    <i data-lucide="file-check" class="w-5 h-5 text-[#2D2D2D]"></i>
                    <span>Sertifikat Pelatihan & Kredensial Resmi</span>
                </h3>
                <span class="text-xs font-mono uppercase tracking-wider text-[#2D2D2D] bg-white px-3 py-1 rounded-full font-bold">
                    Verified
                </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                @foreach($skills->certifications as $cert)
                    <div class="p-5 bg-white/90 rounded-2xl border border-white shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
                        <div>
                            <span class="text-[10px] font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full font-bold border border-[#F8BBD0]">
                                {{ $cert['year'] }}
                            </span>
                            <h4 class="font-serif font-bold text-sm text-[#2D2D2D] mt-2.5 mb-1 leading-snug">
                                {{ $cert['name'] }}
                            </h4>
                            <p class="text-xs text-[#666666]">
                                {{ $cert['issuer'] }}
                            </p>
                        </div>
                        <div class="mt-4 pt-3 border-t border-[#E8E0E3] flex items-center gap-1.5 text-[11px] text-[#2D2D2D] font-medium font-mono">
                            <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                            <span>Kredensial Sah</span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

    </div>

</section>
