<button
    id="guestbook-fab-btn"
    @click="guestbookOpen = true"
    aria-label="Buka Buku Tamu & Dukungan Sidang"
    class="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 w-14 h-14 rounded-full bg-[#2D2D2D] text-white shadow-lg border border-[#2D2D2D] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
>
    <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8BBD0] opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F8BBD0] border-2 border-[#2D2D2D]"></span>
    </span>
    <i data-lucide="message-square-heart" class="w-6 h-6"></i>
</button>
