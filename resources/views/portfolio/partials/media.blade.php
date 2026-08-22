@php
    $mediaData = $media->map(fn($m) => [
        'id' => $m->id,
        'title' => $m->title,
        'category' => $m->category,
        'targetAudience' => $m->target_audience,
        'description' => $m->description,
        'keyPoints' => $m->key_points,
        'thumbnailBg' => $m->thumbnail_bg,
        'accentColor' => $m->accent_color,
        'dimensions' => $m->dimensions,
    ])->values();
@endphp

<section
    id="media"
    x-data="{ mediaList: @js($mediaData), selectedId: null, get selectedMedia() { return this.mediaList.find(m => m.id === this.selectedId) || null; } }"
    class="py-16 sm:py-20 bg-[#F9F5F6] relative border-b border-[#E8E0E3] overflow-hidden"
>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="file-image" class="w-3.5 h-3.5"></i>
                    <span>Nutrition Communication & Education Leaflets</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Media Edukasi & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Desain Komunikasi Gizi</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Desain komunikasi visual kesehatan untuk advokasi gizi, materi konseling pasien rawat jalan, serta media edukasi pencegahan penyakit degeneratif.
                </p>
            </div>

            <div class="text-xs text-[#666666]">
                <span class="font-mono bg-white px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
                    KIE Berbasis Bukti Ilmiah
                </span>
            </div>
        </div>

        {{-- Media Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            @foreach($media as $med)
                <div
                    id="media-card-{{ $med->id }}"
                    class="bg-white rounded-[32px] border border-[#E8E0E3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1.5 duration-200"
                >
                    <div>
                        {{-- Visual Thumbnail Area --}}
                        <div class="h-40 sm:h-44 bg-gradient-to-br {{ $med->thumbnail_bg }} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden border-b border-[#E8E0E3]">
                            <div class="flex items-center justify-between">
                                <span class="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#2D2D2D] px-2.5 py-0.5 rounded-full border border-white">
                                    {{ $med->category }}
                                </span>
                                <span class="text-[10px] text-[#666666] font-mono font-medium bg-white/70 px-2.5 py-0.5 rounded-full">
                                    {{ $med->dimensions }}
                                </span>
                            </div>

                            <div class="text-center my-auto">
                                <i data-lucide="book-open" class="w-8 h-8 sm:w-9 sm:h-9 text-[#2D2D2D] mx-auto opacity-70 group-hover:scale-110 transition-transform"></i>
                            </div>

                            <div class="text-[10px] text-[#4A4A4A] font-medium truncate flex items-center gap-1.5 font-mono">
                                <i data-lucide="users" class="w-3 h-3 text-[#2D2D2D]"></i>
                                <span class="truncate">Target: {{ $med->target_audience }}</span>
                            </div>
                        </div>

                        {{-- Content Details --}}
                        <div class="p-5 sm:p-6">
                            <h3 class="font-serif text-base font-bold text-[#2D2D2D] mb-2 leading-snug">
                                {{ $med->title }}
                            </h3>
                            <p class="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-4">
                                {{ $med->description }}
                            </p>

                            <div class="space-y-1.5 mb-2">
                                @foreach(array_slice($med->key_points, 0, 2) as $kp)
                                    <div class="flex items-center gap-2 text-[11px] text-[#4A4A4A]">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#2D2D2D] shrink-0"></span>
                                        <span class="truncate">{{ $kp }}</span>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    {{-- Action Trigger --}}
                    <div class="p-5 sm:p-6 pt-0">
                        <button
                            id="media-view-btn-{{ $med->id }}"
                            @click="selectedId = {{ $med->id }}"
                            class="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[42px]"
                        >
                            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                            <span>Lihat Media</span>
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

    </div>

    {{-- Media Detail Modal --}}
    <div
        x-show="selectedMedia"
        x-cloak
        x-transition:enter="transition-opacity duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        @click.self="selectedId = null"
    >
        <div
            x-show="selectedMedia"
            x-transition:enter="transition duration-200"
            x-transition:enter-start="opacity-0 scale-95 translate-y-4"
            x-transition:enter-end="opacity-100 scale-100 translate-y-0"
            class="bg-white rounded-[32px] max-w-xl w-full p-6 sm:p-8 border border-[#E8E0E3] shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
            <template x-if="selectedMedia">
                <div>
                    <div class="flex items-start justify-between pb-4 border-b border-[#E8E0E3] mb-5 gap-3">
                        <div>
                            <span class="font-mono text-[10px] text-[#2D2D2D] font-bold uppercase tracking-wider block bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0] mb-1">
                                <span x-text="selectedMedia.category"></span> &bull; <span x-text="selectedMedia.dimensions"></span>
                            </span>
                            <h3 class="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D]" x-text="selectedMedia.title"></h3>
                        </div>
                        <button
                            id="close-media-modal-btn"
                            @click="selectedId = null"
                            class="w-9 h-9 shrink-0 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center text-sm font-bold cursor-pointer transition-colors border border-[#E8E0E3]"
                        >
                            ✕
                        </button>
                    </div>

                    {{-- Media Graphic Frame --}}
                    <div class="p-6 sm:p-7 rounded-2xl border border-[#E8E0E3] mb-5 text-center bg-gradient-to-br" :class="selectedMedia.thumbnailBg">
                        <div class="max-w-xs mx-auto">
                            <div class="p-4 bg-white/95 backdrop-blur-xs rounded-2xl shadow-xs border border-white">
                                <span class="text-sm font-serif font-bold text-[#2D2D2D] block mb-1" x-text="selectedMedia.title"></span>
                                <p class="text-[11px] text-[#666666] italic">
                                    "Disusun sesuai pedoman gizi klinis Kemenkes RI dan referensi ADA/AND."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4 text-xs text-[#4A4A4A]">
                        <div>
                            <span class="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">🎯 Sasaran Edukasi:</span>
                            <p class="p-3 bg-[#F9F5F6] rounded-xl border border-[#E8E0E3] text-[#4A4A4A]" x-text="selectedMedia.targetAudience"></p>
                        </div>

                        <div>
                            <span class="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">📖 Deskripsi Konten & Urgensi:</span>
                            <p class="leading-relaxed text-[#666666]" x-text="selectedMedia.description"></p>
                        </div>

                        <div>
                            <span class="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">💡 Poin Kunci Edukasi (Key Messages):</span>
                            <ul class="space-y-2">
                                <template x-for="(kp, idx) in selectedMedia.keyPoints" :key="idx">
                                    <li class="flex items-center gap-2">
                                        <i data-lucide="check" class="w-3.5 h-3.5 text-[#2D2D2D] shrink-0"></i>
                                        <span x-text="kp"></span>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span class="text-[11px] font-mono text-[#8E8E8E]">Format: PDF / High-Res PNG</span>
                        <button
                            id="media-modal-close-action"
                            @click="selectedId = null"
                            class="px-6 py-2.5 rounded-full bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer min-h-[40px]"
                        >
                            Tutup Preview
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>

</section>
