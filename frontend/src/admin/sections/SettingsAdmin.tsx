import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

interface SectionVisibilityForm {
  skripsi: boolean;
  workbench: boolean;
  cases: boolean;
  rotations: boolean;
  media: boolean;
  skills: boolean;
}

const emptyForm: SectionVisibilityForm = {
  skripsi: true,
  workbench: true,
  cases: true,
  rotations: true,
  media: true,
  skills: true,
};

const sectionMeta: { key: keyof SectionVisibilityForm; label: string; desc: string }[] = [
  { key: 'skripsi', label: 'Riset Skripsi', desc: 'Section formulasi & uji lab skripsi.' },
  { key: 'workbench', label: 'Meja Dietisien (Kalkulator)', desc: 'Kalkulator interaktif BMR/TEE, juga menyembunyikan tombol "Kalkulator" di header.' },
  { key: 'cases', label: 'Kasus Klinis', desc: 'Studi kasus asuhan gizi (ADIME).' },
  { key: 'rotations', label: 'Rotasi Pengalaman', desc: 'Rotasi klinis & PKL rumah sakit.' },
  { key: 'media', label: 'Galeri Media', desc: 'Leaflet & infografis edukasi gizi.' },
  { key: 'skills', label: 'Kompetensi & Sertifikasi', desc: 'Keahlian klinis, software, dan sertifikat.' },
];

export const SettingsAdmin: React.FC = () => {
  const [form, setForm] = useState<SectionVisibilityForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings/sections')
      .then((res) => res.json())
      .then((data) => setForm({ ...emptyForm, ...data }))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  }, []);

  const toggle = (key: keyof SectionVisibilityForm) => {
    setForm((f) => ({ ...f, [key]: !f[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/settings/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan');
      }
      setForm({ ...emptyForm, ...data });
      setMessage({ type: 'success', text: 'Perubahan tersimpan.' });
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Gagal menyimpan.';
      setMessage({ type: 'error', text });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-[#666666]">Memuat data...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold mb-1">Pengaturan</h1>
      <p className="text-sm text-[#666666] mb-6">
        Aktifkan/nonaktifkan section mana yang tampil di halaman index publik. Section yang dimatikan
        juga otomatis hilang dari menu navigasi & footer, jadi pengunjung tidak akan melihat link mati.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {sectionMeta.map(({ key, label, desc }) => (
          <label
            key={key}
            className="flex items-start gap-3.5 bg-white border border-[#E8E0E3] rounded-2xl p-4 cursor-pointer hover:border-[#F8BBD0] transition-colors"
          >
            <input
              type="checkbox"
              checked={form[key]}
              onChange={() => toggle(key)}
              className="mt-0.5 w-4 h-4 accent-[#2D2D2D] cursor-pointer shrink-0"
            />
            <div>
              <span className="text-sm font-semibold text-[#2D2D2D] block">{label}</span>
              <span className="text-xs text-[#666666]">{desc}</span>
            </div>
          </label>
        ))}

        {message && (
          <p
            className={`text-xs px-3 py-2 rounded-xl border ${
              message.type === 'success'
                ? 'text-green-700 bg-green-50 border-green-200'
                : 'text-red-700 bg-red-50 border-red-200'
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          id="settings-save-btn"
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
};
