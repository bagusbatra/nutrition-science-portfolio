export interface AdminSectionMeta {
  path: string; // relative to /admin, e.g. 'identitas'
  label: string;
  iterationLabel: string;
}

export const adminSections: AdminSectionMeta[] = [
  { path: 'identitas', label: 'Identitas', iterationLabel: 'Iterasi 1' },
  { path: 'skripsi', label: 'Riset Skripsi', iterationLabel: 'Iterasi 2' },
  { path: 'kasus', label: 'Kasus Klinis', iterationLabel: 'Iterasi 3' },
  { path: 'rotasi', label: 'Rotasi Pengalaman', iterationLabel: 'Iterasi 4' },
  { path: 'galeri', label: 'Galeri Media', iterationLabel: 'Iterasi 5' },
  { path: 'kompetensi', label: 'Kompetensi', iterationLabel: 'Iterasi 6' },
  { path: 'guestbook', label: 'Buku Tamu', iterationLabel: 'Iterasi 7' },
  { path: 'pesan', label: 'Kotak Masuk', iterationLabel: 'Iterasi 8' },
  { path: 'pengaturan', label: 'Pengaturan', iterationLabel: 'Iterasi 10' },
];
