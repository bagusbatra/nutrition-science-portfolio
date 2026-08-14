import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Stethoscope, 
  UtensilsCrossed, 
  HeartPulse, 
  FlaskConical, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Award,
  Layers
} from 'lucide-react';
import { rotationExperiences } from '../data/portfolioData';

export const ExperienceRotationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Rotasi (4)' },
    { id: 'Klinis (Dietetik RS)', label: 'Dietetik Klinis RS' },
    { id: 'MSPM (Food Service)', label: 'MSPM & Food Service' },
    { id: 'Gizi Masyarakat (Puskesmas)', label: 'Gizi Masyarakat' },
    { id: 'Akademik & Riset', label: 'Lab & Akademik' }
  ];

  const filteredRotations = selectedCategory === 'all' 
    ? rotationExperiences 
    : rotationExperiences.filter(r => r.category === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      default: return <FlaskConical className="w-5 h-5" />;
    }
  };

  return (
    <section id="rotations" className="py-16 sm:py-20 bg-white relative border-b border-[#E8E0E3] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Clinical Rotations & Nutrition Fieldwork</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Rotasi Klinis & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Pengalaman Lapangan</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Pengalaman lapangan mencakup 3 pilar kompetensi utama ilmu gizi: Pelayanan Gizi Rawat Inap RS, Penyelenggaraan Makanan Masal, dan Intervensi Gizi Masyarakat di Puskesmas.
            </p>
          </div>

          <div className="text-xs text-[#666666]">
            <span className="font-mono bg-[#F9F5F6] px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
              Total 850+ Jam Praktik Lapangan
            </span>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 sm:gap-2.5 mb-8"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={cat.id}
                id={`filter-rotation-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer min-h-[40px] ${
                  isActive 
                    ? 'bg-[#2D2D2D] text-white shadow-xs' 
                    : 'bg-[#F9F5F6] text-[#666666] border border-[#E8E0E3] hover:bg-[#FCE4EC]'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Rotations Timeline Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRotations.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F9F5F6] rounded-[32px] border border-[#E8E0E3] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Card Top: Icon & Category */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3.5 rounded-2xl bg-[#FCE4EC] text-[#2D2D2D] border border-white">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2D2D2D] bg-[#E0E0E0] px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Role and Institution */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] mb-1">
                    {item.role}
                  </h3>
                  <h4 className="text-xs font-semibold text-[#666666] mb-3">
                    {item.institution}
                  </h4>

                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8E8E] mb-4 pb-3 border-b border-[#E8E0E3]">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#2D2D2D]" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#2D2D2D]" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Badges / Competency Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.badges.map((b, bi) => (
                      <span key={bi} className="px-3 py-1 rounded-full bg-white text-[#2D2D2D] text-[10px] font-medium border border-[#E8E0E3]">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Achievements List */}
                  <ul className="space-y-2.5 text-xs text-[#4A4A4A] mb-6">
                    {item.achievements.map((ach, ai) => (
                      <li key={ai} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D2D2D] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Footer Metric Highlight */}
                <div className="pt-4 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] text-[#8E8E8E] font-mono uppercase tracking-wider">Pencapaian Kunci:</span>
                  <span className="text-xs font-bold font-mono text-[#2D2D2D] bg-[#FCE4EC] px-3 py-1 rounded-full border border-[#F8BBD0] self-start sm:self-auto">
                    {item.highlightMetric}
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

    </section>
  );
};

