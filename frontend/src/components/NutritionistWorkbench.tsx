import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HeartPulse, 
  Calculator, 
  Flame, 
  Activity, 
  PieChart as PieIcon, 
  Utensils, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const NutritionistWorkbench: React.FC = () => {
  // Calculator States
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number>(24);
  const [weight, setWeight] = useState<number>(55);
  const [height, setHeight] = useState<number>(160);
  const [formula, setFormula] = useState<'mifflin' | 'harris'>('mifflin');
  const [activityFactor, setActivityFactor] = useState<number>(1.3); // Sedentary/Ringan
  const [stressFactor, setStressFactor] = useState<number>(1.0); // Sehat
  
  // Custom Macro Distribution (Percentages)
  const [carbsPct, setCarbsPct] = useState<number>(60);
  const [proteinPct, setProteinPct] = useState<number>(15);
  const [fatPct, setFatPct] = useState<number>(25);

  // Active Diet Preset Filter
  const [selectedDietPreset, setSelectedDietPreset] = useState<string>('balanced');

  // Calculations
  const heightInMeters = height / 100;
  const imt = +(weight / (heightInMeters * heightInMeters)).toFixed(1);

  // BBI Brocca
  let bbi = (height - 100) - (0.1 * (height - 100));
  if (gender === 'male' && height < 160) {
    bbi = height - 100;
  } else if (gender === 'female' && height < 150) {
    bbi = height - 100;
  }
  bbi = +bbi.toFixed(1);

  // IMT Classification (Kemenkes RI / WHO Asia-Pasifik)
  let imtCategory = { label: 'Normal / Gizi Baik', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (imt < 17.0) {
    imtCategory = { label: 'Kurus (Kekurangan BB Tingkat Berat)', color: 'text-red-700 bg-red-50 border-red-200' };
  } else if (imt >= 17.0 && imt < 18.5) {
    imtCategory = { label: 'Kurus (Kekurangan BB Tingkat Ringan)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  } else if (imt >= 18.5 && imt <= 25.0) {
    imtCategory = { label: 'Normal / Ideal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  } else if (imt > 25.0 && imt <= 27.0) {
    imtCategory = { label: 'Gemuk (Kelebihan BB Tingkat Ringan)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  } else {
    imtCategory = { label: 'Obesitas (Kelebihan BB Tingkat Berat)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  }

  // BMR Calculation
  let bmr = 0;
  if (formula === 'mifflin') {
    // Mifflin - St Jeor: (10 * BB) + (6.25 * TB) - (5 * Usia) + s (+5 pria, -161 wanita)
    const s = gender === 'male' ? 5 : -161;
    bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + s);
  } else {
    // Harris-Benedict (Revised)
    if (gender === 'male') {
      bmr = Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age));
    } else {
      bmr = Math.round(655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age));
    }
  }

  // Total Energy Expenditure (TEE)
  const tee = Math.round(bmr * activityFactor * stressFactor);

  // Macro Grams
  const carbsGrams = Math.round((tee * (carbsPct / 100)) / 4);
  const proteinGrams = Math.round((tee * (proteinPct / 100)) / 4);
  const fatGrams = Math.round((tee * (fatPct / 100)) / 9);
  const proteinPerKg = +(proteinGrams / weight).toFixed(2);
  const fluidRequirement = Math.round(weight * 30); // 30 mL/kgBB

  // Reset to default
  const handleReset = () => {
    setGender('female');
    setAge(24);
    setWeight(55);
    setHeight(160);
    setActivityFactor(1.3);
    setStressFactor(1.0);
    setCarbsPct(60);
    setProteinPct(15);
    setFatPct(25);
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F8BBD0', '#2D2D2D', '#FCE4EC', '#E0E0E0']
    });
  };

  const dietPresets = [
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
  ];

  const applyPreset = (p: typeof dietPresets[0]) => {
    setSelectedDietPreset(p.id);
    setCarbsPct(p.carbs);
    setProteinPct(p.protein);
    setFatPct(p.fat);
  };

  return (
    <section id="workbench" className="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Clinical Nutrition Tools & Expert Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Meja Kerja <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Dietisien Interaktif</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Kalkulator presisi kebutuhan energi & makronutrien klinis berbasis formula baku Mifflin-St Jeor & Harris-Benedict, lengkap dengan penyesuaian faktor stres dan rekomendasi dietetik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="workbench-reset-btn"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#666666] border border-[#E8E0E3] hover:bg-[#F9F5F6] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="workbench-celebrate-btn"
              onClick={handleCelebrate}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verifikasi Resep</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Grid: Calculator Inputs vs Real-Time Nutritional Prescription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm"
          >
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6">
              <h3 className="text-base font-serif italic font-bold text-[#2D2D2D] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#2D2D2D]" />
                <span>1. Data Pasien & Parameter Antropometri</span>
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-mono text-[#2D2D2D] bg-[#E0E0E0] px-2.5 py-0.5 rounded-full font-bold">
                Input
              </span>
            </div>

            {/* Gender Selection */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#2D2D2D] mb-2 uppercase tracking-wider text-[10px] font-mono">Jenis Kelamin Pasien</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="calc-gender-female"
                  onClick={() => setGender('female')}
                  className={`py-3 px-4 rounded-2xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] ${
                    gender === 'female'
                      ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] shadow-xs'
                      : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/50'
                  }`}
                >
                  <span>👩 Perempuan</span>
                </button>
                <button
                  id="calc-gender-male"
                  onClick={() => setGender('male')}
                  className={`py-3 px-4 rounded-2xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] ${
                    gender === 'male'
                      ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] shadow-xs'
                      : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/50'
                  }`}
                >
                  <span>👨 Laki-Laki</span>
                </button>
              </div>
            </div>

            {/* Numeric Inputs (Age, Weight, Height) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">Usia (Thn)</label>
                <input
                  id="calc-input-age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">BB (kg)</label>
                <input
                  id="calc-input-weight"
                  type="number"
                  min="20"
                  max="300"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">TB (cm)</label>
                <input
                  id="calc-input-height"
                  type="number"
                  min="50"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
                />
              </div>
            </div>

            {/* Formula Chooser */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider text-[10px] font-mono">Formula Perhitungan BMR / REE</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="calc-formula-mifflin"
                  onClick={() => setFormula('mifflin')}
                  className={`p-3 rounded-2xl text-left border text-xs cursor-pointer transition-all ${
                    formula === 'mifflin'
                      ? 'bg-white border-[#2D2D2D] shadow-xs text-[#2D2D2D]'
                      : 'bg-white/70 border-[#E8E0E3] text-[#666666]'
                  }`}
                >
                  <span className="font-bold block">Mifflin-St Jeor</span>
                  <span className="text-[10px] text-[#8E8E8E] block mt-0.5 font-mono">Gold Standard AND</span>
                </button>

                <button
                  id="calc-formula-harris"
                  onClick={() => setFormula('harris')}
                  className={`p-3 rounded-2xl text-left border text-xs cursor-pointer transition-all ${
                    formula === 'harris'
                      ? 'bg-white border-[#2D2D2D] shadow-xs text-[#2D2D2D]'
                      : 'bg-white/70 border-[#E8E0E3] text-[#666666]'
                  }`}
                >
                  <span className="font-bold block">Harris-Benedict</span>
                  <span className="text-[10px] text-[#8E8E8E] block mt-0.5 font-mono">Formula Klasik</span>
                </button>
              </div>
            </div>

            {/* Activity Factor */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-semibold text-[#2D2D2D] mb-1.5">
                <span className="uppercase tracking-wider text-[10px] font-mono">Faktor Aktivitas Fisik (AF)</span>
                <span className="font-mono text-[#2D2D2D] font-bold">{activityFactor}x</span>
              </div>
              <select
                id="calc-activity-select"
                value={activityFactor}
                onChange={(e) => setActivityFactor(Number(e.target.value))}
                className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
              >
                <option value={1.2}>Tirah Baring / Bedrest (1.20)</option>
                <option value={1.3}>Ringan / Sedentary (Duduk, Mahasiswa, Kantor) (1.30)</option>
                <option value={1.55}>Sedang (Jalan Kaki, Olahraga 3-5x/minggu) (1.55)</option>
                <option value={1.75}>Berat / Atletik (Kerja Fisik Keras) (1.75)</option>
              </select>
            </div>

            {/* Stress Factor (Injury Factor) */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-[#2D2D2D] mb-1.5">
                <span className="uppercase tracking-wider text-[10px] font-mono">Faktor Stres Klinis (Injury Factor)</span>
                <span className="font-mono text-[#2D2D2D] font-bold">{stressFactor}x</span>
              </div>
              <select
                id="calc-stress-select"
                value={stressFactor}
                onChange={(e) => setStressFactor(Number(e.target.value))}
                className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-[#2D2D2D] min-h-[44px]"
              >
                <option value={1.0}>Tanpa Stres Metabolik / Kondisi Sehat (1.00)</option>
                <option value={1.1}>Pasca Bedah Minor / Elektif (1.10)</option>
                <option value={1.2}>Infeksi Sedang / Fraktur Tulang (1.20)</option>
                <option value={1.3}>Pasca Bedah Mayor / Kanker (1.30)</option>
                <option value={1.5}>Sepsis Berat / Politrauma / Luka Bakar (1.50)</option>
              </select>
            </div>

            {/* Quick Preset Buttons for Diets */}
            <div>
              <label className="block text-xs font-semibold text-[#2D2D2D] mb-2 uppercase tracking-wider text-[10px] font-mono">Preset Pola Diet Klinis:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dietPresets.map((preset) => (
                  <button
                    key={preset.id}
                    id={`preset-btn-${preset.id}`}
                    onClick={() => applyPreset(preset)}
                    className={`p-2.5 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                      selectedDietPreset === preset.id
                        ? 'bg-[#FCE4EC] border-[#2D2D2D] text-[#2D2D2D] font-semibold'
                        : 'bg-white border-[#E8E0E3] text-[#666666] hover:bg-[#FCE4EC]/40'
                    }`}
                  >
                    <span className="block truncate font-medium">{preset.name}</span>
                    <span className="text-[10px] text-[#8E8E8E] block font-mono mt-0.5">
                      KH {preset.carbs}% • P {preset.protein}% • L {preset.fat}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Calculated Nutrition Prescription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Primary Energy & Anthropometry Card */}
            <div className="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-5">
                <h3 className="text-base font-serif italic font-bold text-[#2D2D2D] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#2D2D2D]" />
                  <span>2. Resep Kebutuhan Energi & Status Gizi</span>
                </h3>
                <span className="text-xs font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full border border-[#F8BBD0]">
                  PAGT Standard Output
                </span>
              </div>

              {/* Top Numbers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-center">
                <div className="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                  <span className="text-[11px] text-[#8E8E8E] block uppercase tracking-wider font-medium font-mono">BMR / REE</span>
                  <strong className="text-2xl font-serif italic text-[#2D2D2D]">{bmr}</strong>
                  <span className="text-[10px] text-[#8E8E8E] block font-mono">kkal / 24 jam</span>
                </div>

                <div className="p-4 bg-[#FCE4EC] rounded-2xl border border-white shadow-xs">
                  <span className="text-[11px] text-[#2D2D2D] block uppercase tracking-wider font-semibold font-mono">Total Energi</span>
                  <strong className="text-3xl font-serif italic text-[#2D2D2D] font-bold">{tee}</strong>
                  <span className="text-[10px] text-[#2D2D2D] block font-mono font-medium">kkal / hari</span>
                </div>

                <div className="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-[#8E8E8E] block uppercase tracking-wider font-medium font-mono">Berat Ideal</span>
                  <strong className="text-2xl font-serif italic text-[#2D2D2D]">{bbi}</strong>
                  <span className="text-[10px] text-[#8E8E8E] block font-mono">kg (BBI)</span>
                </div>
              </div>

              {/* IMT Status Banner */}
              <div className="p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 bg-[#F9F5F6] border-[#E8E0E3] text-[#2D2D2D]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 shrink-0 text-[#2D2D2D]" />
                  <div>
                    <span className="font-semibold block font-mono">IMT: {imt} kg/m²</span>
                    <span className="text-[11px] text-[#666666]">{imtCategory.label}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-[#2D2D2D] text-white rounded-full self-start sm:self-auto">
                  {imt < 18.5 ? 'Defisit' : imt <= 25 ? 'Normal' : 'Kelebihan'}
                </span>
              </div>

              {/* Macronutrient Distribution Bars */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#2D2D2D] mb-3">
                  <span>Distribusi Makronutrien Terhitung</span>
                  <span className="text-[11px] font-mono text-[#8E8E8E]">
                    Total {carbsPct + proteinPct + fatPct}%
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Karbohidrat */}
                  <div className="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#2D2D2D]">🌾 Karbohidrat ({carbsPct}%)</span>
                      <strong className="font-mono text-[#2D2D2D]">{carbsGrams} gram <span className="text-[11px] text-[#8E8E8E]">({Math.round(tee * (carbsPct/100))} kkal)</span></strong>
                    </div>
                    <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#2D2D2D] rounded-full" 
                        animate={{ width: `${carbsPct}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Protein */}
                  <div className="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#2D2D2D]">🍗 Protein ({proteinPct}%)</span>
                      <strong className="font-mono text-[#2D2D2D]">
                        {proteinGrams} gram <span className="text-[11px] text-[#8E8E8E]">({proteinPerKg} g/kgBB)</span>
                      </strong>
                    </div>
                    <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#2D2D2D] rounded-full" 
                        animate={{ width: `${proteinPct * 2}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Lemak */}
                  <div className="p-3.5 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#2D2D2D]">🥑 Lemak ({fatPct}%)</span>
                      <strong className="font-mono text-[#2D2D2D]">{fatGrams} gram <span className="text-[11px] text-[#8E8E8E]">({Math.round(tee * (fatPct/100))} kkal)</span></strong>
                    </div>
                    <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#2D2D2D] rounded-full" 
                        animate={{ width: `${fatPct * 1.5}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Fluid Needs */}
                <div className="mt-4 pt-3 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#666666] gap-1">
                  <span>💧 Estimasi Kebutuhan Cairan (30 mL/kg):</span>
                  <strong className="font-mono text-[#2D2D2D]">{fluidRequirement} mL / hari (~{Math.round(fluidRequirement/250)} gelas)</strong>
                </div>

              </div>

            </div>

            {/* Dietary Advice Note Card */}
            <div className="bg-[#FCE4EC] rounded-[32px] border border-white p-5 sm:p-6 shadow-xs">
              <h4 className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                <span>Prinsip & Rekomendasi Menu Pasien</span>
              </h4>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                {dietPresets.find(p => p.id === selectedDietPreset)?.desc}
              </p>
              <div className="mt-3 p-3 bg-white/80 rounded-2xl border border-white text-[11px] text-[#2D2D2D] italic">
                💡 <strong>Tips Konseling:</strong> {dietPresets.find(p => p.id === selectedDietPreset)?.tips}
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

