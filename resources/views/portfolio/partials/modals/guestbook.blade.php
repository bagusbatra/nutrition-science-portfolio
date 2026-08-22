@php
    $initialGuestbookEntries = $guestbookEntries->map(fn($e) => [
        'id' => $e->id,
        'name' => $e->name,
        'role' => $e->role,
        'message' => $e->message,
        'emoji' => $e->emoji,
        'timestamp' => $e->created_at->translatedFormat('j F Y'),
    ])->values();
@endphp

<div
    x-show="guestbookOpen"
    x-cloak
    x-transition:enter="transition-opacity duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
    @click.self="guestbookOpen = false"
    x-data="{
        entries: @js($initialGuestbookEntries),
        name: '',
        role: 'Rekan / Pengunjung',
        message: '',
        selectedEmoji: '🌸',
        submitted: false,
        isSubmitting: false,
        emojiOptions: ['🌸', '🩺', '✨', '🥗', '🎓', '💪', '💖', '🌿'],
        async submitEntry() {
            if (!this.name.trim() || !this.message.trim() || this.isSubmitting) return;
            this.isSubmitting = true;
            try {
                const res = await fetch('/guestbook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name.trim(),
                        role: this.role.trim(),
                        message: this.message.trim(),
                        emoji: this.selectedEmoji
                    })
                });
                const saved = await res.json();

                this.entries.unshift({
                    id: saved.id,
                    name: saved.name,
                    role: saved.role,
                    message: saved.message,
                    emoji: saved.emoji,
                    timestamp: new Date(saved.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                });

                this.name = '';
                this.message = '';
                this.submitted = true;

                confetti({
                    particleCount: 70,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors: ['#A73E5B', '#FAD2E1', '#E098AA', '#FFF0F3']
                });

                setTimeout(() => this.submitted = false, 3500);
            } catch (err) {
                console.error('Failed to submit guestbook entry', err);
            } finally {
                this.isSubmitting = false;
            }
        }
    }"
>
    <div
        x-show="guestbookOpen"
        x-transition:enter="transition duration-200"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        class="bg-[#F9F5F6] rounded-[32px] max-w-5xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 border border-[#E8E0E3] shadow-2xl relative"
    >
        {{-- Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="message-square-heart" class="w-3.5 h-3.5"></i>
                    <span>Community Support & Thesis Defense Wall</span>
                </div>
                <h2 class="text-3xl sm:text-4xl font-serif text-[#2D2D2D] tracking-tight">
                    Buku Tamu & <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Dukungan Sidang</span>
                </h2>
                <p class="text-sm text-[#666666] mt-3 max-w-2xl font-light">
                    Tinggalkan pesan semangat, masukan ilmiah, atau ucapan selamat untuk Nadhira menjelang ujian sidang sarjana gizi.
                </p>
            </div>

            <div class="flex items-center gap-3 shrink-0">
                <span class="font-mono bg-white px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
                    <span x-text="entries.length"></span> Pesan Tersimpan
                </span>
                <button
                    id="guestbook-modal-close-x"
                    @click="guestbookOpen = false"
                    class="w-9 h-9 rounded-full bg-white hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors shrink-0"
                >
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        </div>

        {{-- 2-Column Grid: Submission Form vs Live Message Board --}}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {{-- Left Column: Form --}}
            <div class="lg:col-span-5 bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-8 shadow-sm">
                <h3 class="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] mb-1">
                    Kirim Pesan & Doa Semangat
                </h3>
                <p class="text-xs text-[#666666] mb-6">
                    Pesan Anda akan langsung disematkan pada papan portofolio ini.
                </p>

                <div x-show="submitted" x-transition class="mb-5 p-4 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs flex items-center gap-2">
                    <i data-lucide="check" class="w-4 h-4 text-[#2D2D2D] shrink-0"></i>
                    <span class="font-medium">Terima kasih! Pesan hangat Anda telah berhasil disematkan. ✨</span>
                </div>

                <form @submit.prevent="submitEntry()" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Nama Lengkap</label>
                        <input
                            id="guestbook-input-name"
                            type="text"
                            required
                            placeholder="Contoh: Tiara / Dr. Budi / Rekan Magang"
                            x-model="name"
                            class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                        >
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Peran / Hubungan</label>
                        <select
                            id="guestbook-select-role"
                            x-model="role"
                            class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                        >
                            <option value="Rekan / Pengunjung">Pengunjung Web / HR Recruiter</option>
                            <option value="Teman Angkatan Gizi UI">Teman Seperjuangan Gizi UI</option>
                            <option value="Dosen / Penguji / Mentor">Dosen / Preseptor RS</option>
                            <option value="Keluarga & Sahabat">Keluarga & Sahabat</option>
                            <option value="Junior / Mahasiswa Gizi">Junior Mahasiswa Gizi</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Pilih Icon Emoji</label>
                        <div class="flex flex-wrap gap-2">
                            <template x-for="em in emojiOptions" :key="em">
                                <button
                                    type="button"
                                    @click="selectedEmoji = em"
                                    :class="selectedEmoji === em ? 'bg-[#FCE4EC] border-2 border-[#2D2D2D] scale-105 shadow-xs' : 'bg-[#F9F5F6] border border-[#E8E0E3] hover:bg-[#FCE4EC]'"
                                    class="w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer"
                                    x-text="em"
                                ></button>
                            </template>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Isi Pesan Semangat</label>
                        <textarea
                            id="guestbook-input-message"
                            required
                            rows="3"
                            placeholder="Tuliskan ucapan semangat untuk sidang skripsi atau kesan terhadap portofolio Nadhira..."
                            x-model="message"
                            class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        id="guestbook-submit-btn"
                        class="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
                    >
                        <i data-lucide="send" class="w-3.5 h-3.5"></i>
                        <span>Kirim Dukungan</span>
                    </button>
                </form>
            </div>

            {{-- Right Column: Live Message Cards --}}
            <div class="lg:col-span-7 space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
                <template x-for="entry in entries" :key="entry.id">
                    <div class="p-4 sm:p-5 bg-white rounded-[28px] border border-[#E8E0E3] shadow-xs flex items-start gap-3.5 sm:gap-4">
                        <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-lg sm:text-xl shrink-0" x-text="entry.emoji || '🌸'"></div>

                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between mb-1 gap-2">
                                <h4 class="font-serif font-bold text-sm sm:text-base text-[#2D2D2D] truncate" x-text="entry.name"></h4>
                                <span class="text-[10px] text-[#8E8E8E] font-mono shrink-0" x-text="entry.timestamp"></span>
                            </div>

                            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2 truncate max-w-full" x-text="entry.role"></span>

                            <p class="text-xs text-[#4A4A4A] leading-relaxed italic">
                                "<span x-text="entry.message"></span>"
                            </p>
                        </div>
                    </div>
                </template>
            </div>

        </div>
    </div>
</div>
