<?php

namespace Database\Seeders;

use App\Models\ClinicalCase;
use App\Models\MediaInfographic;
use App\Models\PersonalInfo;
use App\Models\RotationExperience;
use App\Models\SectionVisibility;
use App\Models\SkillsAndCompetency;
use App\Models\SkripsiResearch;
use Illuminate\Database\Seeder;

// Seeds each content table from the original portfolioData.ts values, but only the first
// time (table empty) so admin edits are never overwritten by re-running the seeder.
class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        if (PersonalInfo::count() === 0) {
            PersonalInfo::create([
                'name' => 'Della Puspa Ardiati',
                'title' => 'Calon Ahli Gizi / Mahasiswi Akhir S1 Ilmu Gizi',
                'tagline' => 'Bridging Clinical Nutrition, Functional Food Science & Compassionate Patient Care',
                'university' => 'Universitas Ngadi Waluyo',
                'faculty' => 'Fakultas Kesehatan / Program Studi S1 Ilmu Gizi',
                'gpa' => '3.89 / 4.00',
                'status' => 'Mahasiswa Tingkat Akhir',
                'target_graduation' => 'Wisudawati 2027',
                'email' => 'dellaardiati1@gmail.com',
                'phone' => '+62 858-7689-2342',
                'linkedin' => 'linkedin.com/in/della-puspa-ardiati',
                'location' => 'Semarang / Ungaran, Jawa Tengah, Indonesia',
                'bio' => 'Mahasiswi tingkat akhir S1 Ilmu Gizi Universitas Ngadi Waluyo dengan minat mendalam pada Dietetika Klinis Penyakit Degeneratif, Manajemen Penyelenggaraan Makanan Rumah Sakit, serta Formulasi Kudapan Fungsional Berbasis Pangan Lokal. Telah menyelesaikan 850+ jam rotasi klinis rumah sakit, mengelola asuhan gizi berstandar PAGT/ADIME, dan memformulasikan produk pangan pencegah anemia remaja.',
                'stats' => [
                    ['label' => 'IPK Kumulatif', 'value' => '3.89', 'sub' => 'Skala 4.00 (Cum Laude Candidate)'],
                    ['label' => 'Jam Rotasi Klinis', 'value' => '850+', 'sub' => 'RS Rujukan, Puskesmas, MSPM'],
                    ['label' => 'Studi Kasus PAGT', 'value' => '14+', 'sub' => 'Bedah, Dalam, Pediatri, Geriatri'],
                    ['label' => 'Produk Formulasi', 'value' => '3', 'sub' => 'Biskuit Fe-Rich, Snack DM, MP-ASI'],
                ],
            ]);
            $this->command?->info('[seed] PersonalInfo seeded from portfolioData.ts');
        }

        if (SkripsiResearch::count() === 0) {
            SkripsiResearch::create([
                'title' => 'Formulasi Biskuit Tepung Mocaf dengan Substitusi Ekstrak Daun Kelor (Moringa oleifera) dan Bekatul sebagai Alternatif Kudapan Pencegah Anemia Remaja Putri',
                'sub_title' => 'Studi Sifat Organoleptik, Analisis Proksimat, dan Estimasi Daya Terima Sensori pada Siswi SMA',
                'advisor' => ['Dr. rer. med. Nurul Izzati, M.Sc, RD', 'Ir. Ahmad Hidayat, M.Kes'],
                'status' => 'Naskah Skripsi Selesai — Menunggu Jadwal Sidang Komprehensif',
                'completion_date' => 'Juli 2026',
                'abstract' => 'Anemia defisiensi besi masih menjadi masalah kesehatan masyarakat di Indonesia dengan prevalensi mencapai 32% pada remaja putri. Penelitian eksperimental ini bertujuan memformulasikan biskuit fungsional berbahan dasar tepung mocaf (modified cassava flour) bebas gluten dengan fortifikasi daun kelor kaya zat besi dan bekatul kaya serat & vitamin B kompleks. Dilakukan 4 perlakuan formulasi (F0 kontrol, F1 10:10, F2 15:15, F3 20:10). Hasil uji organoleptik hedonik (n=35) menunjukkan formula F2 merupakan perlakuan terbaik dengan tingkat kesukaan warna 3.9/5, rasa 4.2/5, dan tekstur renyah 4.1/5. Analisis laboratorium menunjukkan F2 mengandung 7.8 mg zat besi/100g (mencukupi 52% AKG snack remaja putri) dan protein 9.4g/100g.',
                'hypotheses' => [
                    'Substitusi tepung daun kelor dan bekatul meningkatkan kadar Fe dan serat pangan secara signifikan (p < 0.05).',
                    'Formula dengan rasio kelor 15% dan bekatul 15% memiliki daya terima sensori paling optimal tanpa sensasi rasa langu yang dominan.',
                ],
                'formulations' => [
                    [
                        'code' => 'F0 (Kontrol)',
                        'ratio' => '100% Mocaf : 0% Kelor : 0% Bekatul',
                        'kelorPercent' => 0,
                        'bekatulPercent' => 0,
                        'mocafPercent' => 100,
                        'organolepticScore' => ['warna' => 4.4, 'aroma' => 3.8, 'rasa' => 4.0, 'tekstur' => 4.3, 'overall' => 4.1],
                        'proximate' => ['fe' => 1.2, 'protein' => 3.1, 'serat' => 1.8, 'lemak' => 14.2, 'energi' => 440],
                    ],
                    [
                        'code' => 'F1 (Kelor 10% : Bekatul 10%)',
                        'ratio' => '80% Mocaf : 10% Kelor : 10% Bekatul',
                        'kelorPercent' => 10,
                        'bekatulPercent' => 10,
                        'mocafPercent' => 80,
                        'organolepticScore' => ['warna' => 4.0, 'aroma' => 3.9, 'rasa' => 4.1, 'tekstur' => 4.0, 'overall' => 4.0],
                        'proximate' => ['fe' => 5.4, 'protein' => 7.2, 'serat' => 4.6, 'lemak' => 15.0, 'energi' => 435],
                    ],
                    [
                        'code' => 'F2 (Formulasi Terpilih ⭐)',
                        'ratio' => '70% Mocaf : 15% Kelor : 15% Bekatul',
                        'kelorPercent' => 15,
                        'bekatulPercent' => 15,
                        'mocafPercent' => 70,
                        'organolepticScore' => ['warna' => 3.9, 'aroma' => 4.2, 'rasa' => 4.3, 'tekstur' => 4.2, 'overall' => 4.4],
                        'proximate' => ['fe' => 7.8, 'protein' => 9.4, 'serat' => 6.2, 'lemak' => 15.8, 'energi' => 432],
                        'isBestChoice' => true,
                    ],
                    [
                        'code' => 'F3 (Kelor 20% : Bekatul 10%)',
                        'ratio' => '70% Mocaf : 20% Kelor : 10% Bekatul',
                        'kelorPercent' => 20,
                        'bekatulPercent' => 10,
                        'mocafPercent' => 70,
                        'organolepticScore' => ['warna' => 3.2, 'aroma' => 3.4, 'rasa' => 3.5, 'tekstur' => 3.8, 'overall' => 3.5],
                        'proximate' => ['fe' => 9.6, 'protein' => 10.8, 'serat' => 7.1, 'lemak' => 16.1, 'energi' => 428],
                    ],
                ],
                'key_takeaways' => [
                    'Satu porsi kudapan F2 (40 gram = 4 keping) menyumbang 3.12 mg Fe bioavailable, melengkapi suplementasi TTD mingguan.',
                    'Penggunaan teknik blanching uap pada daun kelor sebelum penepungan berhasil menurunkan kadar tanin sebesar 41%, mereduksi rasa pahit/langu.',
                    'Produk berpotensi dikembangkan sebagai PMT (Pemberian Makanan Tambahan) mandiri berbasis posyandu remaja.',
                ],
            ]);
            $this->command?->info('[seed] SkripsiResearch seeded from portfolioData.ts');
        }

        if (ClinicalCase::count() === 0) {
            ClinicalCase::create([
                'code' => 'KASUS-KLINIS-01',
                'title' => 'Asuhan Gizi Pasien Diabetes Melitus Tipe 2 dengan Komplikasi CKD Stadium IIIb',
                'patient_profile' => [
                    'initial' => 'Tn. S',
                    'age' => 58,
                    'gender' => 'Laki-laki',
                    'room' => 'Ruang Rawat Inap Penyakit Dalam (Seruni 4)',
                    'medicalDiagnosis' => 'DM Tipe 2 Uncontrolled + CKD Stage IIIb + Hipertensi Grade II',
                    'dietOrder' => 'Diet DM 1700 kkal Rendah Protein 0.6-0.8 g/kgBB Rendah Garam II',
                ],
                'adime' => [
                    'assessment' => [
                        'antropometri' => 'TB: 168 cm, BB Aktual: 64 kg, BBI: 61.2 kg, IMT: 22.7 kg/m² (Status Gizi Normal / Normoweight). Tidak ada edema anasarka.',
                        'biokimia' => [
                            ['test' => 'Gula Darah Sewaktu (GDS)', 'result' => '248 mg/dL', 'normal' => '< 140 mg/dL', 'status' => 'high'],
                            ['test' => 'HbA1c', 'result' => '8.9%', 'normal' => '< 6.5%', 'status' => 'high'],
                            ['test' => 'Ureum Darah', 'result' => '72 mg/dL', 'normal' => '15 - 45 mg/dL', 'status' => 'high'],
                            ['test' => 'Kreatinin Serum', 'result' => '2.4 mg/dL', 'normal' => '0.7 - 1.3 mg/dL', 'status' => 'high'],
                            ['test' => 'eGFR', 'result' => '38 mL/min/1.73m²', 'normal' => '> 90 mL/min', 'status' => 'low'],
                            ['test' => 'Kalium Serum', 'result' => '4.8 mEq/L', 'normal' => '3.5 - 5.0 mEq/L', 'status' => 'normal'],
                            ['test' => 'Tekanan Darah', 'result' => '155/95 mmHg', 'normal' => '< 120/80 mmHg', 'status' => 'high'],
                        ],
                        'fisikKlinis' => 'Keadaan umum: Sedang, compos mentis. Keluhan: Cepat lelah, sering haus (polidipsi), nocturia 3-4x semalam. Mual ringan di pagi hari.',
                        'dietaryHistory' => 'Riwayat makan SMRS: Pola makan tinggi karbohidrat sederhana (gemar teh manis 3x/hari), konsumsi protein hewani berlebih (daging merah berlemak), asupan garam tinggi (sering makan kerupuk dan ikan asin). Asupan recall 24 jam: Energi 120% kebutuhan, Natrium 2400 mg.',
                    ],
                    'diagnosisPES' => [
                        'problem' => 'NI-5.1: Asupan karbohidrat sederhana berlebih & NI-5.7.1: Asupan protein tidak sesuai kebutuhan metabolik ginjal',
                        'etiology' => 'Kurangnya literasi gizi mengenai modifikasi diet komplikasi diabetes dan penyakit ginjal kronik pramusim dialisis',
                        'signsSymptoms' => 'Ditandai dengan HbA1c 8.9%, GDS 248 mg/dL, kreatinin serum 2.4 mg/dL, eGFR 38 mL/min, serta riwayat kebiasaan konsumsi teh manis dan lauk asin harian.',
                        'formattedPES' => 'Asupan makronutrien tidak adekuat (NI-5.1 & NI-5.7.1) berkaitan dengan kurangnya pengetahuan pemilihan makanan terkait DM + CKD dibuktikan oleh HbA1c 8.9%, eGFR 38 mL/min/1.73m², dan estimasi asupan natrium 2400 mg/hari.',
                    ],
                    'intervention' => [
                        'tujuanDiet' => [
                            'Membantu mengontrol kadar glukosa darah mendekati normal (GDS < 180 mg/dL).',
                            'Mencegah penurunan fungsi ginjal lebih lanjut dengan membatasi beban filtrasi glomerulus (protein 0.7 g/kg BBI/hari).',
                            'Mengontrol tekanan darah dengan restriksi natrium 1000-1200 mg/hari (Diet Rendah Garam II).',
                            'Menjaga status gizi tetap optimal dan mencegah katabolisme massa otot.',
                        ],
                        'prinsipSyaratDiet' => [
                            'Energi: 30 kkal/kg BBI = 1.836 kkal ~ 1.800 kkal (Disesuaikan usia 58 th -5% = 1.700 kkal).',
                            'Protein: 0.7 g/kg BBI/hari = 43 gram (65% bernilai biologis tinggi: putih telur, ikan air tawar, daging ayam tanpa kulit).',
                            'Lemak: 25% dari total energi = 47 gram (utamakan MUFA/PUFA, batasi lemak jenuh < 7%).',
                            'Karbohidrat: Sisa kebutuhan energi = 277 gram (karbohidrat kompleks, indeks glikemik rendah).',
                            'Natrium: 1000 - 1200 mg/hari (setara 1/2 sdt garam dapur), hindari penyedap monosodium glutamat berlebih.',
                            'Cairan: 1.500 - 1.800 mL/hari (karena tidak ada oliguria/edema masif).',
                        ],
                        'perhitunganKebutuhan' => [
                            'energi' => '1.700 kkal',
                            'protein' => '43 gram (0.7 g/kgBB)',
                            'lemak' => '47 gram (25%)',
                            'karbohidrat' => '277 gram (65%)',
                            'cairan' => '1.600 mL / 24 jam',
                        ],
                        'menuContoh' => [
                            ['waktu' => 'Pagi (07.00)', 'menu' => 'Nasi Tim Beras Merah (100g) + Pepes Ikan Nila Daun Kemangi (50g) + Tumis Labu Siam Minyak Jagung (100g)', 'komposisi' => 'E: 380 kkal, P: 12g, L: 8g, KH: 62g'],
                            ['waktu' => 'Selingan Pagi (10.00)', 'menu' => 'Puding Agar-Agar Buah Naga (pemanis stevia/rendah kalori)', 'komposisi' => 'E: 65 kkal, P: 0.5g, L: 0.2g, KH: 15g'],
                            ['waktu' => 'Siang (12.30)', 'menu' => 'Nasi Putih (120g) + Ayam Panggang Bumbu Kuning tanpa Kulit (45g) + Tahu Kukus (30g) + Sayur Bening Oyong Wortel (100g) + Pepaya (100g)', 'komposisi' => 'E: 520 kkal, P: 16g, L: 14g, KH: 82g'],
                            ['waktu' => 'Selingan Sore (16.00)', 'menu' => 'Kukus Ubi Jalar Madu (75g) + Teh Tawar Hangat', 'komposisi' => 'E: 90 kkal, P: 1.2g, L: 0.3g, KH: 21g'],
                            ['waktu' => 'Malam (19.00)', 'menu' => 'Nasi Putih (100g) + Telur Dadar Putih Telur Sayur (60g) + Setup Buncis & Jagung Manis Muda (100g) + Apel Fuji (100g)', 'komposisi' => 'E: 445 kkal, P: 13g, L: 12g, KH: 71g'],
                        ],
                    ],
                    'monitoringEvaluasi' => [
                        'Antropometri: Pemantauan berat badan harian untuk deteksi retensi cairan.',
                        'Biokimia: Evaluasi GDS harian, profil ureum/kreatinin tiap 3 hari, elektrolit darah.',
                        'Fisik/Klinis: Monitoring keluhan mual, tekanan darah 2x sehari.',
                        'Dietary: Visual Comstock plate waste minimal > 80% porsi rumah sakit dihabiskan.',
                    ],
                    'keyLearning' => 'Pemberian diet pada pasien komorbid DM dan CKD stadium non-dialisis memerlukan presisi ketat dalam mengalkulasi rasio protein bernilai biologis tinggi tanpa memicu hiperglikemia ataupun uremia.',
                ],
                'key_learning' => 'Pemberian diet pada pasien komorbid DM dan CKD stadium non-dialisis memerlukan presisi ketat dalam mengalkulasi rasio protein bernilai biologis tinggi tanpa memicu hiperglikemia ataupun uremia.',
            ]);

            ClinicalCase::create([
                'code' => 'KASUS-KLINIS-02',
                'title' => 'Asuhan Gizi Pasien Pasca Bedah Laparotomi Eksplorasi (Post-Op Ileus Obstruktif)',
                'patient_profile' => [
                    'initial' => 'Ny. M',
                    'age' => 42,
                    'gender' => 'Perempuan',
                    'room' => 'Ruang Rawat Bedah Flamboyan',
                    'medicalDiagnosis' => 'Post Laparotomi H+3 a/i Ileus Obstruktif ec Adhesi Intraabdomen',
                    'dietOrder' => 'Transisi Diet Cair Jernih ke Cair Penuh bertahap Makanan Saring',
                ],
                'adime' => [
                    'assessment' => [
                        'antropometri' => 'TB: 155 cm, BB: 48 kg, BBI: 49.5 kg, IMT: 20.0 kg/m² (Normal). Penurunan BB 3 kg dalam 2 minggu terakhir karena mual muntah pra-operasi.',
                        'biokimia' => [
                            ['test' => 'Albumin Serum', 'result' => '2.8 g/dL', 'normal' => '3.5 - 5.0 g/dL', 'status' => 'low'],
                            ['test' => 'Hemoglobin', 'result' => '10.4 g/dL', 'normal' => '12.0 - 15.0 g/dL', 'status' => 'low'],
                            ['test' => 'Leukosit', 'result' => '11.200 /µL', 'normal' => '4.000 - 10.000 /µL', 'status' => 'high'],
                            ['test' => 'Natrium Serum', 'result' => '133 mEq/L', 'normal' => '135 - 145 mEq/L', 'status' => 'low'],
                        ],
                        'fisikKlinis' => 'Bising usus (+), flatus (+), mual berkurang, tidak ada distensi abdomen masif, luka operasi kering berbalut kasa.',
                        'dietaryHistory' => 'Puasa 24 jam pasca-bedah, infus parenteral Dextrose 5% + Aminofluid. Mulai toleransi air putih 30 mL/jam.',
                    ],
                    'diagnosisPES' => [
                        'problem' => 'NI-5.3: Peningkatan kebutuhan zat gizi spesifik (Protein & Energi) & NC-2.2: Perubahan nilai laboratorium terkait gizi (Hipoalbuminemia)',
                        'etiology' => 'Stres metabolik pasca pembedahan mayor dan proses penyembuhan luka insisi jaringan ikat',
                        'signsSymptoms' => 'Ditandai dengan kadar albumin serum 2.8 g/dL, penurunan BB 6% dalam 2 minggu, dan peningkatan biomarker inflamasi leukosit 11.200 /µL.',
                        'formattedPES' => 'Peningkatan kebutuhan protein dan energi (NI-5.3) berkaitan dengan katabolisme pasca laparotomi dibuktikan oleh albumin serum 2.8 g/dL dan luka pasca-bedah luas.',
                    ],
                    'intervention' => [
                        'tujuanDiet' => [
                            'Mempercepat proses penyembuhan luka operasi dengan menyuplai protein hewani dan asam amino esensial.',
                            'Mencegah defisiensi mikronutrien (Seng, Vitamin C, Vitamin A) untuk sintesis kolagen.',
                            'Meningkatkan kadar albumin serum menuju normal (> 3.5 g/dL).',
                            'Melakukan transisi bentuk makanan secara aman tanpa menimbulkan distensi atau kram saluran cerna.',
                        ],
                        'prinsipSyaratDiet' => [
                            'Energi: 35 kkal/kg BB = 1.680 kkal (Tinggi Energi Tinggi Protein / TETP).',
                            'Protein: 1.5 g/kg BB = 72 gram/hari (Fokus albumin ekstra: putih telur rebus 3 butir/hari, ekstrak ikan gabus/Channa striata).',
                            'Lemak: 20% total energi = 37 gram (rendah gas, emulsi mudah cerna).',
                            'Karbohidrat: 60% total energi = 252 gram.',
                            'Serat: Rendah serat pada tahap awal (menghindari residu berlebih pada anastomose usus).',
                        ],
                        'perhitunganKebutuhan' => [
                            'energi' => '1.680 kkal',
                            'protein' => '72 gram (1.5 g/kgBB)',
                            'lemak' => '37 gram (20%)',
                            'karbohidrat' => '252 gram (60%)',
                            'cairan' => '2.000 mL / 24 jam',
                        ],
                        'menuContoh' => [
                            ['waktu' => 'Pagi (07.00)', 'menu' => 'Bubur Saring Beras (150g) + Semur Daging Sapi Cincang Halus (40g) + Sup Telur Puyuh Kocok (30g) + Jus Sari Wortel Saring (100mL)', 'komposisi' => 'E: 390 kkal, P: 16g, L: 8g, KH: 60g'],
                            ['waktu' => 'Selingan Pagi (10.00)', 'menu' => 'Susu Komersial Formula Polimerik Tinggi Protein (200 mL) + Putih Telur Kukus (2 butir)', 'komposisi' => 'E: 250 kkal, P: 18g, L: 4g, KH: 28g'],
                            ['waktu' => 'Siang (12.30)', 'menu' => 'Bubur Halus (200g) + Ikan Gabus Kukus Bumbu Serai Halus (60g) + Tahu Sutra Siram Kuah Bening (50g) + Labu Kuning Puree (100g)', 'komposisi' => 'E: 420 kkal, P: 20g, L: 9g, KH: 64g'],
                            ['waktu' => 'Selingan Sore (16.00)', 'menu' => 'Puding Susu Kedelai + Ekstrak Putih Telur Manis (150g)', 'komposisi' => 'E: 160 kkal, P: 8g, L: 3g, KH: 25g'],
                            ['waktu' => 'Malam (19.00)', 'menu' => 'Bubur Halus (180g) + Ayam Giling Kukus Sayur (50g) + Sup Kaldu Bening Kentang Wortel Halus (100g) + Puree Pepaya (100g)', 'komposisi' => 'E: 410 kkal, P: 15g, L: 8g, KH: 68g'],
                        ],
                    ],
                    'monitoringEvaluasi' => [
                        'Toleransi Saluran Cerna: Evaluasi distensi perut, kram, frekuensi defekasi, dan residu lambung.',
                        'Laboratorium: Cek ulang kadar albumin serum pada hari ke-5 intervensi.',
                        'Klinis: Inspeksi visual tepi luka operasi dan regenerasi jaringan granulasi.',
                        'Asupan: Target asupan oral > 80% dalam 48 jam transisi.',
                    ],
                    'keyLearning' => 'Pemberian suplementasi asam amino spesifik (ekstrak ikan gabus & albumin putih telur) efektif mempercepat normalisasi kadar albumin serum dari 2.8 menjadi 3.3 g/dL dalam 5 hari observasi klinis.',
                ],
                'key_learning' => 'Pemberian suplementasi asam amino spesifik (ekstrak ikan gabus & albumin putih telur) efektif mempercepat normalisasi kadar albumin serum dari 2.8 menjadi 3.3 g/dL dalam 5 hari observasi klinis.',
            ]);
            $this->command?->info('[seed] ClinicalCase seeded from portfolioData.ts');
        }

        if (RotationExperience::count() === 0) {
            RotationExperience::create([
                'category' => 'Klinis (Dietetik RS)',
                'institution' => 'RSUP Fatmawati / RSUD Pasar Minggu',
                'period' => 'Februari – Mei 2026',
                'role' => 'Clinical Dietitian Intern (Rotasi Bedah, Penyakit Dalam, Pediatri)',
                'location' => 'Jakarta Selatan',
                'badges' => ['PAGT / NCP', 'ADIME Record', 'Skrining MUST / SGA', 'Konseling Pasien'],
                'achievements' => [
                    'Mengelola 14 kasus studi mendalam (Penyakit Ginjal Kronik, DM Tipe 2, Sirosis Hepatis, Post Laparotomi, Malnutrisi Anak).',
                    'Melakukan skrining gizi harian pada 120+ pasien rawat inap menggunakan formulir MUST dan MST.',
                    'Merancang 28 rencana modifikasi diet dan edukasi gizi pra-pulang (discharge planning) menggunakan leaflet khusus.',
                    'Melakukan konseling gizi intensif kepada pasien rawat jalan poli diabetes dan geriatri.',
                ],
                'highlight_metric' => '120+ Pasien diskrining & 14 Kasus Kelolaan Mandiri',
                'icon_name' => 'Stethoscope',
            ]);

            RotationExperience::create([
                'category' => 'MSPM (Food Service)',
                'institution' => 'Instalasi Gizi Rumah Sakit Umum Pusat',
                'period' => 'November 2025 – Januari 2026',
                'role' => 'Food Service Management Intern (MSPM)',
                'location' => 'Jakarta',
                'badges' => ['HACCP', 'Penyusunan Menu 10 Hari', 'Uji Organoleptik Masal', 'Food Costing'],
                'achievements' => [
                    "Menyusun Master Siklus Menu 10 Hari Diet Rendah Garam & Rendah Purin untuk 350 porsi/hari.",
                    'Melakukan audit titik kendali kritis (HACCP) pada alur penerimaan bahan segar hingga distribusi baki pasien kelas I, II, dan III.',
                    "Melakukan rekayasa modifikasi resep 'Nugget Ikan Tenggiri Sayur Rendah Natrium' dengan uji organoleptik panelis terlatih.",
                    'Menghitung Food Costing dan efisiensi unit cost per porsi menu rawat inap.',
                ],
                'highlight_metric' => 'Audit 6 Titik Kritis HACCP & Siklus Menu 350 Porsi',
                'icon_name' => 'UtensilsCrossed',
            ]);

            RotationExperience::create([
                'category' => 'Gizi Masyarakat (Puskesmas)',
                'institution' => 'Puskesmas Kecamatan Pancoran Mas & Posyandu Binaan',
                'period' => 'Agustus – Oktober 2025',
                'role' => 'Community Nutrition Specialist Intern',
                'location' => 'Depok, Jawa Barat',
                'badges' => ['PSG Balita', 'Edukasi MP-ASI', 'Intervensi Stunting', 'Survei Konsumsi'],
                'achievements' => [
                    "Memimpin program intervensi gizi 'Piring Cerdas Balita': Edukasi PMBA (Pemberian Makan Bayi dan Anak) untuk 45 ibu balita gizi kurang.",
                    'Melakukan Penilaian Status Gizi (PSG) antropometri (TB/U, BB/U, BB/TB, LiLA) pada 180 balita di 4 posyandu.',
                    'Menyelenggarakan survei konsumsi pangan metode 24-Hour Food Recall dan Semi-Quantitative FFQ pada komunitas remaja putri.',
                    "Menyusun modul panduan 'MP-ASI Kaya Protein Hewani Lokal' untuk kader posyandu.",
                ],
                'highlight_metric' => '180 Balita Diskrining & 45 Ibu Terlatih PMBA',
                'icon_name' => 'HeartPulse',
            ]);

            RotationExperience::create([
                'category' => 'Akademik & Riset',
                'institution' => 'Laboratorium Gizi & Pangan Universitas Ngadi Waluyo',
                'period' => '2024 – 2026',
                'role' => 'Asisten Praktikum & Peneliti Mahasiswa',
                'location' => 'Kampus UNW Ungaran',
                'badges' => ['Biokimia Gizi', 'Analisis Proksimat', 'Spektrofotometri Fe', 'Uji Sensori'],
                'achievements' => [
                    'Membimbing 60+ mahasiswa junior dalam praktikum Analisis Zat Gizi Pangan (Kadar Air, Abu, Lemak Soxhlet, Protein Kjeldahl).',
                    'Mengoperasikan instrumen AAS (Atomic Absorption Spectrophotometry) untuk analisis mikromineral zat besi.',
                    'Membantu penulisan artikel ilmiah penelitian formulasi pangan lokal.',
                ],
                'highlight_metric' => '2 Tahun Masa Bakti Asisten Praktikum',
                'icon_name' => 'FlaskConical',
            ]);
            $this->command?->info('[seed] RotationExperience seeded from portfolioData.ts');
        }

        if (MediaInfographic::count() === 0) {
            MediaInfographic::create([
                'title' => 'Panduan Diet DASH: Sahabat Jantung Sehat Tanpa Garam Berlebih',
                'category' => 'Leaflet Pasien',
                'target_audience' => 'Pasien Hipertensi Rawat Jalan & Keluarga',
                'description' => 'Media edukasi lipat tiga (trifold) mengenai substitusi garam dengan rempah aromatik alami (bawang putih, serai, ketumbar), takaran aman natrium harian (< 1 sendok teh), dan piramida kalium.',
                'key_points' => ['Takaran Natrium < 2000mg/hari', 'Sumber Kalium: Pisang, Alpukat, Bayam', 'Label Reading: Waspada Natrium Tersembunyi'],
                'thumbnail_bg' => 'from-[#FDE2E4] to-[#FAD2E1]',
                'accent_color' => '#E098AA',
                'dimensions' => 'Trifold A4 / Siap Cetak & Digital',
            ]);

            MediaInfographic::create([
                'title' => '1000 Hari Pertama Kehidupan (HPK): Fondasi Emas Bebas Stunting',
                'category' => 'Poster Edukasi',
                'target_audience' => 'Ibu Hamil, Ibu Menyusui, dan Kader Posyandu',
                'description' => 'Poster infografis visual tentang pentingnya tablet tambah darah (TTD) bagi ibu hamil, ASI Eksklusif 6 bulan, dan pengenalan MP-ASI kaya protein hewani telur/ikan.',
                'key_points' => ['Asupan Fe & Asam Folat Trimester I-III', 'Tekstur MP-ASI bertahap 6-24 bulan', 'Pantau KMS di Posyandu rutin'],
                'thumbnail_bg' => 'from-[#FFF0F3] to-[#FDE2E4]',
                'accent_color' => '#D48B9D',
                'dimensions' => 'Poster A2 / Infografis Instagram @gizicerdas',
            ]);

            MediaInfographic::create([
                'title' => 'Mitos vs Fakta Gula Darah & Karbohidrat pada Penderita Diabetes',
                'category' => 'Media Digital',
                'target_audience' => 'Dewasa Muda & Komunitas Peduli Diabetes',
                'description' => "Seri carousel edukasi digital mengupas tuntas mitos 'penderita diabetes tidak boleh makan nasi putih sama sekali' vs konsep Indeks Glikemik & Porsi Karbohidrat Terhitung.",
                'key_points' => ['Konsep Glycemic Index & Glycemic Load', 'Metode Isi Piringku: 1/4 Karbo, 1/4 Protein, 1/2 Sayur Buah', 'Jadwal Makan 3J (Jadwal, Jumlah, Jenis)'],
                'thumbnail_bg' => 'from-[#F8E9ED] to-[#F3D1DC]',
                'accent_color' => '#C97A8E',
                'dimensions' => 'Instagram Carousel 1080x1350px',
            ]);

            MediaInfographic::create([
                'title' => 'Biskuit Fungsional Kelor-Bekatul: Formulation Prototype Showcase',
                'category' => 'Formulasi Pangan',
                'target_audience' => 'Akademisi, Peneliti Pangan, dan UMKM Nutrisi',
                'description' => 'Dokumentasi visual uji coba lab pembuatan snack padat gizi berbasis mocaf dengan analisis tekstur crispness dan daya simpan.',
                'key_points' => ['Substitusi 15% Tepung Kelor & 15% Bekatul', 'Rasa Renyah Gurih Gurih Alami', 'Bebas Gluten / Gluten-Free Snack'],
                'thumbnail_bg' => 'from-[#FDF2F4] to-[#FBE0E6]',
                'accent_color' => '#BA687D',
                'dimensions' => 'Photo Research Portfolio',
            ]);
            $this->command?->info('[seed] MediaInfographic seeded from portfolioData.ts');
        }

        if (SkillsAndCompetency::count() === 0) {
            SkillsAndCompetency::create([
                'clinical' => [
                    ['name' => 'Proses Asuhan Gizi Terstandar (PAGT / ADIME)', 'level' => 'Mahir', 'desc' => 'Perumusan diagnosis gizi PES, estimasi kebutuhan makro/mikronutrien klinis, dan monitoring berkala.'],
                    ['name' => 'Penilaian Status Gizi (Antropometri & Klinis)', 'level' => 'Mahir', 'desc' => 'Pengukuran Skinfold Caliper, LiLA, Tinggi Lutut, Rentang Lengan, serta interpretasi z-score WHO.'],
                    ['name' => 'Konseling Gizi & Wawancara Motivasional', 'level' => 'Lanjutan', 'desc' => 'Teknik Motivational Interviewing untuk perubahan perilaku makan jangka panjang pasien kronis.'],
                    ['name' => 'Perencanaan Menu Diet Khusus (Dietetik)', 'level' => 'Mahir', 'desc' => 'Penyusunan menu Diet Rendah Garam, Rendah Protein, Rendah Purin, Rendah Kolesterol, dan TETP.'],
                ],
                'food_service' => [
                    ['name' => 'Hazard Analysis Critical Control Point (HACCP)', 'level' => 'Tersertifikasi', 'desc' => 'Audit keamanan pangan, identifikasi CCP suhu dan bahaya mikrobiologi pada pengolahan makanan RS.'],
                    ['name' => 'Manajemen Penyelenggaraan Makanan (MSPM)', 'level' => 'Mahir', 'desc' => 'Master siklus menu 10 hari, standardisasi porsi, spesifikasi bahan makanan, dan food costing.'],
                    ['name' => 'Uji Sensori & Organoleptik Pangan', 'level' => 'Mahir', 'desc' => 'Uji hedonik, uji mutu hedonik, uji deskriptif pada formulasi pangan fungsional.'],
                ],
                'software' => [
                    ['name' => 'NutriSurvey', 'level' => 'Mahir', 'desc' => 'Input recall pangan 24 jam, konversi database TKPI/DKBM, dan analisis defisit zat gizi mikro/makro.'],
                    ['name' => 'WHO Anthro & AnthroPlus', 'level' => 'Mahir', 'desc' => 'Kalkulasi z-score pertumbuhan balita dan anak usia sekolah berdasarkan standar WHO 2006.'],
                    ['name' => 'SPSS Statistics', 'level' => 'Menengah', 'desc' => 'Uji ANOVA, Kruskal-Wallis, Chi-Square, dan regresi linier untuk analisis data riset gizi.'],
                    ['name' => 'Canva & Adobe Illustrator (Medical Infographics)', 'level' => 'Mahir', 'desc' => 'Desain media komunikasi, informasi, dan edukasi (KIE) gizi berbasis bukti ilmiah.'],
                ],
                'certifications' => [
                    ['name' => 'Sertifikat Pelatihan Dasar HACCP & Food Safety', 'issuer' => 'Indonesian Food Safety Professional Institute', 'year' => '2025'],
                    ['name' => 'Webinar Nasional: Asuhan Gizi Pasien ICU & Critical Care', 'issuer' => 'Asosiasi Dietisien Indonesia (AsDI)', 'year' => '2026'],
                    ['name' => 'Konseling Menyusui & PMBA 40 Jam Modul WHO/Kemenkes', 'issuer' => 'Dinas Kesehatan & PUI Gizi', 'year' => '2025'],
                    ['name' => 'TOEFL ITP Score: 580', 'issuer' => 'Language Center Universitas Ngadi Waluyo', 'year' => '2025'],
                ],
            ]);
            $this->command?->info('[seed] SkillsAndCompetency seeded from portfolioData.ts');
        }

        if (SectionVisibility::count() === 0) {
            SectionVisibility::create([
                'skripsi' => true,
                'workbench' => true,
                'cases' => true,
                'rotations' => true,
                'media' => true,
                'skills' => true,
            ]);
            $this->command?->info('[seed] SectionVisibility seeded (all sections visible by default)');
        }
    }
}
