# Rencana: Admin CMS untuk Portofolio Della Puspa Ardiati

Dokumen ini adalah acuan kerja untuk fitur **halaman login tersembunyi + halaman admin CRUD**
yang bisa mengubah seluruh konten section pada halaman index. Dokumen ini akan **diperbarui setiap
iterasi selesai** (checklist status), jadi selalu jadi sumber kebenaran progres — bukan cuma catatan sekali buat.

Status legend: `[ ]` belum dikerjakan · `[~]` sedang dikerjakan · `[x]` selesai

---

## 1. Requirement Asli (ringkasan permintaan user)

1. Ada halaman **login** (`/login`), tapi **tidak boleh ada tombol/link apa pun di halaman index** yang
   mengarah ke sana — akses hanya lewat mengetik URL manual.
2. Setelah login berhasil, masuk ke **halaman admin** yang menampilkan banyak data yang bisa
   **diubah, ditambah, dihapus** (CRUD penuh).
3. **Semua data disimpan lokal.**
4. **Setiap section pada halaman index harus bisa diubah lewat admin** — tidak boleh ada section yang
   terlewat.
5. Pengerjaan dilakukan **bertahap per iterasi**, kira-kira satu iterasi per section.
6. Sebelum ubah kode: analisis detail + planning dulu, dicatat di markdown (dokumen ini).

## 2. Keputusan Arsitektur (sudah dikonfirmasi user)

| Keputusan | Pilihan yang dipilih | Alasan |
|---|---|---|
| Lokasi penyimpanan data admin | **Backend Express + MongoDB lokal** (bukan localStorage browser) | Supaya perubahan admin langsung terlihat oleh **semua pengunjung** index page, bukan cuma di browser admin sendiri. Project sudah punya backend + MongoDB lokal berjalan (dipakai guestbook & contact), tinggal diperluas. |
| Metode login | **Verifikasi password di backend** (bukan cek password di client-side JS) | Password tidak pernah ikut ke-bundle ke JS publik yang bisa dibongkar lewat DevTools/view-source. Backend balas session cookie signed. |

Konsekuensi dari keputusan ini:
- Halaman index (`/`) yang sekarang meng-import `portfolioData.ts` secara statis **akan direfactor**
  agar tiap section **fetch data dari API** (`GET /api/content/...`) saat render, dengan fallback ke nilai
  statis `portfolioData.ts` (dipakai juga sebagai **data seed** awal) supaya halaman tidak blank kalau API
  belum sempat merespons atau backend sedang mati saat dev.
- Isi `portfolioData.ts` yang sudah bagus dan detail **tidak dibuang** — dipakai sebagai seed data
  pertama kali ke MongoDB lewat script seeding, supaya admin tidak mulai dari kosong.
- Tidak ada sistem multi-user/registrasi. Login = **satu kredensial admin tunggal** (username & password)
  disimpan di `.env` (server-side), sesuai kebutuhan situs portofolio personal.
- Tidak ada upload gambar/file. Semua "visual" di data (warna gradient, warna aksen, nama ikon Lucide)
  adalah field teks/hex/dropdown, bukan file — jadi tidak perlu `multer`/storage tambahan.
- Disclaimer keamanan: ini proteksi yang wajar untuk portofolio personal (single shared password,
  tanpa rate-limit/2FA/audit log). Bukan tingkat keamanan enterprise — cukup untuk kebutuhan yang diminta.

## 3. Peta Section Index → Data Model

Dikumpulkan dari `frontend/src/App.tsx`, `frontend/src/data/portfolioData.ts`, dan `frontend/src/types.ts`.

| # | Section (id) | Komponen | Sumber data sekarang | Bentuk data | Jenis CRUD di admin |
|---|---|---|---|---|---|
| 1 | `hero` (+ Header, Footer, ContactModal, ResumeModal) | `HeroSection.tsx`, `Header.tsx`, `Footer.tsx` | `personalInfo` (object) | Singleton: field teks + `stats[]` (4 item {label,value,sub}) | Edit (bukan list) |
| 2 | `skripsi` | `SkripsiLabSection.tsx`, dipakai juga di `ResumeModal` | `skripsiResearch` (object) | Singleton kompleks: field teks + `advisor[]`, `hypotheses[]`, `keyTakeaways[]`, dan `formulations[]` (array objek bersarang: organolepticScore{}, proximate{}) | Edit singleton + tambah/ubah/hapus item `formulations[]` |
| 3 | `workbench` (Meja Dietisien) | `NutritionistWorkbench.tsx` | **Tidak pakai `portfolioData`** — kalkulator murni, `dietPresets` hardcode di komponen | Array preset diet, hardcode | Opsional (iterasi bonus, lihat §5.9) |
| 4 | `cases` (Kasus PAGT) | `ClinicalCasesSection.tsx` | `clinicalCases[]` | List objek sangat bersarang (patientProfile, assessment.biokimia[], diagnosisPES, intervention.menuContoh[], dst) | Full CRUD list — **paling kompleks** |
| 5 | `rotations` (Rotasi PKL) | `ExperienceRotationsSection.tsx`, dipakai juga `ResumeModal` | `rotationExperiences[]` | List objek: field teks + `badges[]`, `achievements[]` | Full CRUD list |
| 6 | `media` (Galeri) | `MediaInfographicsSection.tsx` | `mediaInfographics[]` | List objek: field teks + `keyPoints[]`, warna | Full CRUD list |
| 7 | `skills` (Kompetensi) | `SkillsCertificationsSection.tsx`, dipakai juga `ResumeModal` | `skillsAndCompetencies` (object 4 array) | Singleton: `clinical[]`, `foodService[]`, `software[]`, `certifications[]` | Edit tiap sub-list (tambah/ubah/hapus item) |
| 8 | Guestbook (floating modal, sudah ada backend) | `ThesisSupportGuestbook.tsx` | MongoDB `GuestbookEntry` (sudah ada) | List, publik bisa POST | Admin: **moderasi** (lihat + hapus) |
| 9 | Contact form (modal, sudah ada backend) | `ContactModal.tsx` | MongoDB `ContactMessage` (sudah ada) | List, publik bisa POST, **belum ada GET** | Admin: **kotak masuk** (lihat + hapus) |

Catatan: navbar publik mengelompokkan `workbench + cases + rotations` di bawah satu label **"Pengalaman"**
(lihat perubahan navbar sebelumnya), tapi di sisi admin pengelompokan mengikuti **model data**, bukan
label nav — jadi sidebar admin punya entri terpisah untuk "Kasus Klinis" dan "Rotasi Pengalaman".

## 4. Desain Teknis

### 4.1 Routing (frontend)

Tambah dependency `react-router-dom`. Struktur route:

```
/                     -> index page publik (App.tsx, TIDAK berubah secara visual)
/login                -> LoginPage (tidak ada link kesini dari mana pun di UI publik)
/admin                -> redirect ke /admin/identitas
/admin/identitas       -> PersonalInfoAdmin
/admin/skripsi         -> SkripsiAdmin
/admin/kasus           -> ClinicalCasesAdmin
/admin/rotasi           -> RotationsAdmin
/admin/galeri          -> MediaAdmin
/admin/kompetensi      -> SkillsAdmin
/admin/guestbook       -> GuestbookAdmin (moderasi)
/admin/pesan           -> ContactInboxAdmin
```

Semua route `/admin/*` dibungkus `AdminAuthGuard` (cek sesi lewat `GET /api/auth/me`; kalau belum
login → redirect `/login`). `AdminLayout` berisi sidebar nav ke 8 halaman di atas + tombol logout.

`main.tsx` direstruktur untuk pakai `<BrowserRouter>`. Vite dev server sudah otomatis fallback ke
`index.html` untuk path SPA seperti `/login`/`/admin` (default `appType: 'spa'`), jadi tidak perlu
config tambahan supaya bisa diketik langsung di address bar.

### 4.2 Backend — Auth

- Dependency baru: `cookie-session` (signed cookie, tanpa perlu session store terpisah).
- Env var baru (`.env.local` & `.env.example`): `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
- `backend/routes/auth.ts`:
  - `POST /api/auth/login` — body `{ username, password }`, cocokkan ke env, sukses → `req.session.isAdmin = true`.
  - `POST /api/auth/logout` — hapus session.
  - `GET /api/auth/me` — `{ isAdmin: boolean }`, dipakai `AdminAuthGuard`.
- `backend/middleware/requireAdmin.ts` — dipasang di semua route admin (POST/PUT/DELETE konten +
  GET moderasi guestbook/contact), balas `401` kalau `req.session.isAdmin` tidak true.

### 4.3 Backend — Model & Route Konten

Satu koleksi Mongoose per section (bukan satu blob campur), supaya CRUD per section jelas & independen.
Tipe field mengikuti interface yang sudah ada di `frontend/src/types.ts` (dipakai ulang, tidak dobel definisi).

| Model | Jenis | Route publik (baca) | Route admin (tulis, perlu session) |
|---|---|---|---|
| `PersonalInfo` | singleton | `GET /api/content/identitas` | `PUT /api/content/identitas` |
| `SkripsiResearch` | singleton | `GET /api/content/skripsi` | `PUT /api/content/skripsi` |
| `ClinicalCase` | list | `GET /api/content/kasus` | `POST /api/content/kasus`, `PUT /api/content/kasus/:id`, `DELETE /api/content/kasus/:id` |
| `RotationExperience` | list | `GET /api/content/rotasi` | `POST /api/content/rotasi`, `PUT .../:id`, `DELETE .../:id` |
| `MediaInfographic` | list | `GET /api/content/galeri` | `POST /api/content/galeri`, `PUT .../:id`, `DELETE .../:id` |
| `SkillsAndCompetencies` | singleton | `GET /api/content/kompetensi` | `PUT /api/content/kompetensi` |
| `GuestbookEntry` (sudah ada) | list | `GET /api/guestbook` (sudah ada) | + `DELETE /api/guestbook/:id` (baru) |
| `ContactMessage` (sudah ada) | list | — (tidak publik) | + `GET /api/contact` (baru), `DELETE /api/contact/:id` (baru) |

### 4.4 Seeding

`backend/seed.ts` — dijalankan sekali (`npm run seed`, atau auto-run saat startup kalau koleksi masih
kosong) — mengambil nilai awal langsung dari `frontend/src/data/portfolioData.ts` (import relatif lintas
folder, aman karena backend dijalankan lewat `tsx` tanpa bundler) dan insert ke tiap koleksi di atas.
Ini supaya admin mulai dari data yang sudah lengkap & rapi, bukan dari kosong.

### 4.5 Frontend — Konsumsi data di halaman publik

Tiap section komponen (`HeroSection`, `SkripsiLabSection`, dst) direfactor dari:
```ts
import { personalInfo } from '../data/portfolioData'; // statis
```
menjadi pola fetch-with-fallback (mirip pola yang sudah dipakai `ThesisSupportGuestbook`):
```ts
const [data, setData] = useState(personalInfo); // fallback = nilai statis lama
useEffect(() => {
  fetch('/api/content/identitas').then(r => r.json()).then(setData).catch(() => {});
}, []);
```
Jadi kalau backend/API gagal diakses, section tetap tampil dengan data default (resilient), tidak blank.

### 4.6 Frontend — Struktur folder admin

```
frontend/src/admin/
  AdminLayout.tsx          # sidebar + logout + <Outlet/>
  AdminAuthGuard.tsx        # cek /api/auth/me, redirect /login kalau gagal
  LoginPage.tsx
  components/
    ListFieldEditor.tsx     # editor generik untuk array of string (badges, keyPoints, hypotheses, dst)
    RepeatableSubform.tsx   # editor generik untuk array of object (formulations, menuContoh, biokimia, dst)
  sections/
    PersonalInfoAdmin.tsx
    SkripsiAdmin.tsx
    ClinicalCasesAdmin.tsx
    RotationsAdmin.tsx
    MediaAdmin.tsx
    SkillsAdmin.tsx
    GuestbookAdmin.tsx
    ContactInboxAdmin.tsx
```

UI admin memakai Tailwind + token warna yang sama dengan situs publik supaya konsisten, tapi **tanpa**
animasi editorial yang berat (motion) — prioritas fungsional: form, tabel, tombol simpan/hapus, bukan
polish visual. Validasi: required-field check di client (cepat) + validasi ulang di server (konsisten
dengan pola `contact.ts`/`guestbook.ts` yang sudah ada).

## 5. Rencana Iterasi

Setiap iterasi = 1 unit kerja yang bisa diverifikasi (lint + build + cek manual di browser) sebelum lanjut
ke iterasi berikutnya. Update kolom **Status** di tabel ini setiap iterasi selesai.

### 5.0 Iterasi 0 — Fondasi (Routing, Auth, Admin Shell)
**Status:** `[x]` selesai & terverifikasi di browser
- Install `react-router-dom`, `cookie-session` (+ `@types/cookie-session`).
- Tambah `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` ke `.env.example` & `.env.local`.
- Backend: `routes/auth.ts` (`POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`),
  `middleware/requireAdmin.ts` (siap dipakai mulai Iterasi 1), pasang `cookie-session` di `backend/index.ts`.
- Frontend: restrukturisasi `main.tsx` pakai `BrowserRouter`; buat `admin/LoginPage.tsx`,
  `admin/AdminLayout.tsx` (sidebar 8 link section + tombol keluar), `admin/AdminAuthGuard.tsx`,
  `admin/AdminPlaceholderPage.tsx`, `admin/adminNav.ts` (registry section dipakai bareng sidebar & routes).
- **Bug lama yang ikut diperbaiki (ditemukan saat verifikasi, bukan bagian rencana awal):**
  - `@types/react` & `@types/react-dom` ternyata belum pernah terpasang di project ini sama sekali —
    ditambahkan sebagai devDependency (sebelumnya seluruh kode React diam-diam type-check sebagai `any`).
  - `backend/index.ts` memakai `import 'dotenv/config'` yang defaultnya cuma baca file `.env`, padahal
    project ini cuma punya `.env.local` — jadi env var (termasuk `MONGODB_URI`/`PORT` lama) sebenarnya
    **tidak pernah ter-load**, cuma "kebetulan" cocok dengan fallback hardcode di kode. Diperbaiki agar
    eksplisit load `.env` lalu `.env.local` (override).
  - `app.listen()` sebelumnya menunggu `connectDB()` sukses dulu — kalau MongoDB lokal mati, seluruh API
    (termasuk login yang tidak butuh Mongo) ikut mati total. Sekarang `listen()` jalan duluan, `connectDB()`
    gagal cuma di-log sebagai warning (rute yang butuh Mongo akan gagal sampai Mongo reachable lagi).
- **Definition of Done — semua terverifikasi manual di browser:**
  - `/` tidak punya tombol/link apa pun ke `/login` atau `/admin`. ✅
  - `/login` bisa diakses langsung lewat URL. ✅
  - Password salah → pesan error "Username atau password salah". ✅
  - Password benar → redirect ke `/admin/identitas`, sidebar 8 section + placeholder tampil. ✅
  - Navigasi antar section sidebar berfungsi (`/admin/kasus`, dst). ✅
  - Tombol Keluar → logout, redirect ke `/login`. ✅
  - Akses langsung `/admin/...` lewat URL tanpa sesi aktif → redirect ke `/login`. ✅

**Catatan tambahan (di luar rencana awal iterasi, tapi prasyarat wajib sebelum Iterasi 1):** MongoDB
lokal sempat tidak terpasang sama sekali di mesin ini (instalasi lama sudah hilang). Sudah diinstal ulang
lewat MSI resmi (`mongodb-windows-x86_64-8.3.8-signed.msi`) sebagai Windows Service — service `MongoDB`
(`MongoDB Server (MongoDB)`) berjalan otomatis (`StartMode: Auto`) di `127.0.0.1:27017`, sudah diverifikasi
lewat koneksi Mongoose sungguhan (`[server] MongoDB connected -> mongodb://127.0.0.1:27017/della-portfolio`).
File installer sudah dihapus dari project setelah instalasi selesai.

### 5.1 Iterasi 1 — Identitas (Hero/Header/Footer/Contact/Resume)
**Status:** `[x]` selesai & terverifikasi di browser
- Backend: `backend/models/PersonalInfo.ts` (singleton), `backend/routes/personalInfo.ts`
  (`GET /api/content/identitas` publik, `PUT` dilindungi `requireAdmin`), `backend/seed.ts`
  (`seedIfEmpty()`, dipanggil otomatis setelah `connectDB()` sukses di `backend/index.ts`).
- Frontend: `frontend/src/context/PersonalInfoContext.tsx` — satu `Provider` yang fetch sekali,
  dipakai lewat hook `usePersonalInfo()` oleh `HeroSection`, `Header`, `Footer`, `ContactModal`,
  `ResumeModal` (mengganti import statis `personalInfo` dari `portfolioData.ts`). `App` dibungkus
  provider ini hanya di route publik `/`, bukan di `/admin`.
- Admin: `frontend/src/admin/sections/PersonalInfoAdmin.tsx` — form 12 field teks + textarea bio +
  editor `stats[]` (tambah/ubah/hapus baris), terpasang di `main.tsx` lewat `implementedAdminPages`
  map (pola yang dipakai berulang tiap iterasi berikutnya).
- **Definition of Done — terverifikasi manual di browser:**
  - Server auto-seed jalan sekali saat MongoDB kosong: log `[seed] PersonalInfo seeded from portfolioData.ts`. ✅
  - Form admin `/admin/identitas` otomatis terisi data hasil seed (identik dengan `portfolioData.ts`). ✅
  - Ubah nama jadi "Della Puspa Ardiati (Uji Admin)" + simpan → pesan "Perubahan tersimpan." ✅
  - Refresh halaman `/` → nama berubah serentak di Header, kartu Hero, dan Footer. ✅
  - Reload `/admin/identitas` → perubahan tetap ada (persisten di MongoDB, bukan cuma di memori). ✅
  - Nama dikembalikan ke "Della Puspa Ardiati" setelah verifikasi selesai (tidak meninggalkan data uji). ✅

### 5.2 Iterasi 2 — Riset Skripsi
**Status:** `[x]` selesai & terverifikasi di browser
- Backend: `backend/models/SkripsiResearch.ts` (singleton, termasuk subdocument schema
  `organolepticScore`, `proximate`, `formulations[]`), `backend/routes/skripsi.ts`
  (`GET /api/content/skripsi` publik, `PUT` dilindungi `requireAdmin`), ditambahkan ke `seedIfEmpty()`.
- Frontend: `frontend/src/context/SkripsiContext.tsx` (`useSkripsi()`), dipakai `SkripsiLabSection` &
  bagian skripsi di `ResumeModal`. Providers digabung lewat `PublicDataProviders.tsx` baru (supaya
  `main.tsx` tidak makin bersarang tiap iterasi — tinggal tambah provider di satu file itu).
- Komponen admin generik baru: `frontend/src/admin/components/ListFieldEditor.tsx` (editor array-of-string
  dipakai ulang untuk `advisor`, `hypotheses`, `keyTakeaways` — dan section masa depan dengan bentuk sama).
- Admin: `frontend/src/admin/sections/SkripsiAdmin.tsx` — field teks, 3 `ListFieldEditor`, dan repeatable
  card editor untuk `formulations[]` (13 field per kartu: kode, rasio, 3 persentase, 5 skor organoleptik,
  5 nilai proksimat, toggle "Formula Terpilih").
- Perbaikan kecil ikut serta: fallback `selectedFormula` di `SkripsiLabSection` diubah dari index
  hardcode `[2]` ke `[0]` — sebelumnya aman karena data statis selalu 4 item tetap, tapi begitu
  formulasi jadi bisa diedit/dihapus lewat admin, index hardcode itu berisiko crash.
- **Definition of Done — terverifikasi manual di browser:**
  - Auto-seed jalan: log `[seed] SkripsiResearch seeded from portfolioData.ts`. ✅
  - Form admin `/admin/skripsi` terisi lengkap sesuai `portfolioData.ts` (termasuk 4 kartu formulasi). ✅
  - Tambah formulasi baru ("F4 (Uji Tambahan)") via tombol "+ Tambah Formulasi" → simpan → kartu F4
    baru muncul di grid formula section Riset publik (5 kartu total). ✅
  - Ubah skor Overall formulasi F2 dari 4.4 → 5 → simpan → panel detail formula F2 di halaman publik
    menampilkan "Skor: 5 / 5.0". ✅
  - Data uji (formulasi F4 & skor 5) dibersihkan kembali ke kondisi seed asli setelah verifikasi. ✅

### 5.3 Iterasi 3 — Kasus Klinis (PAGT/ADIME)
**Status:** `[x]` selesai & terverifikasi di browser — iterasi paling berat, sesuai perkiraan
- Backend: `backend/models/ClinicalCase.ts` (list, bukan singleton — pakai Mongo `_id` sebagai
  identitas, tidak field `id` custom terpisah), `backend/routes/clinicalCases.ts` full CRUD
  (`GET` publik, `POST`/`PUT /:id`/`DELETE /:id` dilindungi `requireAdmin`), masuk `seedIfEmpty()`
  via `insertMany` (field `id` statis di-strip sebelum insert karena Mongo generate `_id` sendiri).
- Frontend: `frontend/src/context/ClinicalCasesContext.tsx` — fetch list, map `_id` → `id` supaya
  `ClinicalCasesSection` tidak perlu berubah logika sama sekali selain sumber data. Provider masuk
  `PublicDataProviders.tsx`.
- Admin: `frontend/src/admin/sections/ClinicalCasesAdmin.tsx` — pola list-view + form-view (bukan
  modal) dengan tombol "+ Tambah Kasus", edit, dan hapus (konfirmasi inline dua-tombol "Ya, hapus"/
  "Batal", **bukan** `window.confirm()` — dialog native akan membekukan sesi otomasi browser).
  Form mencakup semua field ADIME: profil pasien, assessment (+ `biokimia[]` repeatable baris),
  diagnosis PES, intervensi (+ preskripsi kebutuhan, `tujuanDiet[]`/`prinsipSyaratDiet[]` via
  `ListFieldEditor`, `menuContoh[]` repeatable baris), monitoring & refleksi.
- **Bug serius ditemukan & diperbaiki saat verifikasi:** validasi Mongoose yang gagal (field wajib
  kosong) melempar unhandled promise rejection yang **meng-crash seluruh proses backend** (bukan
  cuma balas 400) — kontradiksi langsung dengan prinsip reliabilitas dari Iterasi 0. Diperbaiki
  dengan menambah `backend/middleware/asyncHandler.ts` (dipasang di semua route tulis: personalInfo,
  skripsi, clinicalCases, guestbook, contact) + error handler global di `backend/index.ts` sebagai
  jaring pengaman terakhir. Sekalian menambah `runValidators: true` pada `findOneAndUpdate`/
  `findByIdAndUpdate` supaya PUT konsisten dengan validasi POST/create (sebelumnya PUT diam-diam
  menerima data tidak valid).
- **Definition of Done — terverifikasi manual di browser + API:**
  - Auto-seed jalan: log `[seed] ClinicalCase seeded from portfolioData.ts`. ✅
  - List admin `/admin/kasus` menampilkan 2 kasus seed dengan benar. ✅
  - Buat kasus baru 100% lewat form admin (tanpa sentuh kode) → simpan → backend **tidak crash**
    (setelah fix) → muncul sebagai card ke-3 di section Kasus PAGT publik dengan data yang cocok
    persis, dan ke-4 tab ADIME (Assessment/Diagnosis/Intervensi/Monev) render tanpa error meski
    sebagian array kosong. ✅
  - Edit kasus (ubah judul) → tersimpan, terverifikasi lewat `GET /api/content/kasus`. ✅
  - Hapus kasus lewat konfirmasi inline → kembali ke 2 kasus semula, terverifikasi di admin & publik. ✅

### 5.4 Iterasi 4 — Rotasi Pengalaman
**Status:** `[x]` selesai & terverifikasi di browser + API
- Backend: `backend/models/RotationExperience.ts` (list, Mongo `_id`), `backend/routes/rotations.ts`
  full CRUD dengan `asyncHandler` + `runValidators: true` (pola sama seperti `clinicalCases.ts`),
  masuk `seedIfEmpty()` via `insertMany` (strip field `id` statis).
- Frontend: `frontend/src/context/RotationsContext.tsx` (map `_id` → `id`), masuk `PublicDataProviders`.
- Admin: `frontend/src/admin/sections/RotationsAdmin.tsx` — pola list-view/form-view sama seperti
  Kasus Klinis (termasuk konfirmasi hapus inline dua-tombol). Dropdown `category` (4 pilihan tetap)
  dan `iconName` (4 pilihan: Stethoscope, UtensilsCrossed, HeartPulse, FlaskConical — persis set ikon
  yang sudah di-mapping `getIcon()` di komponen publik), `ListFieldEditor` untuk `badges[]` dan
  `achievements[]`.
- Refactor `ExperienceRotationsSection` + bagian rotasi di `ResumeModal` ke `useRotations()`.
- **Bug kecil ikut diperbaiki:** label filter "Semua Rotasi (4)" di `ExperienceRotationsSection`
  sebelumnya hardcode angka 4 (aman selama data statis selalu 4 item) — diubah jadi
  `` `Semua Rotasi (${rotationExperiences.length})` `` supaya tetap akurat begitu admin menambah/
  menghapus rotasi.
- **Definition of Done — terverifikasi manual di browser + API:**
  - Auto-seed jalan: log `[seed] RotationExperience seeded from portfolioData.ts`. ✅
  - List admin `/admin/rotasi` menampilkan 4 rotasi seed dengan benar. ✅
  - Tambah rotasi baru lewat admin → backend tidak crash → tersimpan (diverifikasi via
    `GET /api/content/rotasi`, 5 dokumen). ✅
  - Rotasi baru muncul sebagai kartu ke-5 di section Rotasi PKL publik dengan data & ikon yang cocok,
    dan label filter otomatis berubah jadi "Semua Rotasi (5)". ✅
  - Hapus rotasi via konfirmasi inline → kembali ke 4 rotasi, terverifikasi via API. ✅

### 5.5 Iterasi 5 — Galeri Media & Infografis
**Status:** `[x]` selesai & terverifikasi di browser + API
- Backend: `backend/models/MediaInfographic.ts` (list, Mongo `_id`), `backend/routes/media.ts` full
  CRUD dengan `asyncHandler` + `runValidators: true`, masuk `seedIfEmpty()`.
- Frontend: `frontend/src/context/MediaContext.tsx` (map `_id` → `id`), masuk `PublicDataProviders`.
- Admin: `frontend/src/admin/sections/MediaAdmin.tsx` — pola list-view/form-view sama seperti iterasi
  sebelumnya, dropdown `category` (4 pilihan tetap), `ListFieldEditor` untuk `keyPoints[]`, input teks
  untuk `thumbnailBg` (kelas gradient Tailwind, mis. `from-[#FDE2E4] to-[#FAD2E1]`) dengan **preview
  gradient langsung di form**, dan input `accentColor` (hex) dengan swatch warna preview.
- Refactor `MediaInfographicsSection` ke `useMedia()`.
- **Keterbatasan yang disadari (bukan bug, konsekuensi arsitektur Tailwind):** `thumbnailBg` dirender
  sebagai kelas Tailwind arbitrary-value (`bg-gradient-to-br ${thumbnailBg}`). Tailwind v4 men-scan
  kelas dari source file saat build/dev, **bukan** dari data runtime/database — jadi kombinasi gradient
  yang sama sekali baru (tidak pernah muncul sebagai teks literal di source, termasuk di
  `portfolioData.ts` yang masih jadi seed) berisiko tidak ter-generate CSS-nya. Solusi aman untuk
  sekarang: pakai salah satu dari 4 gradient yang sudah ada di seed data. Dicatat sebagai keterbatasan
  yang diketahui, bukan diperbaiki di iterasi ini (perbaikan penuh butuh ganti ke inline CSS gradient,
  di luar cakupan).
- **Definition of Done — terverifikasi manual di browser + API:**
  - Auto-seed jalan: log `[seed] MediaInfographic seeded from portfolioData.ts`. ✅
  - List admin `/admin/galeri` menampilkan 4 media seed dengan thumbnail preview yang benar. ✅
  - Tambah media baru lewat admin (pakai gradient existing) → backend tidak crash → tersimpan
    (diverifikasi via `GET /api/content/galeri`, 5 dokumen). ✅
  - Media baru muncul sebagai kartu ke-5 di section Galeri publik dengan data & gradient yang cocok;
    modal "Lihat Media" menampilkan detail lengkap tanpa error. ✅
  - Hapus media via konfirmasi inline → kembali ke 4 media, terverifikasi via API. ✅

### 5.6 Iterasi 6 — Kompetensi & Sertifikasi
**Status:** `[x]` selesai & terverifikasi di browser + API
- Backend: `backend/models/SkillsAndCompetencies.ts` (singleton — bukan list, pola sama seperti
  Iterasi 1/2), subdocument schema `{_id:false}` untuk `skillSchema` ({name, level, desc}) dan
  `certificationSchema` ({name, issuer, year}), `backend/routes/skills.ts` (`GET /api/content/kompetensi`
  publik, `PUT` dilindungi `requireAdmin`, `runValidators: true`), masuk `seedIfEmpty()`.
- Frontend: `frontend/src/context/SkillsContext.tsx` (`useSkills()`), masuk `PublicDataProviders`.
- Admin: `frontend/src/admin/sections/SkillsAdmin.tsx` — pola singleton-form (bukan list CRUD),
  dua sub-komponen reusable lokal: `SkillGroupEditor` (dipakai 3x untuk `clinical`/`foodService`/
  `software`) dan `CertificationGroupEditor` (untuk `certifications`), masing-masing dengan
  tambah/ubah/hapus baris.
- Refactor `SkillsCertificationsSection` ke `useSkills()`.
- **Temuan saat refactor:** import `skillsAndCompetencies` di `ResumeModal.tsx` ternyata **dead code**
  — section "Kompetensi Teknis & Perangkat Lunak" di CV modal sebenarnya prosa hardcode, tidak pernah
  merujuk data itu di JSX. Import yang tidak terpakai dihapus sebagai bagian cleanup (tidak direfactor
  ke `useSkills()` karena memang tidak dipakai — CV modal tetap prosa statis by design).
- **Definition of Done — terverifikasi manual di browser + API:**
  - Auto-seed jalan: log `[seed] SkillsAndCompetencies seeded from portfolioData.ts`. ✅
  - Form admin `/admin/kompetensi` terisi lengkap sesuai seed (4 skill klinis, 3 MSPM, 4 software,
    4 sertifikat). ✅
  - Ubah level skill "Proses Asuhan Gizi Terstandar" dari "Mahir" → "Mahir (Uji Admin)" + tambah
    sertifikat baru ("Sertifikat Uji Admin CMS") → simpan → backend tidak crash, tersimpan
    (diverifikasi via `GET /api/content/kompetensi`). ✅
  - Perubahan reflect ke section Kompetensi & Sertifikasi publik (kartu sertifikat ke-5 muncul dengan
    data yang cocok). ✅
  - Data uji dikembalikan ke kondisi seed asli (level "Mahir", 4 sertifikat) setelah verifikasi,
    diverifikasi ulang via API. ✅

### 5.7 Iterasi 7 — Moderasi Buku Tamu
**Status:** `[ ]`
- Backend: tambah `DELETE /api/guestbook/:id` (admin only) ke router yang sudah ada.
- Admin: list entri guestbook (read-only) + tombol hapus.
- **DoD:** admin hapus 1 entri guestbook → hilang juga dari modal Buku Tamu publik.

### 5.8 Iterasi 8 — Kotak Masuk Pesan Kontak
**Status:** `[ ]`
- Backend: tambah `GET /api/contact` + `DELETE /api/contact/:id` (admin only) — saat ini route GET
  belum ada sama sekali.
- Admin: tabel pesan masuk (nama, institusi, email, tujuan pesan, isi, tanggal) + tombol hapus.
- **DoD:** kirim pesan lewat form "Say Hello" publik → muncul di kotak masuk admin; admin bisa hapus.

### 5.9 Iterasi 9 (Opsional) — Preset Kalkulator Meja Dietisien
**Status:** `[ ]` — *tunggu konfirmasi apakah perlu, karena ini tool fungsional bukan konten narasi*
- `dietPresets` di `NutritionistWorkbench.tsx` saat ini hardcode di komponen, tidak terhubung
  `portfolioData`. Kalau mau cakupan "setiap section" 100% termasuk tool ini, baru dikerjakan setelah
  8 iterasi inti selesai.

## 6. Hal yang Sengaja Di-scope-out (untuk sekarang)

- **Deployment/produksi (hosting publik):** saat ini backend & frontend dijalankan lokal via
  `npm run dev` (concurrently, proxy `/api`). Kalau nanti mau di-deploy publik, perlu desain tambahan
  (mis. Express serve static `dist/`, cookie `secure`/`sameSite` untuk cross-origin) — di luar cakupan
  permintaan sekarang yang fokus "semua data disimpan lokal".
- **Upload gambar/file** — tidak ada di data model manapun, semua visual berbasis teks/warna/ikon.
- **Multi-user / role admin** — cukup satu kredensial admin dari `.env`.
- **Audit log / rate limiting / 2FA** — di luar cakupan proyek portofolio personal ini.

## 7. Urutan Eksekusi

Iterasi dikerjakan berurutan **0 → 1 → 2 → ... → 8** (9 opsional, nanti dikonfirmasi ulang). Tiap iterasi
akan di-lint (`npm run lint`) + build (`npm run build`) + dicek manual di browser sebelum ditandai `[x]`
dan lanjut ke iterasi berikutnya. Status di dokumen ini akan diperbarui setiap iterasi kelar.
