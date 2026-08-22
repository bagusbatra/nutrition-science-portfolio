<footer class="bg-[#2D2D2D] text-[#E0E0E0] pt-16 pb-12 border-t border-[#3D3D3D]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Main Footer Row --}}
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D3D3D]">

            {{-- Col 1: Bio & Monogram --}}
            <div class="md:col-span-5 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#FCE4EC] border border-white flex items-center justify-center text-[#2D2D2D] font-serif font-bold text-sm">
                        DPA
                    </div>
                    <div>
                        <span class="font-serif text-xl font-bold text-white block">
                            {{ $personalInfo->name }}, S.Gz (Cand.)
                        </span>
                        <span class="text-xs text-[#8E8E8E] font-mono">S1 Ilmu Gizi & Dietetika Klinis</span>
                    </div>
                </div>

                <p class="text-xs text-[#CCCCCC] leading-relaxed max-w-sm font-light">
                    Portofolio akademik dan profesional mahasiswi tingkat akhir S1 Ilmu Gizi {{ $personalInfo->university }}. Mendedikasikan keahlian dalam proses asuhan gizi terstandar (PAGT), manajemen dietetik penyakit tidak menular, dan formulasi pangan berbasis kearifan lokal.
                </p>

                <div class="pt-2 flex items-center gap-3 text-xs font-mono uppercase tracking-wider">
                    <button
                        id="footer-open-resume-btn"
                        @click="resumeOpen = true"
                        class="text-[#F8BBD0] hover:text-white cursor-pointer transition-colors"
                    >
                        Unduh CV Lengkap
                    </button>
                    <span class="text-[#555555]">&bull;</span>
                    <button
                        id="footer-open-contact-btn"
                        @click="contactOpen = true"
                        class="text-[#F8BBD0] hover:text-white cursor-pointer transition-colors"
                    >
                        Hubungi Della
                    </button>
                </div>
            </div>

            {{-- Col 2: Navigation Links --}}
            <div class="md:col-span-3 space-y-3 text-xs">
                <span class="font-mono text-[10px] uppercase tracking-wider text-[#8E8E8E] font-bold block mb-1">
                    Navigasi Halaman
                </span>
                <ul class="space-y-2 text-[#CCCCCC]">
                    @if($visibility->skripsi)
                        <li>
                            <a href="#skripsi" class="hover:text-[#F8BBD0] transition-colors">Riset Skripsi & Uji Lab</a>
                        </li>
                    @endif
                    @if($visibility->workbench)
                        <li>
                            <a href="#workbench" class="hover:text-[#F8BBD0] transition-colors">Meja Dietisien Interaktif</a>
                        </li>
                    @endif
                    @if($visibility->cases)
                        <li>
                            <a href="#cases" class="hover:text-[#F8BBD0] transition-colors">Studi Kasus Asuhan Gizi (ADIME)</a>
                        </li>
                    @endif
                    @if($visibility->rotations)
                        <li>
                            <a href="#rotations" class="hover:text-[#F8BBD0] transition-colors">Rotasi Klinis & PKL RS</a>
                        </li>
                    @endif
                    @if($visibility->media)
                        <li>
                            <a href="#media" class="hover:text-[#F8BBD0] transition-colors">Media Leaflet & Infografis</a>
                        </li>
                    @endif
                    <li>
                        <button
                            id="footer-open-guestbook-btn"
                            @click="guestbookOpen = true"
                            class="hover:text-[#F8BBD0] transition-colors cursor-pointer text-left"
                        >
                            Buku Dukungan Sidang
                        </button>
                    </li>
                </ul>
            </div>

            {{-- Col 3: Academic Credentials & Contact --}}
            <div class="md:col-span-4 space-y-3 text-xs">
                <span class="font-mono text-[10px] uppercase tracking-wider text-[#8E8E8E] font-bold block mb-1">
                    Kontak & Afiliasi Kampus
                </span>
                <div class="space-y-2.5 text-[#CCCCCC]">
                    <div class="flex items-center gap-2">
                        <i data-lucide="graduation-cap" class="w-4 h-4 text-[#F8BBD0] shrink-0"></i>
                        <span>Program Studi S1 Ilmu Gizi, {{ $personalInfo->university }}</span>
                    </div>
                    <div class="flex items-center gap-2 font-mono text-[11px]">
                        <i data-lucide="mail" class="w-4 h-4 text-[#F8BBD0] shrink-0"></i>
                        <span>{{ $personalInfo->email }}</span>
                    </div>
                    <div class="flex items-center gap-2 font-mono text-[11px]">
                        <i data-lucide="map-pin" class="w-4 h-4 text-[#F8BBD0] shrink-0"></i>
                        <span>{{ $personalInfo->location }}</span>
                    </div>
                </div>

                <div class="mt-4 p-3.5 bg-[#383838] rounded-2xl border border-[#484848] text-[11px] text-[#E0E0E0] italic">
                    🩺 "Dietetic practice is both an exact metabolic science and an art of compassionate empathy."
                </div>
            </div>

        </div>

        {{-- Bottom Sub-row --}}
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E8E]">
            <div class="flex items-center gap-1.5 font-mono text-[11px]">
                <span>&copy; 2026 Nadhira Azzahra, S.Gz (Cand.). Dibuat dengan dedikasi ilmu gizi & sentuhan Artistic Flair.</span>
            </div>

            <button
                id="footer-back-to-top"
                onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
                class="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#383838] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] text-[#E0E0E0] transition-colors cursor-pointer text-xs font-mono uppercase tracking-wider"
            >
                <span>Kembali ke Atas</span>
                <i data-lucide="arrow-up" class="w-3.5 h-3.5"></i>
            </button>
        </div>

    </div>
</footer>
