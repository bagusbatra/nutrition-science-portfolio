import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AuthStatus = 'checking' | 'authed' | 'guest';

export const AdminAuthGuard: React.FC = () => {
  const [status, setStatus] = useState<AuthStatus>('checking');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setStatus(data.isAdmin ? 'authed' : 'guest'))
      .catch(() => setStatus('guest'));
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F5F6] text-[#2D2D2D] text-xs font-mono uppercase tracking-wider">
        Memeriksa sesi...
      </div>
    );
  }

  if (status === 'guest') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
