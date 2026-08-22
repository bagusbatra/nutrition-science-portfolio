@php
    $experienceAnchor = $visibility->workbench ? 'workbench' : ($visibility->cases ? 'cases' : ($visibility->rotations ? 'rotations' : null));

    $navItems = collect([['id' => 'hero', 'label' => 'Profil']]);
    if ($visibility->skripsi) {
        $navItems->push(['id' => 'skripsi', 'label' => 'Riset']);
    }
    if ($experienceAnchor) {
        $navItems->push(['id' => $experienceAnchor, 'label' => 'Pengalaman']);
    }
    if ($visibility->media) {
        $navItems->push(['id' => 'media', 'label' => 'Galeri']);
    }
    if ($visibility->skills) {
        $navItems->push(['id' => 'skills', 'label' => 'Kompetensi']);
    }

    $navGroupForSection = [
        'hero' => 'hero',
        'skripsi' => 'skripsi',
        'workbench' => $experienceAnchor ?? 'workbench',
        'cases' => $experienceAnchor ?? 'cases',
        'rotations' => $experienceAnchor ?? 'rotations',
        'media' => 'media',
        'skills' => 'skills',
    ];
@endphp

<header
    x-data="{
        mobileMenuOpen: false,
        scrolled: false,
        activeSection: 'hero',
        navGroup: @js($navGroupForSection),
        init() {
            const sections = ['hero', 'skripsi', 'workbench', 'cases', 'rotations', 'media', 'skills'];
            const handle = () => {
                this.scrolled = window.scrollY > 20;
                const pos = window.scrollY + 180;
                for (const id of sections) {
                    const el = document.getElementById(id);
                    if (el) {
                        const top = el.offsetTop;
                        const h = el.offsetHeight;
                        if (pos >= top && pos < top + h) { this.activeSection = id; break; }
                    }
                }
            };
            window.addEventListener('scroll', handle);
            handle();
        },
        scrollTo(id) {
            this.mobileMenuOpen = false;
            const el = document.getElementById(id);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        },
        isActive(id) { return this.navGroup[this.activeSection] === id; }
    }"
    x-init="init()"
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
>

    {{-- Scroll Progress Bar --}}
    <div id="scroll-progress-bar" class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D2D2D] via-[#F8BBD0] to-[#2D2D2D] origin-left z-50 pointer-events-none" style="transform: scaleX(0);"></div>
    <script>
        (function () {
            const bar = document.getElementById('scroll-progress-bar');
            const update = () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
                if (bar) bar.style.transform = `scaleX(${progress})`;
            };
            window.addEventListener('scroll', update);
            window.addEventListener('resize', update);
            document.addEventListener('DOMContentLoaded', update);
            update();
        })();
    </script>

    {{-- Top Status Bar --}}
    <div class="bg-[#FCE4EC]/80 backdrop-blur-md border-b border-[#F8BBD0]/40 py-1.5 px-3 sm:px-4 text-xs text-[#666666] flex items-center justify-between">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div class="flex items-center gap-2 truncate">
                <span class="relative flex h-2 w-2 shrink-0">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8BBD0] opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#2D2D2D]"></span>
                </span>
                <span class="font-medium tracking-tight text-[#2D2D2D] text-[11px] sm:text-xs truncate">Status: {{ $personalInfo->status }}</span>
                <span class="hidden md:inline text-[#AAA]">|</span>
                <span class="hidden md:inline text-[#666666] text-xs">S1 Ilmu Gizi &bull; {{ $personalInfo->university }} &bull; Target: {{ $personalInfo->target_graduation }}</span>
            </div>

            <div class="flex items-center gap-3 sm:gap-4 text-[11px] shrink-0">
                <span class="hidden sm:inline text-[#8E8E8E] uppercase tracking-wider font-mono text-[10px]">
                    IPK: <strong class="text-[#2D2D2D] font-bold">{{ $personalInfo->gpa }}</strong>
                </span>
                <button
                    id="header-resume-btn-top"
                    @click="resumeOpen = true"
                    class="text-[#2D2D2D] hover:text-[#F8BBD0] transition-colors flex items-center gap-1 font-medium cursor-pointer uppercase tracking-wider text-[10px]"
                >
                    <i data-lucide="file-text" class="w-3 h-3 text-[#2D2D2D]"></i>
                    <span class="hidden xs:inline">Lihat CV</span>
                    <span class="xs:hidden">CV</span>
                </button>
            </div>
        </div>
    </div>

    {{-- Main Sticky Navbar --}}
    <nav
        :class="scrolled ? 'bg-[#F9F5F6]/95 backdrop-blur-md shadow-xs border-b border-[#E8E0E3] py-2.5 sm:py-3' : 'bg-[#F9F5F6]/85 backdrop-blur-sm py-3 sm:py-4 border-b border-[#E8E0E3]/60'"
        class="transition-all duration-300 px-3 sm:px-6"
    >
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-2">

            {{-- Logo / Monogram --}}
            <div
                id="header-brand-logo"
                onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
                class="cursor-pointer flex items-center gap-2.5 sm:gap-3 group select-none shrink-0"
            >
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-[#2D2D2D] font-serif italic font-bold text-sm sm:text-base group-hover:scale-105 transition-all shadow-xs">
                    DPA
                </div>
                <div class="flex flex-col">
                    <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-[#8E8E8E]">Portfolio</span>
                    <div class="flex items-center gap-1.5 sm:gap-2">
                        <h1 class="text-lg sm:text-2xl font-serif italic text-[#2D2D2D] tracking-tight">
                            {{ $personalInfo->name }}
                        </h1>
                        <span class="text-[9px] sm:text-[10px] font-sans px-1.5 sm:px-2 py-0.5 rounded-full bg-[#E0E0E0] text-[#2D2D2D] font-semibold tracking-wider uppercase">
                            S.Gz (Cand.)
                        </span>
                    </div>
                </div>
            </div>

            {{-- Desktop Navigation Links --}}
            <div class="hidden lg:flex items-center gap-5 xl:gap-6 text-xs uppercase tracking-widest">
                @foreach($navItems as $item)
                    <button
                        id="nav-link-{{ $item['id'] }}"
                        @click="scrollTo('{{ $item['id'] }}')"
                        :class="isActive('{{ $item['id'] }}') ? 'text-[#2D2D2D] font-bold' : 'text-[#666666] hover:text-[#2D2D2D]'"
                        class="transition-all cursor-pointer pb-0.5 relative py-1"
                    >
                        {{ $item['label'] }}
                        <div x-show="isActive('{{ $item['id'] }}')" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D2D2D]"></div>
                    </button>
                @endforeach
            </div>

            {{-- Action Buttons --}}
            <div class="hidden sm:flex items-center gap-2.5">
                @if($visibility->workbench)
                    <button
                        id="header-workbench-quick-btn"
                        @click="scrollTo('workbench')"
                        class="px-3.5 py-2 rounded-full text-xs uppercase tracking-widest text-[#2D2D2D] border border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <i data-lucide="heart-pulse" class="w-3.5 h-3.5"></i>
                        <span>Kalkulator</span>
                    </button>
                @endif

                <button
                    id="header-contact-btn"
                    @click="contactOpen = true"
                    class="px-4.5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                    <i data-lucide="send" class="w-3 h-3"></i>
                    <span>Say Hello</span>
                </button>
            </div>

            {{-- Mobile Menu Button --}}
            <div class="lg:hidden flex items-center gap-1.5">
                <button
                    id="mobile-menu-toggle-btn"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                    class="p-2.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] hover:bg-[#F8BBD0] transition-colors cursor-pointer border border-[#F8BBD0] min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Toggle Navigation"
                >
                    <i data-lucide="x" class="w-5 h-5" x-show="mobileMenuOpen"></i>
                    <i data-lucide="menu" class="w-5 h-5" x-show="!mobileMenuOpen"></i>
                </button>
            </div>

        </div>
    </nav>

    {{-- Mobile Drawer Menu & Backdrop --}}
    <div
        x-show="mobileMenuOpen"
        x-cloak
        x-transition:enter="transition-opacity duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition-opacity duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        @click="mobileMenuOpen = false"
        class="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
    ></div>

    <div
        x-show="mobileMenuOpen"
        x-cloak
        x-transition:enter="transition duration-250 ease-out"
        x-transition:enter-start="opacity-0 -translate-y-5"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition duration-250 ease-out"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-5"
        class="fixed inset-x-0 top-[82px] z-40 bg-[#F9F5F6] border-b border-[#E8E0E3] shadow-2xl p-5 sm:p-6 lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto"
    >
        <div class="flex flex-col gap-1.5 max-w-lg mx-auto">
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8E8E] mb-2 font-mono">Navigasi Portofolio</p>
            @foreach($navItems as $item)
                <button
                    id="mobile-nav-{{ $item['id'] }}"
                    @click="scrollTo('{{ $item['id'] }}')"
                    :class="activeSection === '{{ $item['id'] }}' ? 'bg-[#2D2D2D] text-white shadow-xs' : 'text-[#2D2D2D] bg-white/60 border border-[#E8E0E3] hover:bg-[#FCE4EC]'"
                    class="text-left py-3 px-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-colors min-h-[44px]"
                >
                    <span>{{ $item['label'] }}</span>
                    <i data-lucide="arrow-up-right" class="w-4 h-4" :class="activeSection === '{{ $item['id'] }}' ? 'text-white' : 'text-[#8E8E8E]'"></i>
                </button>
            @endforeach

            <div class="pt-4 border-t border-[#E8E0E3] flex flex-col gap-2.5 mt-2">
                <button
                    id="mobile-resume-btn"
                    @click="mobileMenuOpen = false; resumeOpen = true"
                    class="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#2D2D2D] bg-white border border-[#2D2D2D] flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
                >
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                    <span>Lihat CV Lengkap</span>
                </button>
                <button
                    id="mobile-contact-btn"
                    @click="mobileMenuOpen = false; contactOpen = true"
                    class="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] flex items-center justify-center gap-2 shadow-xs transition-all min-h-[44px]"
                >
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>Say Hello & Kontak Langsung</span>
                </button>
            </div>
        </div>
    </div>
</header>
