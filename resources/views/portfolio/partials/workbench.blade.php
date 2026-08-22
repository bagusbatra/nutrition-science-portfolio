<section
    id="workbench"
    x-data="{
        gender: 'female',
        age: 24,
        weight: 55,
        height: 160,
        formula: 'mifflin',
        activityFactor: 1.3,
        stressFactor: 1.0,
        carbsPct: 60,
        proteinPct: 15,
        fatPct: 25,
        selectedDietPreset: 'balanced',
        dietPresets: [
            {
                id: 'balanced',
                name: 'Gizi Seimbang (Isi Piringku)',
                carbs: 60,
                protein: 15,
                fat: 25,
                desc: 'Standar Kemenkes RI untuk pemeliharaan status gizi normal masyarakat dewasa sehat.',
                tips: '1/3 Piring Makanan Pokok, 1/3 Piring Sayuran, 1/6 Piring Lauk Pauk, 1/6 Piring Buah-buahan.'
            },
            {
                id: 'dm',
                name: 'Diet Diabetes Melitus (3J)',
                carbs: 55,
                protein: 20,
                fat: 25,
                desc: 'Membatasi karbohidrat sederhana, mengutamakan serat larut air & indeks glikemik rendah.',
                tips: 'Tepat Jadwal (3x makan utama, 3x selingan), Tepat Jumlah (porsi terhitung), Tepat Jenis (rendah sukrosa).'
            },
            {
                id: 'ckd',
                name: 'Diet Rendah Protein (Ginjal Non-Dialisis)',
                carbs: 65,
                protein: 10,
                fat: 25,
                desc: 'Mengurangi beban metabolik urea ginjal (0.6 - 0.8 g/kgBB) dengan 65% protein bernilai biologi tinggi.',
                tips: 'Batasi kacang-kacangan berlebih, utamakan putih telur dan ikan air tawar, kontrol natrium & kalium.'
            },
            {
                id: 'tetp',
                name: 'Diet TETP (Tinggi Energi Tinggi Protein)',
                carbs: 55,
                protein: 25,
                fat: 20,
                desc: 'Untuk kondisi katabolik berat, pemulihan pasca operasi mayor, luka bakar, dan KEK.',
                tips: 'Suplementasi ekstra putih telur (2-4 butir/hari), ekstrak albumin ikan gabus, dan susu polimerik.'
            }
        ],
        get heightInMeters() { return this.height / 100; },
        get imt() { return +(this.weight / (this.heightInMeters * this.heightInMeters)).toFixed(1); },
        get bbi() {
            let bbi = (this.height - 100) - (0.1 * (this.height - 100));
            if (this.gender === 'male' && this.height < 160) {
                bbi = this.height - 100;
            } else if (this.gender === 'female' && this.height < 150) {
                bbi = this.height - 100;
            }
            return +bbi.toFixed(1);
        },
        get imtCategory() {
            const imt = this.imt;
            if (imt < 17.0) return { label: 'Kurus (Kekurangan BB Tingkat Berat)' };
            if (imt >= 17.0 && imt < 18.5) return { label: 'Kurus (Kekurangan BB Tingkat Ringan)' };
            if (imt >= 18.5 && imt <= 25.0) return { label: 'Normal / Ideal' };
            if (imt > 25.0 && imt <= 27.0) return { label: 'Gemuk (Kelebihan BB Tingkat Ringan)' };
            return { label: 'Obesitas (Kelebihan BB Tingkat Berat)' };
        },
        get bmr() {
            if (this.formula === 'mifflin') {
                const s = this.gender === 'male' ? 5 : -161;
                return Math.round((10 * this.weight) + (6.25 * this.height) - (5 * this.age) + s);
            }
            if (this.gender === 'male') {
                return Math.round(66.5 + (13.75 * this.weight) + (5.003 * this.height) - (6.75 * this.age));
            }
            return Math.round(655.1 + (9.563 * this.weight) + (1.850 * this.height) - (4.676 * this.age));
        },
        get tee() { return Math.round(this.bmr * this.activityFactor * this.stressFactor); },
        get carbsGrams() { return Math.round((this.tee * (this.carbsPct / 100)) / 4); },
        get proteinGrams() { return Math.round((this.tee * (this.proteinPct / 100)) / 4); },
        get fatGrams() { return Math.round((this.tee * (this.fatPct / 100)) / 9); },
        get proteinPerKg() { return +(this.proteinGrams / this.weight).toFixed(2); },
        get fluidRequirement() { return Math.round(this.weight * 30); },
        get currentPreset() { return this.dietPresets.find(p => p.id === this.selectedDietPreset); },
        reset() {
            this.gender = 'female';
            this.age = 24;
            this.weight = 55;
            this.height = 160;
            this.activityFactor = 1.3;
            this.stressFactor = 1.0;
            this.carbsPct = 60;
            this.proteinPct = 15;
            this.fatPct = 25;
        },
        celebrate() {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#F8BBD0', '#2D2D2D', '#FCE4EC', '#E0E0E0']
            });
        },
        applyPreset(p) {
            this.selectedDietPreset = p.id;
            this.carbsPct = p.carbs;
            this.proteinPct = p.protein;
            this.fatPct = p.fat;
        }
    }"
    class="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden"
>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">

        {{-- Section Header --}}
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                    <i data-lucide="heart-pulse" class="w-3.5 h-3.5"></i>
                    <span>Clinical Nutrition Tools & Expert Calculator</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
                    Meja Kerja <span class="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Dietisien Interaktif</span>
                </h2>
                <p class="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
                    Kalkulator presisi kebutuhan energi & makronutrien klinis berbasis formula baku Mifflin-St Jeor & Harris-Benedict, lengkap dengan penyesuaian faktor stres dan rekomendasi dietetik.
                </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
                <button
                    id="workbench-reset-btn"
                    @click="reset()"
                    class="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#666666] border border-[#E8E0E3] hover:bg-[#F9F5F6] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                    <span>Reset</span>
                </button>
                <button
                    id="workbench-celebrate-btn"
                    @click="celebrate()"
                    class="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
                >
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>Verifikasi Resep</span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {{-- Left Column: Input Form --}}
            <div class="lg:col-span-6 bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm">

                <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6">
                    <h3 class="text-base font-serif italic font-bold text-[#2D2D2D] flex items-center gap-2">
                        <i data-lucide="calculator" class="w-4 h-4 text-[#2D2D2D]"></i>
                        <span>1. Data Pasien & Parameter Antropometri</span>
                    </h3>
                    <span class="text-[10px] uppercase tracking-wider font-mono text-[#2D2D2D] bg-[#E0E0E0] px-2.5 py-0.5 rounded-full font-bold">
                        Input
                    </span>
                </div>

                {{-- Gender --}}
                <div class="mb-5">
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-2 uppercase tracking-wider text-[10px] font-mono">Jenis Kelamin Pasien</label>
                    <div class="grid grid-cols-2 gap-3">
                        <button
                            id="calc-gender-female"
                            @click="gender = 'female'"
                            :class="gender === 'female' ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] shadow-xs' : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/50'"
                            class="py-3 px-4 rounded-2xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                        >
                            <span>👩 Perempuan</span>
                        </button>
                        <button
                            id="calc-gender-male"
                            @click="gender = 'male'"
                            :class="gender === 'male' ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] shadow-xs' : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/50'"
                            class="py-3 px-4 rounded-2xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                        >
                            <span>👨 Laki-Laki</span>
                        </button>
                    </div>
                </div>

                {{-- Numeric Inputs --}}
                <div class="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">Usia (Thn)</label>
                        <input
                            id="calc-input-age"
                            type="number"
                            min="1"
                            max="120"
                            x-model.number="age"
                            class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                        >
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">BB (kg)</label>
                        <input
                            id="calc-input-weight"
                            type="number"
                            min="20"
                            max="300"
                            step="0.5"
                            x-model.number="weight"
                            class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                        >
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">TB (cm)</label>
                        <input
                            id="calc-input-height"
                            type="number"
                            min="50"
                            max="250"
                            x-model.number="height"
                            class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                        >
                    </div>
                </div>

                {{-- Formula Chooser --}}
                <div class="mb-5">
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">Formula Perhitungan BMR / REE</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button
                            id="calc-formula-mifflin"
                            @click="formula = 'mifflin'"
                            :class="formula === 'mifflin' ? 'bg-white border-[#2D2D2D] shadow-xs text-[#2D2D2D]' : 'bg-white/70 border-[#E8E0E3] text-[#666666]'"
                            class="p-3 rounded-2xl text-left border text-xs cursor-pointer transition-all"
                        >
                            <span class="font-bold block">Mifflin-St Jeor</span>
                            <span class="text-[10px] text-[#8E8E8E] block mt-0.5 font-mono">Gold Standard AND</span>
                        </button>

                        <button
                            id="calc-formula-harris"
                            @click="formula = 'harris'"
                            :class="formula === 'harris' ? 'bg-white border-[#2D2D2D] shadow-xs text-[#2D2D2D]' : 'bg-white/70 border-[#E8E0E3] text-[#666666]'"
                            class="p-3 rounded-2xl text-left border text-xs cursor-pointer transition-all"
                        >
                            <span class="font-bold block">Harris-Benedict</span>
                            <span class="text-[10px] text-[#8E8E8E] block mt-0.5 font-mono">Formula Klasik</span>
                        </button>
                    </div>
                </div>

                {{-- Activity Factor --}}
                <div class="mb-5">
                    <div class="flex justify-between text-xs font-semibold text-[#2D2D2D] mb-1.5">
                        <span class="uppercase tracking-wider text-[10px] font-mono">Faktor Aktivitas Fisik (AF)</span>
                        <span class="font-mono text-[#2D2D2D] font-bold" x-text="activityFactor + 'x'"></span>
                    </div>
                    <select
                        id="calc-activity-select"
                        x-model.number="activityFactor"
                        class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                    >
                        <option value="1.2">Tirah Baring / Bedrest (1.20)</option>
                        <option value="1.3">Ringan / Sedentary (Duduk, Mahasiswa, Kantor) (1.30)</option>
                        <option value="1.55">Sedang (Jalan Kaki, Olahraga 3-5x/minggu) (1.55)</option>
                        <option value="1.75">Berat / Atletik (Kerja Fisik Keras) (1.75)</option>
                    </select>
                </div>

                {{-- Stress Factor --}}
                <div class="mb-6">
                    <div class="flex justify-between text-xs font-semibold text-[#2D2D2D] mb-1.5">
                        <span class="uppercase tracking-wider text-[10px] font-mono">Faktor Stres Klinis (Injury Factor)</span>
                        <span class="font-mono text-[#2D2D2D] font-bold" x-text="stressFactor + 'x'"></span>
                    </div>
                    <select
                        id="calc-stress-select"
                        x-model.number="stressFactor"
                        class="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                    >
                        <option value="1.0">Tanpa Stres Metabolik / Kondisi Sehat (1.00)</option>
                        <option value="1.1">Pasca Bedah Minor / Elektif (1.10)</option>
                        <option value="1.2">Infeksi Sedang / Fraktur Tulang (1.20)</option>
                        <option value="1.3">Pasca Bedah Mayor / Kanker (1.30)</option>
                        <option value="1.5">Sepsis Berat / Politrauma / Luka Bakar (1.50)</option>
                    </select>
                </div>

                {{-- Diet Presets --}}
                <div>
                    <label class="block text-xs font-semibold text-[#2D2D2D] mb-2 uppercase tracking-wider text-[10px] font-mono">Preset Pola Diet Klinis:</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <template x-for="preset in dietPresets" :key="preset.id">
                            <button
                                @click="applyPreset(preset)"
                                :class="selectedDietPreset === preset.id ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] font-semibold' : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/40'"
                                class="p-2.5 rounded-xl text-left text-xs border transition-all cursor-pointer"
                            >
                                <span class="block truncate font-medium" x-text="preset.name"></span>
                                <span class="text-[10px] text-[#8E8E8E] block font-mono mt-0.5">
                                    KH <span x-text="preset.carbs"></span>% &bull; P <span x-text="preset.protein"></span>% &bull; L <span x-text="preset.fat"></span>%
                                </span>
                            </button>
                        </template>
                    </div>
                </div>

            </div>

            {{-- Right Column: Calculated Nutrition Prescription --}}
            <div class="lg:col-span-6 space-y-6">

                <div class="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm">
                    <div class="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-5">
                        <h3 class="text-base font-serif italic font-bold text-[#2D2D2D] flex items-center gap-2">
                            <i data-lucide="flame" class="w-4 h-4 text-[#2D2D2D]"></i>
                            <span>2. Resep Kebutuhan Energi & Status Gizi</span>
                        </h3>
                        <span class="text-xs font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full border border-[#F8BBD0]">
                            PAGT Standard Output
                        </span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-center">
                        <div class="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                            <span class="text-[11px] text-[#8E8E8E] block uppercase tracking-wider font-medium font-mono">BMR / REE</span>
                            <strong class="text-2xl font-serif italic text-[#2D2D2D]" x-text="bmr"></strong>
                            <span class="text-[10px] text-[#8E8E8E] block font-mono">kkal / 24 jam</span>
                        </div>

                        <div class="p-4 bg-[#FCE4EC] rounded-2xl border border-white shadow-xs">
                            <span class="text-[11px] text-[#2D2D2D] block uppercase tracking-wider font-semibold font-mono">Total Energi</span>
                            <strong class="text-3xl font-serif italic text-[#2D2D2D] font-bold" x-text="tee"></strong>
                            <span class="text-[10px] text-[#2D2D2D] block font-mono font-medium">kkal / hari</span>
                        </div>

                        <div class="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                            <span class="text-[11px] text-[#8E8E8E] block uppercase tracking-wider font-medium font-mono">Berat Ideal</span>
                            <strong class="text-2xl font-serif italic text-[#2D2D2D]" x-text="bbi"></strong>
                            <span class="text-[10px] text-[#8E8E8E] block font-mono">kg (BBI)</span>
                        </div>
                    </div>

                    {{-- IMT Status Banner --}}
                    <div class="p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 bg-[#F9F5F6] border-[#E8E0E3] text-[#2D2D2D]">
                        <div class="flex items-center gap-2">
                            <i data-lucide="activity" class="w-4 h-4 shrink-0 text-[#2D2D2D]"></i>
                            <div>
                                <span class="font-semibold block font-mono">IMT: <span x-text="imt"></span> kg/m&sup2;</span>
                                <span class="text-[11px] text-[#666666]" x-text="imtCategory.label"></span>
                            </div>
                        </div>
                        <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-[#2D2D2D] text-white rounded-full self-start sm:self-auto" x-text="imt < 18.5 ? 'Defisit' : (imt <= 25 ? 'Normal' : 'Kelebihan')"></span>
                    </div>

                    {{-- Macronutrient Distribution --}}
                    <div>
                        <div class="flex items-center justify-between text-xs font-bold text-[#2D2D2D] mb-3">
                            <span>Distribusi Makronutrien Terhitung</span>
                            <span class="text-[11px] font-mono text-[#8E8E8E]">
                                Total <span x-text="carbsPct + proteinPct + fatPct"></span>%
                            </span>
                        </div>

                        <div class="space-y-3">
                            <div class="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="font-semibold text-[#2D2D2D]">🌾 Karbohidrat (<span x-text="carbsPct"></span>%)</span>
                                    <strong class="font-mono text-[#2D2D2D]"><span x-text="carbsGrams"></span> gram <span class="text-[11px] text-[#8E8E8E]">(<span x-text="Math.round(tee * (carbsPct/100))"></span> kkal)</span></strong>
                                </div>
                                <div class="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#2D2D2D] rounded-full transition-all duration-400" :style="`width: ${carbsPct}%`"></div>
                                </div>
                            </div>

                            <div class="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="font-semibold text-[#2D2D2D]">🍗 Protein (<span x-text="proteinPct"></span>%)</span>
                                    <strong class="font-mono text-[#2D2D2D]">
                                        <span x-text="proteinGrams"></span> gram <span class="text-[11px] text-[#8E8E8E]">(<span x-text="proteinPerKg"></span> g/kgBB)</span>
                                    </strong>
                                </div>
                                <div class="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#2D2D2D] rounded-full transition-all duration-400" :style="`width: ${proteinPct * 2}%`"></div>
                                </div>
                            </div>

                            <div class="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="font-semibold text-[#2D2D2D]">🥑 Lemak (<span x-text="fatPct"></span>%)</span>
                                    <strong class="font-mono text-[#2D2D2D]"><span x-text="fatGrams"></span> gram <span class="text-[11px] text-[#8E8E8E]">(<span x-text="Math.round(tee * (fatPct/100))"></span> kkal)</span></strong>
                                </div>
                                <div class="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#2D2D2D] rounded-full transition-all duration-400" :style="`width: ${fatPct * 1.5}%`"></div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-3 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#666666] gap-1">
                            <span>💧 Estimasi Kebutuhan Cairan (30 mL/kg):</span>
                            <strong class="font-mono text-[#2D2D2D]"><span x-text="fluidRequirement"></span> mL / hari (~<span x-text="Math.round(fluidRequirement/250)"></span> gelas)</strong>
                        </div>

                    </div>

                </div>

                {{-- Dietary Advice --}}
                <div class="bg-[#FCE4EC] rounded-[32px] border border-white p-5 sm:p-6 shadow-xs">
                    <h4 class="text-xs font-bold text-[#2D2D2D] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                        <i data-lucide="utensils" class="w-3.5 h-3.5"></i>
                        <span>Prinsip & Rekomendasi Menu Pasien</span>
                    </h4>
                    <p class="text-xs text-[#4A4A4A] leading-relaxed" x-text="currentPreset?.desc"></p>
                    <div class="mt-3 p-3 bg-white/80 rounded-2xl border border-white text-[11px] text-[#2D2D2D] italic">
                        💡 <strong>Tips Konseling:</strong> <span x-text="currentPreset?.tips"></span>
                    </div>
                </div>

            </div>

        </div>

    </div>

</section>
