import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { ListFieldEditor } from '../components/ListFieldEditor';

interface Biokimia {
  test: string;
  result: string;
  normal: string;
  status: 'normal' | 'high' | 'low';
}

interface MenuItem {
  waktu: string;
  menu: string;
  komposisi: string;
}

interface CaseForm {
  code: string;
  title: string;
  patientProfile: {
    initial: string;
    age: number;
    gender: 'Laki-laki' | 'Perempuan';
    room: string;
    medicalDiagnosis: string;
    dietOrder: string;
  };
  adime: {
    assessment: {
      antropometri: string;
      biokimia: Biokimia[];
      fisikKlinis: string;
      dietaryHistory: string;
    };
    diagnosisPES: {
      problem: string;
      etiology: string;
      signsSymptoms: string;
      formattedPES: string;
    };
    intervention: {
      tujuanDiet: string[];
      prinsipSyaratDiet: string[];
      perhitunganKebutuhan: {
        energi: string;
        protein: string;
        lemak: string;
        karbohidrat: string;
        cairan: string;
      };
      menuContoh: MenuItem[];
    };
    monitoringEvaluasi: string[];
    keyLearning: string;
  };
}

interface CaseDoc extends CaseForm {
  _id: string;
}

const emptyForm: CaseForm = {
  code: '',
  title: '',
  patientProfile: { initial: '', age: 0, gender: 'Perempuan', room: '', medicalDiagnosis: '', dietOrder: '' },
  adime: {
    assessment: { antropometri: '', biokimia: [], fisikKlinis: '', dietaryHistory: '' },
    diagnosisPES: { problem: '', etiology: '', signsSymptoms: '', formattedPES: '' },
    intervention: {
      tujuanDiet: [],
      prinsipSyaratDiet: [],
      perhitunganKebutuhan: { energi: '', protein: '', lemak: '', karbohidrat: '', cairan: '' },
      menuContoh: [],
    },
    monitoringEvaluasi: [],
    keyLearning: '',
  },
};

const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]';
const inputClass =
  'w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]';
const smallInputClass =
  'w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]';
const legendClass = 'text-xs font-bold uppercase tracking-wider text-[#2D2D2D] mb-3 block';

export const ClinicalCasesAdmin: React.FC = () => {
  const [cases, setCases] = useState<CaseDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CaseForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadCases = () => {
    setIsLoading(true);
    fetch('/api/content/kasus')
      .then((res) => res.json())
      .then((data) => setCases(data))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCases();
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage(null);
    setMode('form');
  };

  const startEdit = (c: CaseDoc) => {
    setEditingId(c._id);
    setForm({
      code: c.code,
      title: c.title,
      patientProfile: c.patientProfile,
      adime: { ...c.adime, keyLearning: c.adime.keyLearning || '' },
    });
    setMessage(null);
    setMode('form');
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/content/kasus/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCases((prev) => prev.filter((c) => c._id !== id));
    }
    setDeleteConfirmId(null);
  };

  const updateProfile = <K extends keyof CaseForm['patientProfile']>(field: K, value: CaseForm['patientProfile'][K]) => {
    setForm((f) => ({ ...f, patientProfile: { ...f.patientProfile, [field]: value } }));
  };

  const updateAssessment = <K extends keyof CaseForm['adime']['assessment']>(
    field: K,
    value: CaseForm['adime']['assessment'][K]
  ) => {
    setForm((f) => ({ ...f, adime: { ...f.adime, assessment: { ...f.adime.assessment, [field]: value } } }));
  };

  const updateDiagnosis = <K extends keyof CaseForm['adime']['diagnosisPES']>(
    field: K,
    value: CaseForm['adime']['diagnosisPES'][K]
  ) => {
    setForm((f) => ({ ...f, adime: { ...f.adime, diagnosisPES: { ...f.adime.diagnosisPES, [field]: value } } }));
  };

  const updateKebutuhan = (field: keyof CaseForm['adime']['intervention']['perhitunganKebutuhan'], value: string) => {
    setForm((f) => ({
      ...f,
      adime: {
        ...f.adime,
        intervention: {
          ...f.adime.intervention,
          perhitunganKebutuhan: { ...f.adime.intervention.perhitunganKebutuhan, [field]: value },
        },
      },
    }));
  };

  const updateInterventionList = (field: 'tujuanDiet' | 'prinsipSyaratDiet', items: string[]) => {
    setForm((f) => ({ ...f, adime: { ...f.adime, intervention: { ...f.adime.intervention, [field]: items } } }));
  };

  const updateMonitoring = (items: string[]) => {
    setForm((f) => ({ ...f, adime: { ...f.adime, monitoringEvaluasi: items } }));
  };

  const updateKeyLearning = (value: string) => {
    setForm((f) => ({ ...f, adime: { ...f.adime, keyLearning: value } }));
  };

  const addBiokimia = () => {
    setForm((f) => ({
      ...f,
      adime: {
        ...f.adime,
        assessment: {
          ...f.adime.assessment,
          biokimia: [...f.adime.assessment.biokimia, { test: '', result: '', normal: '', status: 'normal' }],
        },
      },
    }));
  };

  const updateBiokimia = (idx: number, patch: Partial<Biokimia>) => {
    setForm((f) => {
      const biokimia = [...f.adime.assessment.biokimia];
      biokimia[idx] = { ...biokimia[idx], ...patch };
      return { ...f, adime: { ...f.adime, assessment: { ...f.adime.assessment, biokimia } } };
    });
  };

  const removeBiokimia = (idx: number) => {
    setForm((f) => ({
      ...f,
      adime: {
        ...f.adime,
        assessment: { ...f.adime.assessment, biokimia: f.adime.assessment.biokimia.filter((_, i) => i !== idx) },
      },
    }));
  };

  const addMenuItem = () => {
    setForm((f) => ({
      ...f,
      adime: {
        ...f.adime,
        intervention: {
          ...f.adime.intervention,
          menuContoh: [...f.adime.intervention.menuContoh, { waktu: '', menu: '', komposisi: '' }],
        },
      },
    }));
  };

  const updateMenuItem = (idx: number, patch: Partial<MenuItem>) => {
    setForm((f) => {
      const menuContoh = [...f.adime.intervention.menuContoh];
      menuContoh[idx] = { ...menuContoh[idx], ...patch };
      return { ...f, adime: { ...f.adime, intervention: { ...f.adime.intervention, menuContoh } } };
    });
  };

  const removeMenuItem = (idx: number) => {
    setForm((f) => ({
      ...f,
      adime: {
        ...f.adime,
        intervention: {
          ...f.adime.intervention,
          menuContoh: f.adime.intervention.menuContoh.filter((_, i) => i !== idx),
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const url = editingId ? `/api/content/kasus/${editingId}` : '/api/content/kasus';
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
      setMessage({ type: 'success', text: 'Kasus tersimpan.' });
      setMode('list');
      loadCases();
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
            <h1 className="font-serif text-2xl font-bold mb-1">Kasus Klinis</h1>
            <p className="text-sm text-[#666666]">Dipakai di section Kasus PAGT (ADIME).</p>
          </div>
          <button
            id="clinical-case-add-btn"
            onClick={startCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Kasus
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
        ) : cases.length === 0 ? (
          <p className="text-sm text-[#666666]">Belum ada kasus klinis. Klik "Tambah Kasus" untuk membuat yang pertama.</p>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <div
                key={c._id}
                className="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#2D2D2D] bg-[#FCE4EC] px-2 py-0.5 rounded-full border border-[#F8BBD0]">
                    {c.code}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#2D2D2D] mt-1.5 truncate">{c.title}</h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    {c.patientProfile.initial}, {c.patientProfile.age} th ({c.patientProfile.gender}) —{' '}
                    {c.patientProfile.room}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => startEdit(c)}
                    aria-label="Edit kasus"
                    className="p-2.5 rounded-lg hover:bg-[#FCE4EC] cursor-pointer"
                  >
                    <Pencil className="w-4 h-4 text-[#2D2D2D]" />
                  </button>
                  {deleteConfirmId === c._id ? (
                    <>
                      <button
                        onClick={() => handleDelete(c._id)}
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
                      onClick={() => setDeleteConfirmId(c._id)}
                      aria-label="Hapus kasus"
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
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">{editingId ? 'Edit Kasus' : 'Tambah Kasus Baru'}</h1>
        <button
          onClick={() => setMode('list')}
          className="flex items-center gap-1 text-xs font-semibold text-[#666666] hover:text-[#2D2D2D] cursor-pointer"
        >
          <X className="w-4 h-4" /> Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kode Kasus</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Judul Kasus</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>

        <fieldset>
          <legend className={legendClass}>Profil Pasien</legend>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Inisial</label>
                <input
                  type="text"
                  value={form.patientProfile.initial}
                  onChange={(e) => updateProfile('initial', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Usia</label>
                <input
                  type="number"
                  value={form.patientProfile.age}
                  onChange={(e) => updateProfile('age', Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Jenis Kelamin</label>
                <select
                  value={form.patientProfile.gender}
                  onChange={(e) => updateProfile('gender', e.target.value as CaseForm['patientProfile']['gender'])}
                  className={inputClass}
                >
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Ruang Rawat</label>
              <input
                type="text"
                value={form.patientProfile.room}
                onChange={(e) => updateProfile('room', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Diagnosis Medis</label>
              <input
                type="text"
                value={form.patientProfile.medicalDiagnosis}
                onChange={(e) => updateProfile('medicalDiagnosis', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Preskripsi Diet</label>
              <input
                type="text"
                value={form.patientProfile.dietOrder}
                onChange={(e) => updateProfile('dietOrder', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={legendClass}>Assessment (Pengkajian)</legend>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Antropometri</label>
              <textarea
                rows={2}
                value={form.adime.assessment.antropometri}
                onChange={(e) => updateAssessment('antropometri', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Fisik & Klinis</label>
              <textarea
                rows={2}
                value={form.adime.assessment.fisikKlinis}
                onChange={(e) => updateAssessment('fisikKlinis', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Riwayat Gizi (Dietary History)</label>
              <textarea
                rows={2}
                value={form.adime.assessment.dietaryHistory}
                onChange={(e) => updateAssessment('dietaryHistory', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={labelClass + ' mb-0'}>Data Biokimia / Laboratorium</span>
                <button
                  type="button"
                  onClick={addBiokimia}
                  className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Baris
                </button>
              </div>
              <div className="space-y-2">
                {form.adime.assessment.biokimia.map((b, idx) => (
                  <div key={idx} className="grid grid-cols-5 gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                    <input
                      type="text"
                      placeholder="Parameter"
                      value={b.test}
                      onChange={(e) => updateBiokimia(idx, { test: e.target.value })}
                      className={smallInputClass}
                    />
                    <input
                      type="text"
                      placeholder="Hasil"
                      value={b.result}
                      onChange={(e) => updateBiokimia(idx, { result: e.target.value })}
                      className={smallInputClass}
                    />
                    <input
                      type="text"
                      placeholder="Nilai normal"
                      value={b.normal}
                      onChange={(e) => updateBiokimia(idx, { normal: e.target.value })}
                      className={smallInputClass}
                    />
                    <select
                      value={b.status}
                      onChange={(e) => updateBiokimia(idx, { status: e.target.value as Biokimia['status'] })}
                      className={smallInputClass}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">Tinggi</option>
                      <option value="low">Rendah</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeBiokimia(idx)}
                      aria-label="Hapus baris biokimia"
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer justify-self-end"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={legendClass}>Diagnosis Gizi (PES)</legend>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Problem (P)</label>
              <textarea
                rows={2}
                value={form.adime.diagnosisPES.problem}
                onChange={(e) => updateDiagnosis('problem', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Etiology (E)</label>
              <textarea
                rows={2}
                value={form.adime.diagnosisPES.etiology}
                onChange={(e) => updateDiagnosis('etiology', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Signs / Symptoms (S)</label>
              <textarea
                rows={2}
                value={form.adime.diagnosisPES.signsSymptoms}
                onChange={(e) => updateDiagnosis('signsSymptoms', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Kalimat PES Lengkap</label>
              <textarea
                rows={2}
                value={form.adime.diagnosisPES.formattedPES}
                onChange={(e) => updateDiagnosis('formattedPES', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={legendClass}>Intervensi Gizi</legend>
          <div className="space-y-4">
            <div>
              <span className={labelClass}>Preskripsi Kebutuhan Zat Gizi</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <input
                  type="text"
                  placeholder="Energi"
                  value={form.adime.intervention.perhitunganKebutuhan.energi}
                  onChange={(e) => updateKebutuhan('energi', e.target.value)}
                  className={smallInputClass}
                />
                <input
                  type="text"
                  placeholder="Protein"
                  value={form.adime.intervention.perhitunganKebutuhan.protein}
                  onChange={(e) => updateKebutuhan('protein', e.target.value)}
                  className={smallInputClass}
                />
                <input
                  type="text"
                  placeholder="Lemak"
                  value={form.adime.intervention.perhitunganKebutuhan.lemak}
                  onChange={(e) => updateKebutuhan('lemak', e.target.value)}
                  className={smallInputClass}
                />
                <input
                  type="text"
                  placeholder="Karbohidrat"
                  value={form.adime.intervention.perhitunganKebutuhan.karbohidrat}
                  onChange={(e) => updateKebutuhan('karbohidrat', e.target.value)}
                  className={smallInputClass}
                />
                <input
                  type="text"
                  placeholder="Cairan"
                  value={form.adime.intervention.perhitunganKebutuhan.cairan}
                  onChange={(e) => updateKebutuhan('cairan', e.target.value)}
                  className={smallInputClass}
                />
              </div>
            </div>

            <ListFieldEditor
              label="Tujuan Diet"
              items={form.adime.intervention.tujuanDiet}
              onChange={(items) => updateInterventionList('tujuanDiet', items)}
            />
            <ListFieldEditor
              label="Prinsip & Syarat Diet"
              items={form.adime.intervention.prinsipSyaratDiet}
              onChange={(items) => updateInterventionList('prinsipSyaratDiet', items)}
            />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={labelClass + ' mb-0'}>Menu Contoh Sehari</span>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Menu
                </button>
              </div>
              <div className="space-y-2">
                {form.adime.intervention.menuContoh.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 items-center bg-white border border-[#E8E0E3] rounded-xl p-2.5">
                    <input
                      type="text"
                      placeholder="Waktu"
                      value={m.waktu}
                      onChange={(e) => updateMenuItem(idx, { waktu: e.target.value })}
                      className={smallInputClass}
                    />
                    <input
                      type="text"
                      placeholder="Menu"
                      value={m.menu}
                      onChange={(e) => updateMenuItem(idx, { menu: e.target.value })}
                      className={smallInputClass}
                    />
                    <input
                      type="text"
                      placeholder="Komposisi gizi"
                      value={m.komposisi}
                      onChange={(e) => updateMenuItem(idx, { komposisi: e.target.value })}
                      className={smallInputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeMenuItem(idx)}
                      aria-label="Hapus menu"
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={legendClass}>Monitoring & Evaluasi</legend>
          <div className="space-y-3">
            <ListFieldEditor
              label="Rencana Monitoring"
              items={form.adime.monitoringEvaluasi}
              onChange={updateMonitoring}
            />
            <div>
              <label className={labelClass}>Refleksi / Pembelajaran Klinis</label>
              <textarea
                rows={2}
                value={form.adime.keyLearning}
                onChange={(e) => updateKeyLearning(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </fieldset>

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
          id="clinical-case-save-btn"
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          {isSaving ? 'Menyimpan...' : 'Simpan Kasus'}
        </button>
      </form>
    </div>
  );
};
