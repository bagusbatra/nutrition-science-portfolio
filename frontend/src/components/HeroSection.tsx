import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowDown, 
  FileText, 
  FlaskConical, 
  Stethoscope, 
  BookOpen, 
  Heart, 
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
  Wheat,
  Leaf
} from 'lucide-react';
import { usePersonalInfo } from '../context/PersonalInfoContext';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onExploreSkripsi: () => void;
  onExploreWorkbench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenContact,
  onExploreSkripsi,
  onExploreWorkbench
}) => {
  const personalInfo = usePersonalInfo();
  const [activeTab, setActiveTab] = useState<'profil' | 'fokus' | 'metrik'>('profil');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#E8E0E3]">
      {/* Background Soft Gradient Blurs & Large Artistic Watermark */}
      <div className="absolute -top-20 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-72 sm:w-80 h-72 sm:h-80 bg-[#E0E0E0] rounded-full blur-3xl opacity-40 pointer-events-none -z-10" />
      <div className="absolute inset-0 lab-grid-pattern opacity-40 pointer-events-none" />

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:flex absolute bottom-20 left-[5%] w-11 h-11 rounded-2xl bg-white border border-[#E8E0E3] items-center justify-center text-[#2D2D2D] shadow-xs pointer-events-none -z-0 opacity-80"
      >
        <FlaskConical className="w-5 h-5 text-[#2D2D2D]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Artistic 2-Column Hero Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Artistic Statement & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center relative"
          >
            
            {/* Giant Background Watermark */}
            <span className="absolute -top-10 sm:-top-14 -left-4 sm:-left-6 text-[5.5rem] sm:text-[9rem] lg:text-[10rem] font-serif italic text-[#F8BBD0]/20 select-none pointer-events-none -z-10 leading-none">
              Gizi
            </span>

            <div>
              {/* Category Subhead */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-[#8E8E8E]">
                  Nutrisi & Dietetika Terapan
                </span>
                <span className="w-8 h-[1px] bg-[#2D2D2D]"></span>
              </div>

              {/* Main Headline with High Contrast & Italic Highlight */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2D2D2D] leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6">
                Bridging Science <br className="hidden sm:inline" />
                & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">The Plate.</span>
              </h1>

              {/* Refined Body Lead */}
              <p className="text-sm sm:text-base lg:text-lg text-[#666666] leading-relaxed mb-6 sm:mb-8 max-w-xl font-light">
                Mahasiswi tingkat akhir <strong className="font-semibold text-[#2D2D2D]">Ilmu Gizi Universitas Indonesia</strong> yang berfokus pada asuhan gizi klinis penyakit degeneratif (PAGT/ADIME), manajemen nutrisi rumah sakit, serta inovasi pangan fungsional pencegah anemia.
              </p>

              {/* CTA Action Deck */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-skripsi-cta-btn"
                  onClick={onExploreSkripsi}
                  className="px-7 py-3.5 bg-[#2D2D2D] text-white text-xs uppercase tracking-widest rounded-full hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group min-h-[44px]"
                >
                  <FlaskConical className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>View Research</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-workbench-cta-btn"
                  onClick={onExploreWorkbench}
                  className="px-6 py-3.5 border border-[#2D2D2D] text-[#2D2D2D] text-xs uppercase tracking-widest rounded-full hover:bg-[#2D2D2D] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Kalkulator Gizi</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-contact-cta-btn"
                  onClick={onOpenContact}
                  className="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#666666] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-1.5 cursor-pointer underline decoration-[#DDD] underline-offset-4 min-h-[44px]"
                >
                  <span>Say Hello</span>
                </motion.button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-5 sm:pt-6 border-t border-[#E8E0E3] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {personalInfo.stats.map((st, idx) => (
                <div key={idx} className="flex flex-col p-2.5 sm:p-0 bg-[#F9F5F6] sm:bg-transparent rounded-2xl sm:rounded-none border border-[#E8E0E3] sm:border-0">
                  <span className="font-serif italic text-2xl sm:text-3xl text-[#2D2D2D] font-bold tracking-tight">
                    {st.value}
                  </span>
                  <span className="text-xs font-semibold text-[#2D2D2D] mt-0.5">{st.label}</span>
                  <span className="text-[10px] sm:text-[11px] text-[#8E8E8E] leading-tight mt-0.5">{st.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Artistic Rounded Rotate Showcase Card & Floating Circular Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 relative flex items-center justify-center pt-2 sm:pt-6 lg:pt-0"
          >
            
            {/* Main Showcase Rotated Artistic Card */}
            <div className="w-full bg-[#FCE4EC] rounded-[32px] sm:rounded-[40px] relative overflow-hidden border border-white shadow-xl sm:rotate-1 transition-transform hover:rotate-0 duration-500">
              
              {/* Gradient Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F8BBD0]/40 to-transparent opacity-60 pointer-events-none" />

              {/* Card Inner Padding & Content */}
              <div className="p-5 sm:p-7 relative z-10">
                
                {/* Header Tag in Card */}
                <div className="flex items-center justify-between pb-3 border-b border-white/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#2D2D2D] font-mono">
                      Clinical Dossier
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#2D2D2D] bg-white/80 px-2.5 py-0.5 rounded-full font-mono font-bold border border-white">
                    GPA {personalInfo.gpa}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-3 sm:gap-3.5 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-white/80 shadow-xs flex items-center justify-center text-[#2D2D2D] font-serif italic text-xl sm:text-2xl font-bold shrink-0">
                    NA
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-serif italic font-bold text-[#2D2D2D] truncate">
                      {personalInfo.name}
                    </h2>
                    <p className="text-xs text-[#666666] truncate">Sarjana Gizi (Cand.) • Angkatan 2022</p>
                    <p className="text-[11px] text-[#8E8E8E] font-mono truncate">FKM Universitas Indonesia</p>
                  </div>
                </div>

                {/* Tab Switcher inside Hero Card */}
                <div className="flex rounded-full bg-white/70 p-1 mb-4 border border-white/80 backdrop-blur-xs">
                  {(['profil', 'fokus', 'metrik'] as const).map((tab) => (
                    <button
                      key={tab}
                      id={`hero-tab-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer text-[10px] ${
                        activeTab === tab 
                          ? 'bg-[#2D2D2D] text-white shadow-xs' 
                          : 'text-[#666666] hover:text-[#2D2D2D]'
                      }`}
                    >
                      {tab === 'profil' ? 'Pilar Ilmu' : tab === 'fokus' ? 'Minat Karir' : 'Prestasi'}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Pilar Ilmu */}
                {activeTab === 'profil' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2.5"
                  >
                    <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-xs border border-white flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#FCE4EC] text-[#2D2D2D] shrink-0">
                        <Stethoscope className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#2D2D2D]">Dietetika Penyakit Kronis</h3>
                        <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">
                          Penatalaksanaan gizi DM, GGK, Hipertensi, dan Malnutrisi berbasis ADIME.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-xs border border-white flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#FCE4EC] text-[#2D2D2D] shrink-0">
                        <FlaskConical className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#2D2D2D]">Formulasi & Biokimia Pangan</h3>
                        <p className="text-[11px] text-[#666666] mt-0.5 leading-relaxed">
                          Pengembangan kudapan fungsional mocaf-kelor, uji hedonik, dan analisis proksimat Fe.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Minat Karir */}
                {activeTab === 'fokus' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {[
                      { role: "Clinical Dietitian (RS Inpatient / Outpatient)", match: "Minat Utama ⭐" },
                      { role: "R&D Pangan Fungsional & Formulasi Nutrisi", match: "Riset Skripsi" },
                      { role: "Community Nutrition & Edukator Gizi", match: "Pengalaman PKL" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white flex items-center justify-between text-xs">
                        <span className="font-medium text-[#2D2D2D] text-[11px] truncate pr-2">{item.role}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-[#2D2D2D] text-white shrink-0">
                          {item.match}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Tab 3: Metrik & Prestasi */}
                {activeTab === 'metrik' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2.5"
                  >
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2.5 bg-white/85 rounded-xl border border-white">
                        <span className="text-[10px] text-[#8E8E8E] font-medium block uppercase tracking-wider">Mata Kuliah Utama</span>
                        <strong className="text-base font-serif italic text-[#2D2D2D]">A (4.00)</strong>
                        <span className="text-[9px] text-[#666666] block">Dietetik Penyakit Kronis</span>
                      </div>
                      <div className="p-2.5 bg-white/85 rounded-xl border border-white">
                        <span className="text-[10px] text-[#8E8E8E] font-medium block uppercase tracking-wider">TOEFL Score</span>
                        <strong className="text-base font-serif italic text-[#2D2D2D]">580</strong>
                        <span className="text-[9px] text-[#666666] block">ITP Test UI</span>
                      </div>
                    </div>
                    <div className="p-2 bg-white/85 rounded-lg border border-white text-[11px] text-[#2D2D2D]">
                      <strong>Hibah Riset:</strong> Peraih Hibah Penelitian Pangan Lokal 2025.
                    </div>
                  </motion.div>
                )}

                {/* Bottom Latest Thesis Card Overlay */}
                <div className="mt-4 pt-3 border-t border-white/60 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#2D2D2D] block font-mono">
                      Skripsi Terpilih
                    </span>
                    <span className="text-xs font-serif italic text-[#2D2D2D]">Biskuit Kelor-Bekatul Fe 7.8mg</span>
                  </div>
                  <button 
                    onClick={onExploreSkripsi}
                    className="text-[10px] uppercase tracking-wider font-semibold text-[#2D2D2D] hover:underline cursor-pointer font-mono"
                  >
                    Detail &rarr;
                  </button>
                </div>

              </div>
            </div>

            {/* Circular Floating Badge Stamp in Artistic Flair Theme */}
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-3 sm:-bottom-7 sm:-left-7 w-28 h-28 sm:w-36 sm:h-36 bg-[#E0E0E0] rounded-full flex items-center justify-center p-2.5 sm:p-4 text-center border-4 border-[#F9F5F6] shadow-md z-20 pointer-events-none"
            >
              <div className="flex flex-col items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2D2D2D] mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[10px] leading-tight font-bold uppercase tracking-tight text-[#2D2D2D]">
                  Certified Nutritionist Trainee
                </span>
                <span className="text-[7px] sm:text-[8px] text-[#666666] mt-0.5 font-mono">850+ Jam PKL</span>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

