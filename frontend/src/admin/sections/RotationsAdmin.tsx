import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { ListFieldEditor } from '../components/ListFieldEditor';

const categoryOptions = [
  'Klinis (Dietetik RS)',
  'MSPM (Food Service)',
  'Gizi Masyarakat (Puskesmas)',
  'Akademik & Riset',
] as const;

const iconOptions = ['Stethoscope', 'UtensilsCrossed', 'HeartPulse', 'FlaskConical'] as const;

interface RotationForm {
  category: (typeof categoryOptions)[number];
  institution: string;
  period: string;
  role: string;
  location: string;
  badges: string[];
  achievements: string[];
  highlightMetric: string;
  iconName: (typeof iconOptions)[number];
}

interface RotationDoc extends RotationForm {
  _id: string;
}

const emptyForm: RotationForm = {
  category: categoryOptions[0],
  institution: '',
  period: '',
  role: '',
  location: '',
  badges: [],
  achievements: [],
  highlightMetric: '',
  iconName: iconOptions[0],
};

const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
const inputClass =
  'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';

export const RotationsAdmin: React.FC = () => {
  const [rotations, setRotations] = useState<RotationDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RotationForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadRotations = () => {
    setIsLoading(true);
    fetch('/api/content/rotasi')
      .then((res) => res.json())
      .then((data) => setRotations(data))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadRotations();
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage(null);
    setMode('form');
  };

  const startEdit = (r: RotationDoc) => {
    setEditingId(r._id);
    setForm({
      category: r.category,
      institution: r.institution,
      period: r.period,
      role: r.role,
      location: r.location,
      badges: r.badges,
      achievements: r.achievements,
      highlightMetric: r.highlightMetric,
      iconName: r.iconName,
    });
    setMessage(null);
    setMode('form');
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/content/rotasi/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setRotations((prev) => prev.filter((r) => r._id !== id));
    }
    setDeleteConfirmId(null);
  };

  const updateField = <K extends keyof RotationForm>(field: K, value: RotationForm[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const url = editingId ? `/api/content/rotasi/${editingId}` : '/api/content/rotasi';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan');
      }
      setMessage({ type: 'success', text: 'Rotasi tersimpan.' });
      setMode('list');
      loadRotations();
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Gagal menyimpan.';
      setMessage({ type: 'error', text });
    } finally {
      setIsSaving(false);
    }
  };

  if (mode === 'list') {
    return (
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold mb-1">Rotasi Pengalaman</h1>
            <p className="text-sm text-[#666666]">Dipakai di section Rotasi PKL, dan modal CV.</p>
          </div>
          <button
            id="rotation-add-btn"
            onClick={startCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Rotasi
          </button>
        </div>

        {message && (
          <p
            className={`text-xs px-3 py-2 rounded-xl border mb-4 ${
              message.type === 'success'
                ? 'text-green-700 bg-green-50 border-green-200'
                : 'text-red-700 bg-red-50 border-red-200'
            }`}
          >
            {message.text}
          </p>
        )}

        {isLoading ? (
          <p className="text-sm text-[#666666]">Memuat data...</p>
        ) : rotations.length === 0 ? (
          <p className="text-sm text-[#666666]">Belum ada data rotasi. Klik "Tambah Rotasi" untuk membuat yang pertama.</p>
        ) : (
          <div className="space-y-3">
            {rotations.map((r) => (
              <div
                key={r._id}
                className="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#2D2D2D] bg-[#FCE4EC] px-2 py-0.5 rounded-full border border-[#F8BBD0]">
                    {r.category}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#2D2D2D] mt-1.5 truncate">{r.role}</h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    {r.institution} — {r.location} · {r.period}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => startEdit(r)}
                    aria-label="Edit rotasi"
                    className="p-2.5 rounded-lg hover:bg-[#FCE4EC] cursor-pointer"
                  >
                    <Pencil className="w-4 h-4 text-[#2D2D2D]" />
                  </button>
                  {deleteConfirmId === r._id ? (
                    <>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-xs font-semibold text-red-600 px-2.5 py-2 rounded-lg hover:bg-red-50 cursor-pointer"
                      >
                        Ya, hapus
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-xs text-[#666666] px-2.5 py-2 cursor-pointer"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(r._id)}
                      aria-label="Hapus rotasi"
                      className="p-2.5 rounded-lg hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">{editingId ? 'Edit Rotasi' : 'Tambah Rotasi Baru'}</h1>
        <button
          onClick={() => setMode('list')}
          className="flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#2D2D2D] cursor-pointer"
        >
          <X className="w-4 h-4" /> Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kategori</label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value as RotationForm['category'])}
              className={inputClass}
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ikon</label>
            <select
              value={form.iconName}
              onChange={(e) => updateField('iconName', e.target.value as RotationForm['iconName'])}
              className={inputClass}
            >
              {iconOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Peran / Jabatan</label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => updateField('role', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Institusi</label>
            <input
              type="text"
              value={form.institution}
              onChange={(e) => updateField('institution', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Lokasi</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Periode</label>
            <input
              type="text"
              value={form.period}
              onChange={(e) => updateField('period', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Pencapaian Kunci (Highlight Metric)</label>
            <input
              type="text"
              value={form.highlightMetric}
              onChange={(e) => updateField('highlightMetric', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <ListFieldEditor
          label="Badge Kompetensi"
          items={form.badges}
          onChange={(items) => updateField('badges', items)}
          placeholder="mis. PAGT / NCP"
        />

        <ListFieldEditor
          label="Pencapaian (Achievements)"
          items={form.achievements}
          onChange={(items) => updateField('achievements', items)}
          placeholder="Deskripsi pencapaian"
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
          id="rotation-save-btn"
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          {isSaving ? 'Menyimpan...' : 'Simpan Rotasi'}
        </button>
      </form>
    </div>
  );
};
