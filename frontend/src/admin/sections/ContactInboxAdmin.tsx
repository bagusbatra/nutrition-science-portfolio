import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface ContactMessageDoc {
  _id: string;
  senderName: string;
  senderOrg: string;
  senderEmail: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export const ContactInboxAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadMessages = () => {
    setIsLoading(true);
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setFeedback({ type: 'error', text: 'Gagal memuat data.' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setFeedback({ type: 'success', text: 'Pesan dihapus.' });
    } else {
      setFeedback({ type: 'error', text: 'Gagal menghapus pesan.' });
    }
    setDeleteConfirmId(null);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold mb-1">Kotak Masuk</h1>
        <p className="text-sm text-[#666666]">
          Pesan dari form "Say Hello" publik. Hanya bisa dilihat & dihapus (tidak ada tambah/ubah, pesan
          dikirim langsung oleh pengunjung).
        </p>
      </div>

      {feedback && (
        <p
          className={`text-xs px-3 py-2 rounded-xl border mb-4 ${
            feedback.type === 'success'
              ? 'text-green-700 bg-green-50 border-green-200'
              : 'text-red-700 bg-red-50 border-red-200'
          }`}
        >
          {feedback.text}
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-[#666666]">Memuat data...</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-[#666666]">Belum ada pesan masuk.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white border border-[#E8E0E3] rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-sm text-[#2D2D2D] truncate">{msg.senderName}</h3>
                  {msg.senderOrg && <p className="text-xs text-[#666666]">{msg.senderOrg}</p>}
                  <a
                    href={`mailto:${msg.senderEmail}`}
                    className="text-xs text-[#2D2D2D] underline decoration-[#F8BBD0] decoration-2 underline-offset-2"
                  >
                    {msg.senderEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#8E8E8E] font-mono">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  {deleteConfirmId === msg._id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(msg._id)}
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
                      onClick={() => setDeleteConfirmId(msg._id)}
                      aria-label="Hapus pesan"
                      className="p-2.5 rounded-lg hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#F9F5F6] px-2.5 py-0.5 rounded-full inline-block border border-[#E8E0E3] mb-2">
                {msg.inquiryType}
              </span>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
