import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ListFieldEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export const ListFieldEditor: React.FC<ListFieldEditorProps> = ({ label, items, onChange, placeholder }) => {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => onChange([...items, '']);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-[10px] text-[#8E8E8E]">
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#2D2D2D] hover:text-[#F8BBD0] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <textarea
              value={item}
              onChange={(e) => updateItem(idx, e.target.value)}
              placeholder={placeholder}
              rows={1}
              className="flex-1 bg-white border border-[#E8E0E3] rounded-lg px-3 py-2 text-xs resize-y focus:outline-none focus:border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              aria-label="Hapus item"
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
