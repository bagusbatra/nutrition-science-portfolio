import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { ListFieldEditor } from '../components/ListFieldEditor';

interface OrganolepticScore {
  warna: number;
  aroma: number;
  rasa: number;
  tekstur: number;
  overall: number;
}

interface Proximate {
  fe: number;
  protein: number;
  serat: number;
  lemak: number;
  energi: number;
}

interface Formulation {
  code: string;
  ratio: string;
  kelorPercent: number;
  bekatulPercent: number;
  mocafPercent: number;
  organolepticScore: OrganolepticScore;
  proximate: Proximate;
  isBestChoice?: boolean;
}

interface SkripsiForm {
  title: string;
  subTitle: string;
  advisor: string[];
  status: string;
  completionDate: string;
  abstract: string;
  hypotheses: string[];
  formulations: Formulation[];
  keyTakeaways: string[];
}

const emptyFormulation: Formulation = {
  code: '',
  ratio: '',
  kelorPercent: 0,
  bekatulPercent: 0,
  mocafPercent: 0,
  organolepticScore: { warna: 0, aroma: 0, rasa: 0, tekstur: 0, overall: 0 },
  proximate: { fe: 0, protein: 0, serat: 0, lemak: 0, energi: 0 },
  isBestChoice: false,
};

const emptyForm: SkripsiForm = {
  title: '', subTitle: '', advisor: [], status: '', completionDate: '', abstract: '',
  hypotheses: [], formulations: [], keyTakeaways: [],
};

const numInputClass =
  'w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2D2D2D]';

const NumField: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <span className="text-[9px] text-[#8E8E8E] block mb-0.5">{label}</span>
    <input
      type="number"
      step="any"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={numInputClass}
    />
  </div>
);

export const SkripsiAdmin: React.FC = () => {
  const [form, setForm] = useState<SkripsiForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/content/skripsi')
      .then((res) => res.json())
      .then((data) => setForm({ ...emptyForm, ...data }))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  }, []);

  const updateField = <K extends keyof SkripsiForm>(field: K, value: SkripsiForm[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const updateFormulation = (index: number, patch: Partial<Formulation>) => {
    setForm((f) => {
      const formulations = [...f.formulations];
      formulations[index] = { ...formulations[index], ...patch };
      return { ...f, formulations };
    });
  };

  const updateOrganoleptic = (index: number, field: keyof OrganolepticScore, value: number) => {
    setForm((f) => {
      const formulations = [...f.formulations];
      formulations[index] = {
        ...formulations[index],
        organolepticScore: { ...formulations[index].organolepticScore, [field]: value },
      };
      return { ...f, formulations };
    });
  };

  const updateProximate = (index: number, field: keyof Proximate, value: number) => {
    setForm((f) => {
      const formulations = [...f.formulations];
      formulations[index] = {
        ...formulations[index],
        proximate: { ...formulations[index].proximate, [field]: value },
      };
      return { ...f, formulations };
    });
  };

  const addFormulation = () => {
    setForm((f) => ({ ...f, formulations: [...f.formulations, { ...emptyFormulation }] }));
  };

  const removeFormulation = (index: number) => {
    setForm((f) => ({ ...f, formulations: f.formulations.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/content/skripsi', {
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
    <div className="max-w-4xl">
      <h1 className="font-serif text-2xl font-bold mb-1">Riset Skripsi</h1>
      <p className="text-sm text-[#666666] mb-6">Dipakai di section Riset Skripsi & Lab, dan modal CV.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
            Judul Skripsi
          </label>
          <textarea
            rows={2}
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
            Sub-judul
          </label>
          <textarea
            rows={2}
            value={form.subTitle}
            onChange={(e) => updateField('subTitle', e.target.value)}
            className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
              Status
            </label>
            <input
              type="text"
              value={form.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
              Target Selesai
            </label>
            <input
              type="text"
              value={form.completionDate}
              onChange={(e) => updateField('completionDate', e.target.value)}
              className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
            Abstrak
          </label>
          <textarea
            rows={5}
            value={form.abstract}
            onChange={(e) => updateField('abstract', e.target.value)}
            className="w-full bg-white border border-[#E8E0E3] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2D2D2D] resize-none"
          />
        </div>

        <ListFieldEditor
          label="Dosen Pembimbing"
          items={form.advisor}
          onChange={(items) => updateField('advisor', items)}
          placeholder="Nama dosen pembimbing"
        />

        <ListFieldEditor
          label="Hipotesis"
          items={form.hypotheses}
          onChange={(items) => updateField('hypotheses', items)}
          placeholder="Pernyataan hipotesis"
        />

        <ListFieldEditor
          label="Temuan Kunci"
          items={form.keyTakeaways}
          onChange={(items) => updateField('keyTakeaways', items)}
          placeholder="Poin temuan kunci"
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
              Formulasi Uji Coba
            </label>
            <button
              id="skripsi-add-formulation-btn"
              type="button"
              onClick={addFormulation}
              className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Formulasi
            </button>
          </div>

          <div className="space-y-4">
            {form.formulations.map((formula, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0E3] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2D2D2D]">Formulasi #{idx + 1}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-[#666666] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formula.isBestChoice}
                        onChange={(e) => updateFormulation(idx, { isBestChoice: e.target.checked })}
                      />
                      Formula Terpilih
                    </label>
                    <button
                      type="button"
                      onClick={() => removeFormulation(idx)}
                      aria-label="Hapus formulasi"
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Kode (mis. F2 (Formulasi Terpilih ⭐))"
                    value={formula.code}
                    onChange={(e) => updateFormulation(idx, { code: e.target.value })}
                    className={numInputClass}
                  />
                  <input
                    type="text"
                    placeholder="Rasio (mis. 70% Mocaf : 15% Kelor : 15% Bekatul)"
                    value={formula.ratio}
                    onChange={(e) => updateFormulation(idx, { ratio: e.target.value })}
                    className={numInputClass}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <NumField
                    label="Kelor %"
                    value={formula.kelorPercent}
                    onChange={(v) => updateFormulation(idx, { kelorPercent: v })}
                  />
                  <NumField
                    label="Bekatul %"
                    value={formula.bekatulPercent}
                    onChange={(v) => updateFormulation(idx, { bekatulPercent: v })}
                  />
                  <NumField
                    label="Mocaf %"
                    value={formula.mocafPercent}
                    onChange={(v) => updateFormulation(idx, { mocafPercent: v })}
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-1">
                    Skor Organoleptik (skala 1-5)
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    <NumField
                      label="Warna"
                      value={formula.organolepticScore.warna}
                      onChange={(v) => updateOrganoleptic(idx, 'warna', v)}
                    />
                    <NumField
                      label="Aroma"
                      value={formula.organolepticScore.aroma}
                      onChange={(v) => updateOrganoleptic(idx, 'aroma', v)}
                    />
                    <NumField
                      label="Rasa"
                      value={formula.organolepticScore.rasa}
                      onChange={(v) => updateOrganoleptic(idx, 'rasa', v)}
                    />
                    <NumField
                      label="Tekstur"
                      value={formula.organolepticScore.tekstur}
                      onChange={(v) => updateOrganoleptic(idx, 'tekstur', v)}
                    />
                    <NumField
                      label="Overall"
                      value={formula.organolepticScore.overall}
                      onChange={(v) => updateOrganoleptic(idx, 'overall', v)}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#8E8E8E] block mb-1">
                    Proksimat (per 100 gram)
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    <NumField
                      label="Fe (mg)"
                      value={formula.proximate.fe}
                      onChange={(v) => updateProximate(idx, 'fe', v)}
                    />
                    <NumField
                      label="Protein (g)"
                      value={formula.proximate.protein}
                      onChange={(v) => updateProximate(idx, 'protein', v)}
                    />
                    <NumField
                      label="Serat (g)"
                      value={formula.proximate.serat}
                      onChange={(v) => updateProximate(idx, 'serat', v)}
                    />
                    <NumField
                      label="Lemak (g)"
                      value={formula.proximate.lemak}
                      onChange={(v) => updateProximate(idx, 'lemak', v)}
                    />
                    <NumField
                      label="Energi (kkal)"
                      value={formula.proximate.energi}
                      onChange={(v) => updateProximate(idx, 'energi', v)}
                    />
                  </div>
                </div>
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
          id="skripsi-save-btn"
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
