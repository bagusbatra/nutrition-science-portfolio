import React from 'react';

interface AdminPlaceholderPageProps {
  title: string;
  iterationLabel: string;
}

export const AdminPlaceholderPage: React.FC<AdminPlaceholderPageProps> = ({ title, iterationLabel }) => {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-[#666666]">
        Belum dikerjakan — dijadwalkan pada <strong>{iterationLabel}</strong> (lihat{' '}
        <code className="font-mono text-xs bg-[#FCE4EC] px-1.5 py-0.5 rounded">docs/admin-cms-plan.md</code>).
      </p>
    </div>
  );
};
