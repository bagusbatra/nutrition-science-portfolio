import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Sparkles, 
  Award, 
  Check, 
  ChevronRight, 
  Sliders, 
  Info, 
  FileCheck2, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  PieChart as PieChartIcon,
  Leaf
} from 'lucide-react';
import { useSkripsi } from '../context/SkripsiContext';

export const SkripsiLabSection: React.FC = () => {
  const skripsiResearch = useSkripsi();
  const [selectedFormulaCode, setSelectedFormulaCode] = useState<string>("F2 (Formulasi Terpilih ⭐)");
  const [showAbstractModal, setShowAbstractModal] = useState<boolean>(false);
  
  // Custom Interactive Simulator State
  const [simKelor, setSimKelor] = useState<number>(15);
  const [simBekatul, setSimBekatul] = useState<number>(15);

  const selectedFormula = skripsiResearch.formulations.find(f => f.code === selectedFormulaCode) || skripsiResearch.formulations[0];

  // Calculated estimates for simulation
  const simFe = +(1.2 + (simKelor * 0.38) + (simBekatul * 0.08)).toFixed(2); // Fe in mg/100g
  const simProtein = +(3.1 + (simKelor * 0.32) + (simBekatul * 0.12)).toFixed(2); // Protein in g/100g
  const simSerat = +(1.8 + (simKelor * 0.18) + (simBekatul * 0.16)).toFixed(2);
  const simAKGContribution = Math.min(100, Math.round(((simFe * 0.4) / 15) * 100)); // for 40g snack portion out of 15mg RDA for adolescent girls

  // Estimated taste acceptability heuristic
  let tasteNote = "Sangat seimbang dan gurih alami (Formula Terbaik)";
  if (simKelor > 18) {
    tasteNote = "Sensasi langu dan agak sepat dari klorofil daun kelor mulai terdeteksi kuat.";
  } else if (simKelor < 10) {
    tasteNote = "Rasa sangat ringan, namun kontribusi zat besi (Fe) belum optimal untuk intervensi anemia.";
  }

  return (
    <section id="skripsi" className="py-16 sm:py-20 bg-[#F9F5F6] relative border-y border-[#E8E0E3] overflow-hidden">
      
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
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Flagship Research & Food Formulation Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Riset Skripsi & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Eksperimen Pangan</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Pengembangan biskuit mocaf fortifikasi ekstrak daun kelor dan bekatul sebagai kudapan padat gizi pencegah anemia defisiensi besi pada remaja putri.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="skripsi-read-abstract-btn"
              onClick={() => setShowAbstractModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-[#2D2D2D] bg-white hover:bg-[#2D2D2D] hover:text-white border border-[#2D2D2D] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Naskah Abstrak</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Top Research Overview Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-8 shadow-sm mb-8 sm:mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2D2D2D] text-white text-[10px] uppercase tracking-widest font-bold font-mono">
                  SKRIPSI S1 GIZI
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E0E0E0] text-[#2D2D2D] text-xs font-medium">
                  Uji Hedonik & Analisis Proksimat
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FCE4EC] text-[#2D2D2D] text-xs font-semibold border border-[#F8BBD0] flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#2D2D2D]" /> Status: Siap Ujian Sidang
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif italic text-[#2D2D2D] leading-snug">
                "{skripsiResearch.title}"
              </h3>

              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                {skripsiResearch.subTitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#666666]">
                <div>
                  <span className="text-[#8E8E8E] block text-[10px] uppercase tracking-wider font-mono">Dosen Pembimbing I:</span>
                  <strong className="text-[#2D2D2D] font-semibold">{skripsiResearch.advisor[0]}</strong>
                </div>
                <div>
                  <span className="text-[#8E8E8E] block text-[10px] uppercase tracking-wider font-mono">Dosen Pembimbing II:</span>
                  <strong className="text-[#2D2D2D] font-semibold">{skripsiResearch.advisor[1]}</strong>
                </div>
              </div>
            </div>

            {/* Quick Formulation Key Result Spotlight */}
            <div className="lg:col-span-4 bg-[#FCE4EC] rounded-[28px] p-6 border border-white flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2D2D2D] font-bold block mb-1 font-mono">
                  Formulasi Terpilih (F2)
                </span>
                <div className="text-3xl font-serif italic font-bold text-[#2D2D2D] mb-2">
                  7.8 mg Fe / 100g
                </div>
                <p className="text-xs text-[#666666] leading-relaxed mb-4">
                  Menyumbang <strong>52% AKG snack</strong> Fe remaja putri dalam 1 porsi (40g), dengan skor organoleptik tertinggi <strong>4.4 / 5.0</strong>.
                </p>
              </div>

              <div className="pt-3 border-t border-white/60 flex items-center justify-between text-xs text-[#2D2D2D]">
                <span className="text-[#666666]">Taraf Signifikansi:</span>
                <strong className="font-mono font-bold">p = 0.003 (Signifikan)</strong>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2-Column Interactive Lab Investigation Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Formulation Selector & Lab Test Results */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Treatment Selector Tabs */}
            <div className="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-base font-serif italic text-[#2D2D2D] font-bold">
                    1. Perbandingan Uji 4 Perlakuan Formulasi
                  </h4>
                  <p className="text-xs text-[#666666]">Pilih kode formula untuk meninjau data organoleptik & proksimat:</p>
                </div>
                <span className="text-xs font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-1 rounded-full border border-[#F8BBD0] self-start sm:self-auto font-medium">
                  n = 35 Panelis
                </span>
              </div>

              {/* Formula Cards Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {skripsiResearch.formulations.map((f) => {
                  const isSelected = f.code === selectedFormulaCode;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={f.code}
                      id={`formula-btn-${f.code.slice(0, 2)}`}
                      onClick={() => setSelectedFormulaCode(f.code)}
                      className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected 
                          ? 'bg-[#FCE4EC] border-[#2D2D2D] shadow-xs' 
                          : 'bg-[#F9F5F6] border-[#E8E0E3] hover:bg-[#FCE4EC]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-xs text-[#2D2D2D]">{f.code.split(' ')[0]}</span>
                        {f.isBestChoice && <Award className="w-3.5 h-3.5 text-[#2D2D2D]" />}
                      </div>
                      <span className="text-[11px] text-[#4A4A4A] block leading-tight font-medium">
                        Kelor {f.kelorPercent}% : Bekatul {f.bekatulPercent}%
                      </span>
                      <span className="text-[10px] text-[#8E8E8E] block mt-1 font-mono">
                        Mocaf {f.mocafPercent}%
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Detailed Breakdown for Selected Formula */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFormula.code}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-[#F9F5F6] rounded-2xl p-5 border border-[#E8E0E3]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-[#E8E0E3] gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#2D2D2D]">{selectedFormula.code}</span>
                      <p className="text-xs text-[#666666]">{selectedFormula.ratio}</p>
                    </div>
                    {selectedFormula.isBestChoice ? (
                      <span className="px-3 py-1 rounded-full bg-[#2D2D2D] text-white text-[10px] font-bold tracking-widest uppercase font-mono self-start sm:self-auto">
                        Formula Paling Optimal
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[#E0E0E0] text-[#2D2D2D] text-[10px] font-semibold uppercase tracking-wider font-mono self-start sm:self-auto">
                        Formula Eksperimental
                      </span>
                    )}
                  </div>

                  {/* Organoleptic Scores (Uji Hedonik Sensori) */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#2D2D2D] mb-2.5">
                      <span>Hasil Uji Organoleptik (Skala Hedonik 1 - 5)</span>
                      <span className="font-mono text-[#2D2D2D] font-bold">Skor: {selectedFormula.organolepticScore.overall} / 5.0</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { label: "Warna (Penampakan Hijau Zaitun)", score: selectedFormula.organolepticScore.warna, max: 5 },
                        { label: "Aroma (Karakteristik Rempah & Bekatul)", score: selectedFormula.organolepticScore.aroma, max: 5 },
                        { label: "Rasa (Tingkat Kemanisan & Ketiadaan Langu)", score: selectedFormula.organolepticScore.rasa, max: 5 },
                        { label: "Tekstur (Tingkat Kerenyahan / Crispness)", score: selectedFormula.organolepticScore.tekstur, max: 5 }
                      ].map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between text-[11px] text-[#4A4A4A] mb-1">
                            <span>{item.label}</span>
                            <strong className="font-mono text-[#2D2D2D]">{item.score} / 5.0</strong>
                          </div>
                          <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.score / item.max) * 100}%` }}
                              transition={{ duration: 0.5, delay: idx * 0.05 }}
                              className="h-full bg-[#2D2D2D] rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proximate Nutrient Values */}
                  <div>
                    <span className="text-xs font-semibold text-[#2D2D2D] block mb-2 font-mono uppercase tracking-wider text-[10px]">
                      Analisis Proksimat & Zat Besi (per 100 gram bahan)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                        <span className="text-[10px] text-[#8E8E8E] block">Zat Besi (Fe)</span>
                        <strong className="text-sm font-serif italic text-[#2D2D2D]">{selectedFormula.proximate.fe} mg</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                        <span className="text-[10px] text-[#8E8E8E] block">Protein</span>
                        <strong className="text-sm font-mono text-[#2D2D2D]">{selectedFormula.proximate.protein} g</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                        <span className="text-[10px] text-[#8E8E8E] block">Serat</span>
                        <strong className="text-sm font-mono text-[#2D2D2D]">{selectedFormula.proximate.serat} g</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E8E0E3]">
                        <span className="text-[10px] text-[#8E8E8E] block">Lemak</span>
                        <strong className="text-sm font-mono text-[#2D2D2D]">{selectedFormula.proximate.lemak} g</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-[#8E8E8E] block">Energi</span>
                        <strong className="text-sm font-mono text-[#2D2D2D]">{selectedFormula.proximate.energi} kkal</strong>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Key Scientific Findings Pill */}
            <div className="bg-white rounded-[32px] border border-[#E8E0E3] p-6 shadow-sm">
              <h4 className="text-base font-serif italic text-[#2D2D2D] font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D2D2D]" />
                <span>Temuan Kunci Riset & Implikasi Gizi Masyarakat</span>
              </h4>
              <ul className="space-y-2.5">
                {skripsiResearch.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#666666] leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#F8BBD0]">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>

          {/* Right Column: Interactive Formulation Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-sm lg:sticky lg:top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#FCE4EC] text-[#2D2D2D]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif italic font-bold text-[#2D2D2D]">
                      Simulator Formulasi Pangan
                    </h4>
                    <p className="text-[11px] text-[#8E8E8E]">Eksplorasi rasio bahan aktif & estimasi Fe AKG</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-mono bg-[#E0E0E0] text-[#2D2D2D] px-2.5 py-0.5 rounded-full font-bold">
                  Live Sim
                </span>
              </div>

              {/* Slider 1: Tepung Daun Kelor */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#2D2D2D]">Substitusi Ekstrak Daun Kelor</span>
                  <span className="font-mono font-bold text-[#2D2D2D]">{simKelor}%</span>
                </div>
                <input
                  id="simulator-kelor-slider"
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={simKelor}
                  onChange={(e) => setSimKelor(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#2D2D2D]"
                />
                <div className="flex justify-between text-[10px] text-[#8E8E8E] mt-1 font-mono">
                  <span>0% (Kontrol)</span>
                  <span>15% (Optimal)</span>
                  <span>25% (Tinggi Fe)</span>
                </div>
              </div>

              {/* Slider 2: Tepung Bekatul */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#2D2D2D]">Substitusi Tepung Bekatul Beras</span>
                  <span className="font-mono font-bold text-[#2D2D2D]">{simBekatul}%</span>
                </div>
                <input
                  id="simulator-bekatul-slider"
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={simBekatul}
                  onChange={(e) => setSimBekatul(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#2D2D2D]"
                />
                <div className="flex justify-between text-[10px] text-[#8E8E8E] mt-1 font-mono">
                  <span>0%</span>
                  <span>15% (Serat Optimal)</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Remaining Base Flour (Mocaf) */}
              <div className="p-3 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] flex items-center justify-between text-xs mb-5">
                <span className="text-[#666666]">Tepung Dasar Mocaf (Bebas Gluten):</span>
                <strong className="font-mono text-[#2D2D2D]">{Math.max(0, 100 - simKelor - simBekatul)}%</strong>
              </div>

              {/* Output Results Box */}
              <div className="p-5 bg-[#FCE4EC] rounded-2xl border border-white space-y-3 mb-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666]">Estimasi Kandungan Fe:</span>
                  <span className="text-xl font-serif italic font-bold text-[#2D2D2D]">{simFe} mg / 100g</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666]">Estimasi Protein:</span>
                  <span className="text-sm font-mono font-bold text-[#2D2D2D]">{simProtein} g / 100g</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666]">Estimasi Serat Pangan:</span>
                  <span className="text-sm font-mono font-bold text-[#2D2D2D]">{simSerat} g / 100g</span>
                </div>

                {/* AKG Contribution Gauge */}
                <div className="pt-2 border-t border-white/60">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#2D2D2D]">Kontribusi AKG Zat Besi Snack (40g):</span>
                    <strong className="font-mono text-[#2D2D2D]">{simAKGContribution}% dari AKG</strong>
                  </div>
                  <div className="h-2.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#2D2D2D] rounded-full"
                      animate={{ width: `${Math.min(100, simAKGContribution)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8E8E8E] block mt-1">
                    *Target kontribusi snack sehat: 10 - 20% dari total AKG harian 15 mg Fe remaja putri.
                  </span>
                </div>
              </div>

              {/* Organoleptic Feedback Note */}
              <div className="p-3.5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3] text-xs leading-relaxed text-[#4A4A4A]">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#2D2D2D]" />
                  <div>
                    <strong className="block text-[10px] uppercase tracking-wider font-mono text-[#2D2D2D]">Sensory Prediction:</strong>
                    <span>{tasteNote}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Full Abstract Modal */}
      <AnimatePresence>
        {showAbstractModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[28px] sm:rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-[#E8E0E3] shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#2D2D2D]" />
                  <span className="font-serif italic text-lg sm:text-xl font-bold text-[#2D2D2D]">Abstrak Lengkap Skripsi</span>
                </div>
                <button
                  id="close-abstract-modal-btn"
                  onClick={() => setShowAbstractModal(false)}
                  className="w-9 h-9 rounded-full bg-[#FCE4EC] hover:bg-[#F8BBD0] text-[#2D2D2D] flex items-center justify-center text-sm font-bold cursor-pointer transition-colors border border-[#F8BBD0]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                <h4 className="font-bold text-[#2D2D2D] font-serif italic text-base sm:text-lg">
                  {skripsiResearch.title}
                </h4>
                <p className="italic text-[#8E8E8E] text-xs">
                  Oleh: {skripsiResearch.advisor[0]}, {skripsiResearch.advisor[1]}, & Nadhira Azzahra
                </p>
                <div className="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3] text-justify font-light text-xs sm:text-sm">
                  <p>{skripsiResearch.abstract}</p>
                </div>

                <div>
                  <h5 className="font-bold text-[#2D2D2D] mb-1.5 text-xs uppercase tracking-wider font-mono">Kata Kunci (Keywords):</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {["Biskuit Fungsional", "Tepung Mocaf", "Daun Kelor", "Bekatul Beras", "Anemia Remaja Putri", "Zat Besi (Fe)", "Uji Organoleptik"].map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-[#FCE4EC] text-[#2D2D2D] rounded-full text-xs font-medium border border-[#F8BBD0]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E0E3] flex justify-end">
                <button
                  id="skripsi-modal-close-action"
                  onClick={() => setShowAbstractModal(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2D2D2D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer min-h-[44px]"
                >
                  Tutup Naskah
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

