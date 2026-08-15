import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  sub: string;
}

interface PersonalInfoForm {
  name: string;
  title: string;
  tagline: string;
  university: string;
  faculty: string;
  gpa: string;
  status: string;
  targetGraduation: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  bio: string;
  stats: Stat[];
}

const emptyForm: PersonalInfoForm = {
  name: '', title: '', tagline: '', university: '', faculty: '', gpa: '', status: '',
  targetGraduation: '', email: '', phone: '', linkedin: '', location: '', bio: '', stats: [],
};

const textFields: { key: keyof PersonalInfoForm; label: string }[] = [
  { key: 'name', label: 'Nama Lengkap' },
  { key: 'title', label: 'Gelar / Titel' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'university', label: 'Universitas' },
  { key: 'faculty', label: 'Fakultas / Program Studi' },
  { key: 'gpa', label: 'IPK' },
  { key: 'status', label: 'Status Studi' },
  { key: 'targetGraduation', label: 'Target Kelulusan' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'No. Telepon' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'location', label: 'Lokasi' },
];

export const PersonalInfoAdmin: React.FC = () => {
  const [form, setForm] = useState<PersonalInfoForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/content/identitas')
      .then((res) => res.json())
      .then((data) => setForm({ ...emptyForm, ...data }))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  }, []);

  const updateField = (field: keyof PersonalInfoForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setForm((f) => {
      const stats = [...f.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...f, stats };
    });
  };

  const addStat = () => {
    setForm((f) => ({ ...f, stats: [...f.stats, { label: '', value: '', sub: '' }] }));
  };

  const removeStat = (index: number) => {
    setForm((f) => ({ ...f, stats: f.stats.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/content/identitas', {
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
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl font-bold mb-1">Identitas</h1>
      <p className="text-sm text-[#666666] mb-6">
        Dipakai di Hero, Header, Footer, modal Kontak, dan modal CV.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {textFields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
                {f.label}
              </label>
              <input
                id={`personal-info-${f.key}`}
                type="text"
                value={form[f.key] as string}
                onChange={(e) => updateField(f.key, e.target.value)}
                className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
            Bio
          </label>
          <textarea
            id="personal-info-bio"
            rows={4}
            value={form.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
              Statistik Ringkas (Hero)
            </label>
            <button
              id="personal-info-add-stat-btn"
              type="button"
              onClick={addStat}
              className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>
          <div className="space-y-2">
            {form.stats.map((stat, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                <input
                  type="text"
                  placeholder="Value (mis. 3.89)"
                  value={stat.value}
                  onChange={(e) => updateStat(idx, 'value', e.target.value)}
                  className="w-28 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => updateStat(idx, 'label', e.target.value)}
                  className="flex-1 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs"
                />
                <input
                  type="text"
                  placeholder="Sub-label"
                  value={stat.sub}
                  onChange={(e) => updateStat(idx, 'sub', e.target.value)}
                  className="flex-1 bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  aria-label="Hapus statistik"
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

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
          id="personal-info-save-btn"
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
