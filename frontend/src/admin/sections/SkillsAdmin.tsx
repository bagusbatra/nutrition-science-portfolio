import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  desc: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface SkillsForm {
  clinical: Skill[];
  foodService: Skill[];
  software: Skill[];
  certifications: Certification[];
}

const emptyForm: SkillsForm = {
  clinical: [],
  foodService: [],
  software: [],
  certifications: [],
};

const labelClass = 'block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
const smallInputClass =
  'w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]';

const SkillGroupEditor: React.FC<{
  label: string;
  items: Skill[];
  onChange: (items: Skill[]) => void;
}> = ({ label, items, onChange }) => {
  const addItem = () => onChange([...items, { name: '', level: '', desc: '' }]);
  const updateItem = (idx: number, patch: Partial<Skill>) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelClass}>{label}</span>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white border border-[#E8E0E3] rounded-xl p-3 space-y-2">
            <div className="grid grid-cols-[2fr_1fr_auto] gap-2 items-center">
              <input
                type="text"
                placeholder="Nama keahlian"
                value={it.name}
                onChange={(e) => updateItem(idx, { name: e.target.value })}
                className={smallInputClass}
              />
              <input
                type="text"
                placeholder="Level (mis. Mahir)"
                value={it.level}
                onChange={(e) => updateItem(idx, { level: e.target.value })}
                className={smallInputClass}
              />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                aria-label="Hapus keahlian"
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              placeholder="Deskripsi singkat"
              rows={2}
              value={it.desc}
              onChange={(e) => updateItem(idx, { desc: e.target.value })}
              className={`${smallInputClass} resize-none`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificationGroupEditor: React.FC<{
  items: Certification[];
  onChange: (items: Certification[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => onChange([...items, { name: '', issuer: '', year: '' }]);
  const updateItem = (idx: number, patch: Partial<Certification>) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelClass}>Sertifikat & Kredensial</span>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="grid grid-cols-[2fr_2fr_1fr_auto] gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
            <input
              type="text"
              placeholder="Nama sertifikat"
              value={it.name}
              onChange={(e) => updateItem(idx, { name: e.target.value })}
              className={smallInputClass}
            />
            <input
              type="text"
              placeholder="Penerbit"
              value={it.issuer}
              onChange={(e) => updateItem(idx, { issuer: e.target.value })}
              className={smallInputClass}
            />
            <input
              type="text"
              placeholder="Tahun"
              value={it.year}
              onChange={(e) => updateItem(idx, { year: e.target.value })}
              className={smallInputClass}
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              aria-label="Hapus sertifikat"
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsAdmin: React.FC = () => {
  const [form, setForm] = useState<SkillsForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/content/kompetensi')
      .then((res) => res.json())
      .then((data) => setForm({ ...emptyForm, ...data }))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  }, []);

  const updateField = <K extends keyof SkillsForm>(field: K, value: SkillsForm[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/content/kompetensi', {
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
      <h1 className="font-serif text-2xl font-bold mb-1">Kompetensi</h1>
      <p className="text-sm text-[#666666] mb-6">Dipakai di section Kompetensi & Sertifikasi.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <SkillGroupEditor
          label="Klinis & Asuhan Gizi"
          items={form.clinical}
          onChange={(items) => updateField('clinical', items)}
        />
        <SkillGroupEditor
          label="MSPM & Keamanan Pangan"
          items={form.foodService}
          onChange={(items) => updateField('foodService', items)}
        />
        <SkillGroupEditor
          label="Software & Komputasi"
          items={form.software}
          onChange={(items) => updateField('software', items)}
        />
        <CertificationGroupEditor
          items={form.certifications}
          onChange={(items) => updateField('certifications', items)}
        />

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
          id="skills-save-btn"
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
