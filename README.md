# Della Puspa Ardiati — Portfolio (Laravel)

Portofolio akademik & profesional mahasiswi S1 Ilmu Gizi, dibangun dengan Laravel (Blade + Alpine.js, tanpa build step Node.js) dan MySQL. Termasuk panel admin `/admin` untuk mengelola seluruh konten (identitas, riset skripsi, kasus klinis, rotasi pengalaman, galeri media, kompetensi, buku tamu, kotak masuk, dan pengaturan visibilitas section).

## Menjalankan secara lokal

**Prasyarat:** PHP 8.3+, Composer, MySQL.

1. Install dependencies:
   ```
   composer install
   ```
2. Salin `.env.example` menjadi `.env`, lalu sesuaikan `DB_*` dan `ADMIN_USERNAME`/`ADMIN_PASSWORD`.
3. Generate application key:
   ```
   php artisan key:generate
   ```
4. Buat database MySQL sesuai `DB_DATABASE` di `.env`, lalu jalankan migrasi + seeder:
   ```
   php artisan migrate --seed
   ```
5. Jalankan server:
   ```
   php artisan serve
   ```
6. Buka `http://localhost:8000` untuk situs publik, dan `http://localhost:8000/login` untuk masuk ke panel admin.

Tidak ada langkah build frontend terpisah — Tailwind CSS, Alpine.js, Lucide icons, dan canvas-confetti dimuat langsung via CDN di `resources/views/layouts/app.blade.php`.
