@props(['name', 'label', 'items' => []])

<div x-data="{ items: @js(array_values($items ?? [])) }">
    <div class="flex items-center justify-between mb-2">
        <span class="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">{{ $label }}</span>
        <button type="button" @click="items.push({ name: '', level: '', desc: '' })" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah
        </button>
    </div>
    <div class="space-y-2">
        <template x-for="(item, index) in items" :key="index">
            <div class="bg-white border border-[#E8E0E3] rounded-xl p-3 space-y-2">
                <div class="grid grid-cols-[2fr_1fr_auto] gap-2 items-center">
                    <input type="text" placeholder="Nama keahlian" :name="`{{ $name }}[${index}][name]`" x-model="item.name" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]">
                    <input type="text" placeholder="Level (mis. Mahir)" :name="`{{ $name }}[${index}][level]`" x-model="item.level" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]">
                    <button type="button" @click="items.splice(index, 1)" aria-label="Hapus keahlian" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
                <textarea placeholder="Deskripsi singkat" rows="2" :name="`{{ $name }}[${index}][desc]`" x-model="item.desc" class="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs resize-none focus:outline-none focus:border-[#2D2D2D]"></textarea>
            </div>
        </template>
    </div>
</div>
