import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  Cpu, 
  Stethoscope, 
  ShieldCheck, 
  Layers, 
  FileCheck,
  Sparkles
} from 'lucide-react';
import { skillsAndCompetencies } from '../data/portfolioData';

export const SkillsCertificationsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden">
      
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
              <Award className="w-3.5 h-3.5" />
              <span>Skills, Software & Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Kompetensi & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Sertifikasi Gizi</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Keahlian teknis asuhan gizi terstandar, penguasaan perangkat lunak analisis dietetik, standar keamanan pangan HACCP, dan sertifikasi profesi.
            </p>
          </div>

          <div className="text-xs text-[#666666]">
            <span className="font-mono bg-[#F9F5F6] px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
              Kualifikasi Standar AsDI & PERSAGI
            </span>
          </div>
        </motion.div>

        {/* 3-Column Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12"
        >
          
          {/* Column 1: Clinical Competencies */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                <div className="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2D2D]">Klinis & Asuhan Gizi</h3>
                  <span className="text-[11px] text-[#8E8E8E] font-mono">Clinical Dietetics</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {skillsAndCompetencies.clinical.map((sk, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="font-bold text-[#2D2D2D]">{sk.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed">
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Food Service & HACCP */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                <div className="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2D2D]">MSPM & Keamanan Pangan</h3>
                  <span className="text-[11px] text-[#8E8E8E] font-mono">Food Service Management</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {skillsAndCompetencies.foodService.map((sk, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="font-bold text-[#2D2D2D]">{sk.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed">
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 3: Software & Data Tools */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E8E0E3]">
                <div className="p-3 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2D2D]">Software & Komputasi</h3>
                  <span className="text-[11px] text-[#8E8E8E] font-mono">Nutrition Analysis Tools</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {skillsAndCompetencies.software.map((sk, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#E8E0E3] text-xs">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="font-bold text-[#2D2D2D]">{sk.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#2D2D2D] border border-[#F8BBD0] shrink-0">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed">
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="bg-[#FCE4EC] rounded-[32px] border border-white p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#F8BBD0] mb-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#2D2D2D]" />
              <span>Sertifikat Pelatihan & Kredensial Resmi</span>
            </h3>
            <span className="text-xs font-mono uppercase tracking-wider text-[#2D2D2D] bg-white px-3 py-1 rounded-full font-bold">
              Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsAndCompetencies.certifications.map((cert, idx) => (
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                key={idx} 
                className="p-5 bg-white/90 rounded-2xl border border-white shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full font-bold border border-[#F8BBD0]">
                    {cert.year}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#2D2D2D] mt-2.5 mb-1 leading-snug">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-[#666666]">
                    {cert.issuer}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E0E3] flex items-center gap-1.5 text-[11px] text-[#2D2D2D] font-medium font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D2D2D]" />
                  <span>Kredensial Sah</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

    </section>
  );
};

