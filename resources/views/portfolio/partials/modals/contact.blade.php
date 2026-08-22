<div
    x-show="contactOpen"
    x-cloak
    x-transition:enter="transition-opacity duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
    @click.self="contactOpen = false"
    x-data="{
        senderName: '',
        senderOrg: '',
        senderEmail: '',
        inquiryType: 'Peluang Kerja / Magang Klinis RS',
        message: '',
        isSent: false,
        isSubmitting: false,
        async submitForm() {
            if (this.isSubmitting) return;
            this.isSubmitting = true;
            try {
                await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        senderName: this.senderName,
                        senderOrg: this.senderOrg,
                        senderEmail: this.senderEmail,
                        inquiryType: this.inquiryType,
                        message: this.message
                    })
                });
            } catch (err) {
                console.error('Failed to submit contact message', err);
            } finally {
                this.isSubmitting = false;
            }
            this.isSent = true;
            setTimeout(() => {
                this.isSent = false;
                this.senderName = '';
                this.senderOrg = '';
                this.senderEmail = '';
                this.message = '';
                contactOpen = false;
            }, 2800);
        },
        whatsappDirect() {
            const waText = encodeURIComponent(
                `Halo {{ $personalInfo->name }}, saya tertarik mendiskusikan peluang kolaborasi/internship gizi (${this.inquiryType}). Mohon info jadwal ketersediaan Anda. Terima kasih!`
            );
            window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
        }
    }"
>
    <div
        x-show="contactOpen"
        x-transition:enter="transition duration-200"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        class="bg-white rounded-[32px] max-w-lg w-full p-7 sm:p-9 border border-[#E8E0E3] shadow-2xl relative"
    >
        {{-- Header --}}
        <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6">
            <div>
                <span class="text-[10px] font-mono text-[#2D2D2D] uppercase font-bold tracking-wider block bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0] mb-1">
                    Direct Communication Channel
                </span>
                <h3 class="font-serif text-2xl font-bold text-[#2D2D2D]">
                    Hubungi {{ $personalInfo->name }}
                </h3>
            </div>
            <button
                id="contact-modal-close-x"
                @click="contactOpen = false"
                class="w-9 h-9 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors"
            >
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>

        <div x-show="isSent" x-transition class="py-10 text-center space-y-3">
            <div class="w-16 h-16 bg-[#FCE4EC] text-[#2D2D2D] rounded-full flex items-center justify-center mx-auto border border-[#F8BBD0]">
                <i data-lucide="check" class="w-8 h-8"></i>
            </div>
            <h4 class="font-serif text-xl font-bold text-[#2D2D2D]">Pesan Berhasil Terkirim!</h4>
            <p class="text-xs text-[#666666] max-w-xs mx-auto leading-relaxed">
                Terima kasih telah menghubungi. {{ $personalInfo->name }} akan segera merespons melalui email/WhatsApp Anda.
            </p>
        </div>

        <form x-show="!isSent" @submit.prevent="submitForm()" class="space-y-4 text-xs">
            <div>
                <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Nama Lengkap & Gelar</label>
                <input
                    id="contact-form-name"
                    type="text"
                    required
                    placeholder="Contoh: dr. Maya / HRD RS Hermina"
                    x-model="senderName"
                    class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                >
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Institusi / RS</label>
                    <input
                        id="contact-form-org"
                        type="text"
                        placeholder="Instalasi Gizi / RS"
                        x-model="senderOrg"
                        class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                    >
                </div>

                <div>
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Alamat Email</label>
                    <input
                        id="contact-form-email"
                        type="email"
                        required
                        placeholder="nama@email.com"
                        x-model="senderEmail"
                        class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                    >
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Tujuan Pesan</label>
                <select
                    id="contact-form-type"
                    x-model="inquiryType"
                    class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                >
                    <option value="Peluang Kerja / Magang Klinis RS">Tawaran Peluang Kerja / Magang Klinis RS</option>
                    <option value="Riset Formulasi Pangan">Kolaborasi Riset Pangan Fungsional & Lab</option>
                    <option value="Narasumber Edukasi Gizi">Undangan Pembicara / Edukator Gizi</option>
                    <option value="Konsultasi Diet Pribadi">Konsultasi Pola Makan & Asuhan Gizi</option>
                    <option value="Diskusi Akademik">Diskusi Ilmiah Skripsi</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Rincian Pesan</label>
                <textarea
                    id="contact-form-message"
                    required
                    rows="3"
                    placeholder="Tuliskan detail undangan, kualifikasi yang dibutuhkan, atau pertanyaan Anda..."
                    x-model="message"
                    class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors resize-none"
                ></textarea>
            </div>

            <div class="pt-3 flex flex-col sm:flex-row gap-2.5">
                <button
                    type="submit"
                    id="contact-form-submit-btn"
                    class="flex-1 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Kirim Pesan</span>
                </button>

                <button
                    type="button"
                    id="contact-form-wa-btn"
                    @click="whatsappDirect()"
                    class="py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#FCE4EC] hover:bg-[#F8BBD0] border border-[#F8BBD0] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    <i data-lucide="message-circle" class="w-3.5 h-3.5 text-[#2D2D2D]"></i>
                    <span>WhatsApp</span>
                </button>
            </div>
        </form>
    </div>
</div>
