import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Login gagal');
        return;
      }

      navigate('/admin', { replace: true });
    } catch (err) {
      setError('Tidak bisa menghubungi server. Pastikan backend berjalan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F6] px-4">
      <div className="w-full max-w-sm bg-white rounded-[32px] border border-[#E8E0E3] shadow-sm p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FCE4EC] border border-[#F8BBD0] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-[#2D2D2D]" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E8E8E] font-bold block">
              Restricted Area
            </span>
            <h1 className="font-serif text-xl font-bold text-[#2D2D2D]">Admin Login</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">
              Username
            </label>
            <input
              id="admin-login-username"
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5 uppercase tracking-wider font-mono text-[10px]">
              Password
            </label>
            <input
              id="admin-login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F9F5F6] border border-[#E8E0E3] rounded-2xl px-4 py-3 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#2D2D2D] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            id="admin-login-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2D2D] hover:bg-[#F8BBD0] hover:text-[#2D2D2D] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
};
