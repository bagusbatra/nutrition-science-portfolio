import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { adminSections } from './adminNav';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#F9F5F6] text-[#2D2D2D]">
      <aside className="w-60 shrink-0 border-r border-[#E8E0E3] bg-white p-5 flex flex-col">
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E8E8E] font-bold">
            Portfolio CMS
          </span>
          <h2 className="font-serif text-lg font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-1 flex flex-col gap-1 text-sm">
          {adminSections.map((item) => (
            <NavLink
              key={item.path}
              id={`admin-nav-${item.path}`}
              to={item.path}
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl transition-colors ${
                  isActive ? 'bg-[#2D2D2D] text-white font-semibold' : 'text-[#4A4A4A] hover:bg-[#FCE4EC]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm text-[#2D2D2D] border border-[#E8E0E3] hover:bg-[#FCE4EC] transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
