@php
    $iconKebab = function (string $name): string {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $name));
    };

    $rotationsData = $rotations->map(fn($r) => [
        'id' => $r->id,
        'category' => $r->category,
        'institution' => $r->institution,
        'period' => $r->period,
        'role' => $r->role,
        'location' => $r->location,
        'badges' => $r->badges,
        'achievements' => $r->achievements,
        'highlightMetric' => $r->highlight_metric,
        'icon' => $iconKebab($r->icon_name ?: 'FlaskConical'),
    ])->values();

    $categories = [
        ['id' => 'all', 'label' => 'Semua Rotasi (' . $rotationsData->count() . ')'],
        ['id' => 'Klinis (Dietetik RS)', 'label' => 'Dietetik Klinis RS'],
        ['id' => 'MSPM (Food Service)', 'label' => 'MSPM & Food Service'],
        ['id' => 'Gizi Masyarakat (Puskesmas)', 'label' => 'Gizi Masyarakat'],
        ['id' => 'Akademik & Riset', 'label' => 'Lab & Akademik'],
    ];
@endphp

<section
    id="rotations"
    x-data="{
        rotations: @js($rotationsData),
        selectedCategory: 'all',
        get filteredRotations() {
            if (this.selectedCategory === 'all') return this.rotations;
            return this.rotations.filter(r => r.category === this.selectedCategory);
        }
    }"
    class="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden"
>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
                    <span>Clinical Rotations & Nutrition Fieldwork</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Rotasi Klinis & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Pengalaman Lapangan</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Pengalaman lapangan mencakup 3 pilar kompetensi utama ilmu gizi: Pelayanan Gizi Rawat Inap RS, Penyelenggaraan Makanan Masal, dan Intervensi Gizi Masyarakat di Puskesmas.
                </p>
            </div>

            <div class="text-xs text-[#666666]">
                <span class="font-mono bg-[#F9F5F6] px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
                    Total 850+ Jam Praktik Lapangan
                </span>
            </div>
        </div>

        {{-- Filter Pills --}}
        <div class="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
            @foreach($categories as $cat)
                <button
                    id="filter-rotation-{{ \Illuminate\Support\Str::slug($cat['id']) }}"
                    @click="selectedCategory = @js($cat['id'])"
                    :class="selectedCategory === @js($cat['id']) ? 'bg-[#2D2D2D] text-white shadow-xs' : 'bg-[#F9F5F6] text-[#666666] border border-[#E8E0E3] hover:bg-[#FCE4EC]'"
                    class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer min-h-[40px]"
                >
                    {{ $cat['label'] }}
                </button>
            @endforeach
        </div>

        {{-- Rotations Grid --}}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <template x-for="item in filteredRotations" :key="item.id">
                <div class="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1 duration-200">
                    <div>
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <div class="p-3.5 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                                <i :data-lucide="item.icon" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2D2D2D] bg-[#E0E0E0] px-3 py-1 rounded-full" x-text="item.category"></span>
                        </div>

                        <h3 class="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] mb-1" x-text="item.role"></h3>
                        <h4 class="text-xs font-semibold text-[#666666] mb-3" x-text="item.institution"></h4>

                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8E8E] mb-4 pb-3 border-b border-[#E8E0E3]">
                            <span class="flex items-center gap-1.5 font-mono">
                                <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                                <span x-text="item.period"></span>
                            </span>
                            <span class="flex items-center gap-1.5 font-mono">
                                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                                <span x-text="item.location"></span>
                            </span>
                        </div>

                        <div class="flex flex-wrap gap-1.5 mb-5">
                            <template x-for="(b, bi) in item.badges" :key="bi">
                                <span class="px-3 py-1 rounded-full bg-white text-[#2D2D2D] text-[10px] font-medium border border-[#E8E0E3]" x-text="b"></span>
                            </template>
                        </div>

                        <ul class="space-y-2.5 text-xs text-[#4A4A4A] mb-6">
                            <template x-for="(ach, ai) in item.achievements" :key="ai">
                                <li class="flex items-start gap-2 leading-relaxed">
                                    <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-[#2D2D2D] shrink-0 mt-0.5"></i>
                                    <span x-text="ach"></span>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <div class="pt-4 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span class="text-[10px] text-[#8E8E8E] font-mono uppercase tracking-wider">Pencapaian Kunci:</span>
                        <span class="text-xs font-bold font-mono text-[#2D2D2D] bg-[#FCE4EC] px-3 py-1 rounded-full border border-[#F8BBD0] self-start sm:self-auto" x-text="item.highlightMetric"></span>
                    </div>
                </div>
            </template>
        </div>

    </div>

</section>
