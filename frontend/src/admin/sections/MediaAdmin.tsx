import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { ListFieldEditor } from '../components/ListFieldEditor';

const categoryOptions = ['Leaflet Pasien', 'Poster Edukasi', 'Formulasi Pangan', 'Media Digital'] as const;

interface MediaForm {
  title: string;
  category: (typeof categoryOptions)[number];
  targetAudience: string;
  description: string;
  keyPoints: string[];
  thumbnailBg: string;
  accentColor: string;
  dimensions: string;
}

interface MediaDoc extends MediaForm {
  _id: string;
}

const emptyForm: MediaForm = {
  title: '',
  category: categoryOptions[0],
  targetAudience: '',
  description: '',
  keyPoints: [],
  thumbnailBg: 'from-[#FDE2E4] to-[#FAD2E1]',
  accentColor: '#E098AA',
  dimensions: '',
};

const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
const inputClass =
  'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';

export const MediaAdmin: React.FC = () => {
  const [items, setItems] = useState<MediaDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MediaForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadItems = () => {
    setIsLoading(true);
    fetch('/api/content/galeri')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage(null);
    setMode('form');
  };

  const startEdit = (m: MediaDoc) => {
    setEditingId(m._id);
    setForm({
      title: m.title,
      category: m.category,
      targetAudience: m.targetAudience,
      description: m.description,
      keyPoints: m.keyPoints,
      thumbnailBg: m.thumbnailBg,
      accentColor: m.accentColor,
      dimensions: m.dimensions,
    });
    setMessage(null);
    setMode('form');
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/content/galeri/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((m) => m._id !== id));
    }
    setDeleteConfirmId(null);
  };

  const updateField = <K extends keyof MediaForm>(field: K, value: MediaForm[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const url = editingId ? `/api/content/galeri/${editingId}` : '/api/content/galeri';
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
      setMessage({ type: 'success', text: 'Media tersimpan.' });
      setMode('list');
      loadItems();
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
            <h1 className="font-serif text-2xl font-bold mb-1">Galeri Media</h1>
            <p className="text-sm text-[#666666]">Dipakai di section Media Edukasi (Galeri).</p>
          </div>
          <button
            id="media-add-btn"
            onClick={startCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Media
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
        ) : items.length === 0 ? (
          <p className="text-sm text-[#666666]">Belum ada media. Klik "Tambah Media" untuk membuat yang pertama.</p>
        ) : (
          <div className="space-y-3">
            {items.map((m) => (
              <div
                key={m._id}
                className="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.thumbnailBg} border border-[#E8E0E3] shrink-0`}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#2D2D2D] bg-[#FCE4EC] px-2 py-0.5 rounded-full border border-[#F8BBD0]">
                      {m.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#2D2D2D] mt-1.5 truncate">{m.title}</h3>
                    <p className="text-xs text-[#666666] mt-0.5 truncate">{m.targetAudience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => startEdit(m)}
                    aria-label="Edit media"
                    className="p-2.5 rounded-lg hover:bg-[#FCE4EC] cursor-pointer"
                  >
                    <Pencil className="w-4 h-4 text-[#2D2D2D]" />
                  </button>
                  {deleteConfirmId === m._id ? (
                    <>
                      <button
                        onClick={() => handleDelete(m._id)}
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
                      onClick={() => setDeleteConfirmId(m._id)}
                      aria-label="Hapus media"
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
        <h1 className="font-serif text-2xl font-bold">{editingId ? 'Edit Media' : 'Tambah Media Baru'}</h1>
        <button
          onClick={() => setMode('list')}
          className="flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#2D2D2D] cursor-pointer"
        >
          <X className="w-4 h-4" /> Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>Judul</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kategori</label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value as MediaForm['category'])}
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
            <label className={labelClass}>Dimensi / Format</label>
            <input
              type="text"
              value={form.dimensions}
              onChange={(e) => updateField('dimensions', e.target.value)}
              className={inputClass}
              placeholder="mis. Trifold A4 / Siap Cetak"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Target Audiens</label>
          <input
            type="text"
            value={form.targetAudience}
            onChange={(e) => updateField('targetAudience', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Deskripsi</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <ListFieldEditor
          label="Poin Kunci Edukasi"
          items={form.keyPoints}
          onChange={(items) => updateField('keyPoints', items)}
          placeholder="Poin edukasi singkat"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Gradient Thumbnail (kelas Tailwind)</label>
            <input
              type="text"
              value={form.thumbnailBg}
              onChange={(e) => updateField('thumbnailBg', e.target.value)}
              className={inputClass}
              placeholder="from-[#FDE2E4] to-[#FAD2E1]"
            />
            <div className={`mt-2 h-12 rounded-xl bg-gradient-to-br ${form.thumbnailBg} border border-[#E8E0E3]`} />
          </div>
          <div>
            <label className={labelClass}>Warna Aksen (hex)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={form.accentColor}
                onChange={(e) => updateField('accentColor', e.target.value)}
                className={inputClass}
                placeholder="#E098AA"
              />
              <span
                className="w-10 h-10 rounded-xl border border-[#E8E0E3] shrink-0"
                style={{ backgroundColor: form.accentColor }}
              />
            </div>
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
          id="media-save-btn"
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          {isSaving ? 'Menyimpan...' : 'Simpan Media'}
        </button>
      </form>
    </div>
  );
};
