import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface GuestbookEntryDoc {
  _id: string;
  name: string;
  role: string;
  message: string;
  emoji: string;
  createdAt: string;
}

export const GuestbookAdmin: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadEntries = () => {
    setIsLoading(true);
    fetch('/api/guestbook')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch(() => setMessage({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/guestbook/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e._id !== id));
      setMessage({ type: 'success', text: 'Entri dihapus.' });
    } else {
      setMessage({ type: 'error', text: 'Gagal menghapus entri.' });
    }
    setDeleteConfirmId(null);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold mb-1">Buku Tamu</h1>
        <p className="text-sm text-[#666666]">
          Moderasi pesan dari modal Buku Tamu & Dukungan Sidang publik. Hanya bisa dihapus, tidak ada tambah/ubah
          (entri dikirim langsung oleh pengunjung).
        </p>
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
      ) : entries.length === 0 ? (
        <p className="text-sm text-[#666666]">Belum ada pesan buku tamu.</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white border border-[#E8E0E3] rounded-2xl p-4 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center text-lg shrink-0">
                {entry.emoji || '🌸'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif font-bold text-sm text-[#2D2D2D] truncate">{entry.name}</h3>
                  <span className="text-[10px] text-[#8E8E8E] font-mono shrink-0">
                    {new Date(entry.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2">
                  {entry.role}
                </span>
                <p className="text-xs text-[#4A4A4A] leading-relaxed italic">"{entry.message}"</p>
              </div>
              <div className="shrink-0">
                {deleteConfirmId === entry._id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(entry._id)}
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
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(entry._id)}
                    aria-label="Hapus entri"
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
};
