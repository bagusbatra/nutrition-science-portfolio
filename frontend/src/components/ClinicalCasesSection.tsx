import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  UserCheck, 
  FileSpreadsheet, 
  Target, 
  UtensilsCrossed, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useClinicalCases } from '../context/ClinicalCasesContext';

export const ClinicalCasesSection: React.FC = () => {
  const clinicalCases = useClinicalCases();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(clinicalCases[0].id);
  const [activeStep, setActiveStep] = useState<'A' | 'D' | 'I' | 'ME'>('A');

  const currentCase = clinicalCases.find(c => c.id === selectedCaseId) || clinicalCases[0];

  return (
    <section id="cases" className="py-16 sm:py-20 bg-[#F9F5F6] relative border-b border-[#E8E0E3] overflow-hidden">
      
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
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Nutrition Care Process & ADIME Dossier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2D2D2D] tracking-tight">
              Studi Kasus <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Asuhan Gizi Terstandar</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-2xl font-light">
              Dokumentasi penatalaksanaan dietetik pasien rawat inap rumah sakit rujukan dengan metode ADIME, perumusan diagnosis gizi PES, dan modifikasi menu terapeutik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-[#2D2D2D] bg-white px-4 py-2 rounded-full border border-[#E8E0E3] shadow-xs">
              Standar Kemenkes RI & AsDI
            </span>
          </div>
        </motion.div>

        {/* Case Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8"
        >
          {clinicalCases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                key={c.id}
                id={`case-card-${c.id}`}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  setActiveStep('A');
                }}
                className={`p-5 sm:p-6 rounded-[28px] text-left transition-all border cursor-pointer ${
                  isSelected 
                    ? 'bg-white border-[#2D2D2D] ring-2 ring-[#F8BBD0] shadow-sm' 
                    : 'bg-white/70 border-[#E8E0E3] hover:bg-white hover:border-[#D0C4C8]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] px-2.5 py-0.5 rounded-full bg-[#FCE4EC] border border-[#F8BBD0]">
                    {c.code}
                  </span>
                  <span className="text-xs text-[#8E8E8E] font-mono">
                    {c.patientProfile.room}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2D2D] mb-2 leading-snug">
                  {c.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666]">
                  <span className="font-medium">{c.patientProfile.initial}, {c.patientProfile.age} th ({c.patientProfile.gender})</span>
                  <span className="text-[#8E8E8E]">•</span>
                  <span className="text-[#2D2D2D] font-semibold bg-[#F9F5F6] px-2 py-0.5 rounded-md border border-[#E8E0E3]">{c.patientProfile.dietOrder}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Dossier Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[32px] border border-[#E8E0E3] p-5 sm:p-8 shadow-sm"
        >
          
          {/* Patient Quick Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-wider block">Diagnosa Medis:</span>
              <h4 className="font-serif italic font-bold text-sm sm:text-base text-[#2D2D2D]">{currentCase.patientProfile.medicalDiagnosis}</h4>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#666666]">
              <div>
                <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Preskripsi Diet:</span>
                <strong className="text-[#2D2D2D] font-mono">{currentCase.patientProfile.dietOrder}</strong>
              </div>
            </div>
          </div>

          {/* ADIME Stage Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[#F9F5F6] p-1.5 mb-6 sm:mb-8 border border-[#E8E0E3] gap-1">
            {[
              { key: 'A', label: 'Assessment (Pengkajian)' },
              { key: 'D', label: 'Diagnosis (PES)' },
              { key: 'I', label: 'Intervensi & Menu' },
              { key: 'ME', label: 'Monev (Monitoring)' }
            ].map((step) => {
              const isActive = activeStep === step.key;
              return (
                <button
                  key={step.key}
                  id={`adime-tab-${step.key}`}
                  onClick={() => setActiveStep(step.key as any)}
                  className={`py-2.5 px-2 sm:px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                    isActive 
                      ? 'bg-[#2D2D2D] text-white shadow-xs' 
                      : 'text-[#666666] hover:text-[#2D2D2D]'
                  }`}
                >
                  <span className="font-mono mr-1">[{step.key}]</span>
                  <span className="truncate">{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* ADIME Content Body */}
          <AnimatePresence mode="wait">
            
            {/* Step A: Assessment */}
            {activeStep === 'A' && (
              <motion.div
                key="step-a"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* Antropometri */}
                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                      1. Antropometri (A)
                    </span>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                      {currentCase.adime.assessment.antropometri}
                    </p>
                  </div>

                  {/* Fisik & Klinis */}
                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                      2. Fisik & Klinis (C)
                    </span>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                      {currentCase.adime.assessment.fisikKlinis}
                    </p>
                  </div>

                </div>

                {/* Biokimia Data Table */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block">
                      3. Biokimia & Laboratorium Pasien (B)
                    </span>
                    <span className="text-[10px] text-[#8E8E8E] font-mono sm:hidden">Geser tabel &rarr;</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left min-w-[500px]">
                      <thead className="bg-[#EAE4E7] text-[#2D2D2D] uppercase font-mono text-[10px]">
                        <tr>
                          <th className="p-3 rounded-l-xl">Parameter Uji</th>
                          <th className="p-3">Hasil Pasien</th>
                          <th className="p-3">Nilai Rujukan</th>
                          <th className="p-3 rounded-r-xl">Interpretasi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E0E3]">
                        {currentCase.adime.assessment.biokimia.map((b, i) => (
                          <tr key={i} className="hover:bg-white/80">
                            <td className="p-3 font-medium text-[#2D2D2D]">{b.test}</td>
                            <td className="p-3 font-mono font-bold text-[#2D2D2D]">{b.result}</td>
                            <td className="p-3 text-[#666666]">{b.normal}</td>
                            <td className="p-3">
                              {b.status === 'high' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-semibold border border-rose-200">
                                  Tinggi / Di atas normal
                                </span>
                              )}
                              {b.status === 'low' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                                  Rendah / Defisiensi
                                </span>
                              )}
                              {b.status === 'normal' && (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                                  Normal
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dietary History */}
                <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-2">
                    4. Riwayat Gizi & Pola Makan SMRS (D)
                  </span>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed">
                    {currentCase.adime.assessment.dietaryHistory}
                  </p>
                </div>

              </motion.div>
            )}

            {/* Step D: Diagnosis PES */}
            {activeStep === 'D' && (
              <motion.div
                key="step-d"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                {/* Formatted PES Sentence */}
                <div className="p-5 sm:p-6 rounded-[28px] bg-[#FCE4EC] border border-[#F8BBD0]">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D] block mb-2">
                    Formulasi Rumusan Diagnosis Gizi (PES Statement):
                  </span>
                  <blockquote className="font-serif text-sm sm:text-lg text-[#2D2D2D] font-semibold italic leading-relaxed">
                    "{currentCase.adime.diagnosisPES.formattedPES}"
                  </blockquote>
                </div>

                {/* PES Components Deconstruction */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <div className="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                      <Target className="w-4 h-4" />
                      <span className="font-bold text-xs uppercase font-mono">Problem (P)</span>
                    </div>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                      {currentCase.adime.diagnosisPES.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <div className="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                      <Activity className="w-4 h-4" />
                      <span className="font-bold text-xs uppercase font-mono">Etiology (E)</span>
                    </div>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                      {currentCase.adime.diagnosisPES.etiology}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <div className="flex items-center gap-1.5 mb-2 text-[#2D2D2D]">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-bold text-xs uppercase font-mono">Signs / Symptoms (S)</span>
                    </div>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed">
                      {currentCase.adime.diagnosisPES.signsSymptoms}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Step I: Intervensi */}
            {activeStep === 'I' && (
              <motion.div
                key="step-i"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                {/* Calculated Targets */}
                <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                    Preskripsi Kebutuhan Zat Gizi Pasien
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-center text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                      <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Energi</span>
                      <strong className="text-sm font-mono text-[#2D2D2D]">{currentCase.adime.intervention.perhitunganKebutuhan.energi}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                      <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Protein</span>
                      <strong className="text-sm font-mono text-[#2D2D2D]">{currentCase.adime.intervention.perhitunganKebutuhan.protein}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                      <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Lemak</span>
                      <strong className="text-sm font-mono text-[#2D2D2D]">{currentCase.adime.intervention.perhitunganKebutuhan.lemak}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E8E0E3]">
                      <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Karbohidrat</span>
                      <strong className="text-sm font-mono text-[#2D2D2D]">{currentCase.adime.intervention.perhitunganKebutuhan.karbohidrat}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E8E0E3] col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider block font-mono">Cairan</span>
                      <strong className="text-sm font-mono text-[#2D2D2D]">{currentCase.adime.intervention.perhitunganKebutuhan.cairan}</strong>
                    </div>
                  </div>
                </div>

                {/* Goals & Principles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                      Tujuan Diet:
                    </span>
                    <ul className="space-y-2 text-xs text-[#4A4A4A]">
                      {currentCase.adime.intervention.tujuanDiet.map((g, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D2D2D] shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                    <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                      Prinsip & Syarat Diet:
                    </span>
                    <ul className="space-y-2 text-xs text-[#4A4A4A]">
                      {currentCase.adime.intervention.prinsipSyaratDiet.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D2D2D] shrink-0 mt-1.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sample Daily Menu Distribution */}
                <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                    Perencanaan Menu Sehari & Estimasi Nilai Gizi
                  </span>
                  <div className="space-y-2.5">
                    {currentCase.adime.intervention.menuContoh.map((m, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-[#E8E0E3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <span className="font-bold text-[#2D2D2D] mr-2 uppercase tracking-wide text-[11px] font-mono">{m.waktu}:</span>
                          <span className="text-[#4A4A4A] font-medium">{m.menu}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#2D2D2D] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full shrink-0 border border-[#F8BBD0]">
                          {m.komposisi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* Step ME: Monitoring & Evaluasi */}
            {activeStep === 'ME' && (
              <motion.div
                key="step-me"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-2xl bg-[#F9F5F6] border border-[#E8E0E3]">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-3">
                    Rencana Monitoring & Evaluasi Asuhan Gizi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCase.adime.monitoringEvaluasi.map((me, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-[#E8E0E3] text-xs text-[#4A4A4A] flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#2D2D2D] shrink-0 mt-0.5" />
                        <span>{me}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Learning Box */}
                <div className="p-5 sm:p-6 rounded-[28px] bg-[#FCE4EC] border border-[#F8BBD0]">
                  <span className="font-mono text-xs font-bold text-[#2D2D2D] uppercase tracking-wider block mb-1">
                    💡 Refleksi Klinis & Pembelajaran Praktik:
                  </span>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed italic">
                    "{currentCase.keyLearning || currentCase.adime.keyLearning}"
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </motion.div>

      </div>

    </section>
  );
};

