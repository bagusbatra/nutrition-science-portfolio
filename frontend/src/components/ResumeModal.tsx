import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  CheckCircle2,
  Stethoscope,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import { usePersonalInfo } from '../context/PersonalInfoContext';
import { useSkripsi } from '../context/SkripsiContext';
import { useRotations } from '../context/RotationsContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const personalInfo = usePersonalInfo();
  const skripsiResearch = useSkripsi();
  const rotationExperiences = useRotations();
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E0E3] shadow-2xl relative p-6 sm:p-10 my-auto"
        >
          {/* Header Controls (Don't print) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6 print:hidden">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FCE4EC] text-[#2D2D2D]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-[#2D2D2D] block">
                  Curriculum Vitae
                </span>
                <span className="text-[11px] font-mono text-[#8E8E8E] uppercase tracking-wider">
                  {personalInfo.name}, S.Gz (Cand.)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                id="resume-print-btn"
                onClick={handlePrint}
                className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#FCE4EC] hover:bg-[#F8BBD0] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F8BBD0]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / PDF</span>
              </button>
              <button
                id="resume-close-btn"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Printable CV Document */}
          <div className="space-y-6 text-[#2D2D2D] font-sans">
            
            {/* Header Resume */}
            <div className="pb-6 border-b border-[#E8E0E3] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2D2D]">
                  {personalInfo.name}
                </h1>
                <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#2D2D2D] mt-1 bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0]">
                  Sarjana Gizi (Candidate) • Clinical Nutritionist & Food Formulator
                </p>
                <p className="text-xs text-[#666666] mt-2 max-w-xl leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[#666666] shrink-0 font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#2D2D2D]" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#2D2D2D]" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2D2D2D]" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                <GraduationCap className="w-4 h-4 text-[#2D2D2D]" />
                <span>Pendidikan Formal</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-sm font-serif font-bold text-[#2D2D2D]">{personalInfo.university}</strong>
                    <p className="text-[#666666]">S1 Ilmu Gizi (Dietetika Klinis & Gizi Masyarakat)</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[#2D2D2D] font-bold bg-[#FCE4EC] px-2 py-0.5 rounded-md border border-[#F8BBD0]">IPK: {personalInfo.gpa}</span>
                    <p className="text-[11px] font-mono text-[#8E8E8E] mt-1">2022 — 2026 (Menjelang Sidang)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thesis */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                <FlaskConical className="w-4 h-4 text-[#2D2D2D]" />
                <span>Riset Tugas Akhir (Skripsi)</span>
              </h2>
              <div className="text-xs space-y-1 bg-[#F9F5F6] p-4 rounded-2xl border border-[#E8E0E3]">
                <strong className="text-sm text-[#2D2D2D] font-serif block">
                  "{skripsiResearch.title}"
                </strong>
                <p className="text-[#666666] text-[11px] leading-relaxed">
                  <strong>Hasil Utama:</strong> Formulasi F2 (Mocaf 70% : Kelor 15% : Bekatul 15%) mengandung Fe 7.8 mg/100g (mencukupi 52% AKG snack remaja putri), protein 9.4g/100g, dengan skor hedonik rasa 4.3/5.0.
                </p>
              </div>
            </div>

            {/* Clinical & Fieldwork Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                <Stethoscope className="w-4 h-4 text-[#2D2D2D]" />
                <span>Pengalaman Praktik Klinis & Lapangan (850+ Jam)</span>
              </h2>
              <div className="space-y-4 text-xs">
                {rotationExperiences.map((rot) => (
                  <div key={rot.id} className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-serif font-bold text-[#2D2D2D]">{rot.role}</strong>
                        <p className="text-[#666666] font-semibold">{rot.institution} — {rot.location}</p>
                      </div>
                      <span className="font-mono text-[11px] text-[#8E8E8E]">{rot.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[#4A4A4A] pl-1">
                      {rot.achievements.slice(0, 2).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies & Software */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#2D2D2D] mb-3 flex items-center gap-2 pb-1.5 border-b border-[#E8E0E3]">
                <Award className="w-4 h-4 text-[#2D2D2D]" />
                <span>Kompetensi Teknis & Perangkat Lunak</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                  <strong className="text-[#2D2D2D] block mb-1 uppercase tracking-wider font-mono text-[10px]">Keahlian Gizi Klinis:</strong>
                  <p className="text-[#666666] leading-relaxed">PAGT / NCP (ADIME format), Penilaian Status Gizi (Antropometri, Biokimia, Fisik/Klinis, Dietary Recall), Perhitungan BMR/TEE, Konseling Gizi Motivatif.</p>
                </div>
                <div className="p-4 bg-[#F9F5F6] rounded-2xl border border-[#E8E0E3]">
                  <strong className="text-[#2D2D2D] block mb-1 uppercase tracking-wider font-mono text-[10px]">Software & Standard:</strong>
                  <p className="text-[#666666] leading-relaxed">NutriSurvey (Analisis Nilai Gizi), WHO Anthro/AnthroPlus, SPSS Statistics, Canva Medical Media, HACCP Food Safety System.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-[#E8E0E3] flex justify-end print:hidden">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-colors cursor-pointer"
            >
              Tutup CV
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
