@props(['name', 'items' => []])

<div x-data="{ items: @js(array_values($items ?? [])) }">
    <div class="flex items-center justify-between mb-2">
        <span class="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">Sertifikat & Kredensial</span>
        <button type="button" @click="items.push({ name: '', issuer: '', year: '' })" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah
        </button>
    </div>
    <div class="space-y-2">
        <template x-for="(item, index) in items" :key="index">
            <div class="grid grid-cols-[2fr_2fr_1fr_auto] gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                <input type="text" placeholder="Nama sertifikat" :name="`{{ $name }}[${index}][name]`" x-model="item.name" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]">
                <input type="text" placeholder="Penerbit" :name="`{{ $name }}[${index}][issuer]`" x-model="item.issuer" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]">
                <input type="text" placeholder="Tahun" :name="`{{ $name }}[${index}][year]`" x-model="item.year" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]">
                <button type="button" @click="items.splice(index, 1)" aria-label="Hapus sertifikat" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </template>
    </div>
</div>
