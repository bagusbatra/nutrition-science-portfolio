@props(['name', 'label', 'items' => [], 'placeholder' => ''])

<div x-data="{ items: @js(array_values($items ?? [])) }">
    <div class="flex items-center justify-between mb-2">
        <label class="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
            {{ $label }}
        </label>
        <button type="button" @click="items.push('')" class="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Tambah
        </button>
    </div>
    <div class="space-y-2">
        <template x-for="(item, index) in items" :key="index">
            <div class="flex gap-2 items-start">
                <textarea
                    :name="`{{ $name }}[${index}]`"
                    x-model="items[index]"
                    placeholder="{{ $placeholder }}"
                    rows="1"
                    class="flex-1 bg-white border border-[#E8E0E3] rounded-lg px-3 py-2 text-xs resize-y focus:outline-none focus:border-[#2D2D2D]"
                ></textarea>
                <button type="button" @click="items.splice(index, 1)" aria-label="Hapus item" class="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </template>
    </div>
</div>
