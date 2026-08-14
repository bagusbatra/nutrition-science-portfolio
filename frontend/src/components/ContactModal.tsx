import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Send, 
  X, 
  Check, 
  MessageCircle, 
  Sparkles, 
  Building, 
  User, 
  FileText
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Peluang Kerja / Magang Klinis RS');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderName, senderOrg, senderEmail, inquiryType, message }),
      });
    } catch (err) {
      console.error('Failed to submit contact message', err);
    } finally {
      setIsSubmitting(false);
    }
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2800);
  };

  const handleWhatsAppDirect = () => {
    const waText = encodeURIComponent(
      `Halo ${personalInfo.name}, saya tertarik mendiskusikan peluang kolaborasi/internship gizi (${inquiryType}). Mohon info jadwal ketersediaan Anda. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-[32px] max-w-lg w-full p-7 sm:p-9 border border-[#E8E0E3] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E0E3] mb-6">
            <div>
              <span className="text-[10px] font-mono text-[#2D2D2D] uppercase font-bold tracking-wider block bg-[#FCE4EC] px-2.5 py-0.5 rounded-full inline-block border border-[#F8BBD0] mb-1">
                Direct Communication Channel
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2D2D]">
                Hubungi {personalInfo.name}
              </h3>
            </div>
            <button
              id="contact-modal-close-x"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F9F5F6] hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isSent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 text-center space-y-3"
            >
              <div className="w-16 h-16 bg-[#FCE4EC] text-[#2D2D2D] rounded-full flex items-center justify-center mx-auto border border-[#F8BBD0]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#2D2D2D]">Pesan Berhasil Terkirim!</h4>
              <p className="text-xs text-[#666666] max-w-xs mx-auto leading-relaxed">
                Terima kasih telah menghubungi. {personalInfo.name} akan segera merespons melalui email/WhatsApp Anda.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Nama Lengkap & Gelar</label>
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  placeholder="Contoh: dr. Maya / HRD RS Hermina"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Institusi / RS</label>
                  <input
                    id="contact-form-org"
                    type="text"
                    placeholder="Instalasi Gizi / RS"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Alamat Email</label>
                  <input
                    id="contact-form-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Tujuan Pesan</label>
                <select
                  id="contact-form-type"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                >
                  <option value="Peluang Kerja / Magang Klinis RS">Tawaran Peluang Kerja / Magang Klinis RS</option>
                  <option value="Riset Formulasi Pangan">Kolaborasi Riset Pangan Fungsional & Lab</option>
                  <option value="Narasumber Edukasi Gizi">Undangan Pembicara / Edukator Gizi</option>
                  <option value="Konsultasi Diet Pribadi">Konsultasi Pola Makan & Asuhan Gizi</option>
                  <option value="Diskusi Akademik">Diskusi Ilmiah Skripsi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Rincian Pesan</label>
                <textarea
                  id="contact-form-message"
                  required
                  rows={3}
                  placeholder="Tuliskan detail undangan, kualifikasi yang dibutuhkan, atau pertanyaan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-2.5 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors resize-none"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="flex-1 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>

                <button
                  type="button"
                  id="contact-form-wa-btn"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#FCE4EC] hover:bg-[#F8BBD0] border border-[#F8BBD0] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#2D2D2D]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
