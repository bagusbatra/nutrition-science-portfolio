import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartHandshake,
  Send,
  Sparkles,
  MessageSquareHeart,
  Award,
  Check,
  User,
  Smile,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookEntry } from '../types';

interface ThesisSupportGuestbookProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThesisSupportGuestbook: React.FC<ThesisSupportGuestbookProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Rekan / Pengunjung');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌸');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/guestbook')
      .then((res) => res.json())
      .then((data) =>
        setEntries(
          data.map((entry: any) => ({
            id: entry._id,
            name: entry.name,
            role: entry.role,
            message: entry.message,
            emoji: entry.emoji,
            timestamp: new Date(entry.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          }))
        )
      )
      .catch((err) => console.error('Failed to load guestbook entries', err));
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          message: message.trim(),
          emoji: selectedEmoji,
        }),
      });
      const saved = await res.json();

      const newEntry: GuestbookEntry = {
        id: saved._id,
        name: saved.name,
        role: saved.role,
        message: saved.message,
        emoji: saved.emoji,
        timestamp: new Date(saved.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };

      setEntries([newEntry, ...entries]);
      setName('');
      setMessage('');
      setSubmitted(true);

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#A73E5B', '#FAD2E1', '#E098AA', '#FFF0F3']
      });

      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      console.error('Failed to submit guestbook entry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const emojiOptions = ['🌸', '🩺', '✨', '🥗', '🎓', '💪', '💖', '🌿'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#F9F5F6] rounded-[32px] max-w-5xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 border border-[#E8E0E3] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs font-semibold uppercase tracking-wider mb-3">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Community Support & Thesis Defense Wall</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2D2D] tracking-tight">
                Buku Tamu & <span className="italic text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-4 underline-offset-8">Dukungan Sidang</span>
              </h2>
              <p className="text-sm text-[#666666] mt-3 max-w-2xl font-light">
                Tinggalkan pesan semangat, masukan ilmiah, atau ucapan selamat untuk Nadhira menjelang ujian sidang sarjana gizi.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono bg-white px-4 py-2 rounded-full border border-[#E8E0E3] text-[#2D2D2D] font-bold uppercase tracking-wider text-[11px]">
                {entries.length} Pesan Tersimpan
              </span>
              <button
                id="guestbook-modal-close-x"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#FCE4EC] text-[#2D2D2D] flex items-center justify-center font-bold text-sm cursor-pointer border border-[#E8E0E3] transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Column Grid: Submission Form vs Live Message Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 bg-white rounded-[32px] border border-[#E8E0E3] p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] mb-1">
              Kirim Pesan & Doa Semangat
            </h3>
            <p className="text-xs text-[#666666] mb-6">
              Pesan Anda akan langsung disematkan pada papan portofolio ini.
            </p>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-4 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] text-[#2D2D2D] text-xs flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-[#2D2D2D] shrink-0" />
                <span className="font-medium">Terima kasih! Pesan hangat Anda telah berhasil disematkan. ✨</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Nama Lengkap</label>
                <input
                  id="guestbook-input-name"
                  type="text"
                  required
                  placeholder="Contoh: Tiara / Dr. Budi / Rekan Magang"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Peran / Hubungan</label>
                <select
                  id="guestbook-select-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
                >
                  <option value="Rekan / Pengunjung">Pengunjung Web / HR Recruiter</option>
                  <option value="Teman Angkatan Gizi UI">Teman Seperjuangan Gizi UI</option>
                  <option value="Dosen / Penguji / Mentor">Dosen / Preseptor RS</option>
                  <option value="Keluarga & Sahabat">Keluarga & Sahabat</option>
                  <option value="Junior / Mahasiswa Gizi">Junior Mahasiswa Gizi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Pilih Icon Emoji</label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((em) => (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      key={em}
                      onClick={() => setSelectedEmoji(em)}
                      className={`w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer ${
                        selectedEmoji === em 
                          ? 'bg-[#FCE4EC] border-2 border-[#2D2D2D] scale-105 shadow-xs' 
                          : 'bg-[#F9F5F6] border border-[#E8E0E3] hover:bg-[#FCE4EC]'
                      }`}
                    >
                      {em}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">Isi Pesan Semangat</label>
                <textarea
                  id="guestbook-input-message"
                  required
                  rows={3}
                  placeholder="Tuliskan ucapan semangat untuk sidang skripsi atau kesan terhadap portofolio Nadhira..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                id="guestbook-submit-btn"
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Dukungan</span>
              </motion.button>
            </form>
          </div>

          {/* Right Column: Live Message Cards */}
          <div className="lg:col-span-7 space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 sm:p-5 bg-white rounded-[28px] border border-[#E8E0E3] shadow-xs flex items-start gap-3.5 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-lg sm:text-xl shrink-0">
                    {entry.emoji || '🌸'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2D2D] truncate">
                        {entry.name}
                      </h4>
                      <span className="text-[10px] text-[#8E8E8E] font-mono shrink-0">
                        {entry.timestamp}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2 truncate max-w-full">
                      {entry.role}
                    </span>

                    <p className="text-xs text-[#4A4A4A] leading-relaxed italic">
                      "{entry.message}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

