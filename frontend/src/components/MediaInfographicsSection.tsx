import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileImage, 
  Sparkles, 
  Eye, 
  Download, 
  Share2, 
  Users, 
  Check, 
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { mediaInfographics } from '../data/portfolioData';
import { MediaInfographic } from '../types';

export const MediaInfographicsSection: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaInfographic | null>(null);

  return (
    <section id="media" className="py-16 sm:py-20 bg-[#F9F5F6] relative border-b border-[#E8E0E3] overflow-hidden">
      
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
              <FileImage className="w-3.5 h-3.5" />
              <span>Nutrition Communication & Education Leaflets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Media Edukasi & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Desain Komunikasi Gizi</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Desain komunikasi visual kesehatan untuk advokasi gizi, materi konseling pasien rawat jalan, serta media edukasi pencegahan penyakit degeneratif.
            </p>
          </div>

          <div className="text-xs text-[#666666]">
            <span className="font-mono bg-white px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
              KIE Berbasis Bukti Ilmiah
            </span>
          </div>
        </motion.div>

        {/* Media Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {mediaInfographics.map((med, idx) => (
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              key={med.id}
              id={`media-card-${med.id}`}
              className="bg-white rounded-[32px] border border-[#E8E0E3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Visual Thumbnail Area */}
                <div className={`h-40 sm:h-44 bg-gradient-to-br ${med.thumbnailBg} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden border-b border-[#E8E0E3]`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#2D2D2D] px-2.5 py-0.5 rounded-full border border-white">
                      {med.category}
                    </span>
                    <span className="text-[10px] text-[#666666] font-mono font-medium bg-white/70 px-2.5 py-0.5 rounded-full">
                      {med.dimensions}
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <BookOpen className="w-8 h-8 sm:w-9 sm:h-9 text-[#2D2D2D] mx-auto opacity-70 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="text-[10px] text-[#4A4A4A] font-medium truncate flex items-center gap-1.5 font-mono">
                    <Users className="w-3 h-3 text-[#2D2D2D]" />
                    <span className="truncate">Target: {med.targetAudience}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-base font-bold text-[#2D2D2D] mb-2 leading-snug">
                    {med.title}
                  </h3>
                  <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-4">
                    {med.description}
                  </p>

                  <div className="space-y-1.5 mb-2">
                    {med.keyPoints.slice(0, 2).map((kp, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#4A4A4A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D2D2D] shrink-0" />
                        <span className="truncate">{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Trigger */}
              <div className="p-5 sm:p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id={`media-view-btn-${med.id}`}
                  onClick={() => setSelectedMedia(med)}
                  className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[42px]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Media</span>
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Media Detail Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] max-w-xl w-full p-6 sm:p-8 border border-[#E8E0E3] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between pb-4 border-b border-[#E8E0E3] mb-5 gap-3">
                <div>
                  <span className="font-mono text-[10px] text-[#2D2D2D] font-bold uppercase tracking-wider block bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0] mb-1">
                    {selectedMedia.category} • {selectedMedia.dimensions}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D]">
                    {selectedMedia.title}
                  </h3>
                </div>
                <button
                  id="close-media-modal-btn"
                  onClick={() => setSelectedMedia(null)}
                  className="w-9 h-9 shrink-0 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center text-sm font-bold cursor-pointer transition-colors border border-[#E8E0E3]"
                >
                  ✕
                </button>
              </div>

              {/* Media Graphic Frame */}
              <div className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${selectedMedia.thumbnailBg} border border-[#E8E0E3] mb-5 text-center`}>
                <div className="max-w-xs mx-auto">
                  <div className="p-4 bg-white/95 backdrop-blur-xs rounded-2xl shadow-xs border border-white">
                    <span className="text-sm font-serif font-bold text-[#2D2D2D] block mb-1">
                      {selectedMedia.title}
                    </span>
                    <p className="text-[11px] text-[#666666] italic">
                      "Disusun sesuai pedoman gizi klinis Kemenkes RI dan referensi ADA/AND."
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#4A4A4A]">
                <div>
                  <span className="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">🎯 Sasaran Edukasi:</span>
                  <p className="p-3 bg-[#F9F5F6] rounded-xl border border-[#E8E0E3] text-[#4A4A4A]">
                    {selectedMedia.targetAudience}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">📖 Deskripsi Konten & Urgensi:</span>
                  <p className="leading-relaxed text-[#666666]">
                    {selectedMedia.description}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-1 font-mono">💡 Poin Kunci Edukasi (Key Messages):</span>
                  <ul className="space-y-2">
                    {selectedMedia.keyPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2D2D2D] shrink-0" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-[#8E8E8E]">Format: PDF / High-Res PNG</span>
                <button
                  id="media-modal-close-action"
                  onClick={() => setSelectedMedia(null)}
                  className="px-6 py-2.5 rounded-full bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer min-h-[40px]"
                >
                  Tutup Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

