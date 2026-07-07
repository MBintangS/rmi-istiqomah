# Pengguna & Ruang Lingkup

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Ringkasan, Latar Belakang & Visi](./01-product-overview.md) | [Selanjutnya: Arsitektur Informasi](./03-information-architecture.md)

---

## 4. Target Pengguna & Persona

### 4.1 Pengguna Publik

| Persona | Profil | Kebutuhan Utama | Perilaku |
|---------|--------|-----------------|----------|
| **Ahmad — Jamaah Remaja** | Usia 15–25, aktif di medsos | Cari info kegiatan, gabung RMI | Akses via HP, scroll cepat |
| **Bu Siti — Orang Tua Jamaah** | Usia 40–55, pengguna HP dasar | Info agenda masjid, artikel Islami | Butuh UI sederhana & jelas |
| **Rizki — Calon Anggota** | Remaja baru kenal RMI | Profil organisasi, cara bergabung | Baca tentang kami & testimoni |
| **Pengunjung Umum** | Masyarakat luas | Konten dakwah, info masjid | Datang dari Google/sosmed |

### 4.2 Pengguna Admin

| Role | Hak Akses | Tanggung Jawab |
|------|-----------|----------------|
| **Super Admin** | Full access | Kelola semua konten, pengguna, konfigurasi |
| **Admin** | CRUD konten | Kelola artikel, kegiatan, agenda, galeri |

### 4.3 Matriks Akses Role

| Fitur | Super Admin | Admin | Publik |
|-------|:-----------:|:-----:|:------:|
| Lihat halaman publik | ✅ | ✅ | ✅ |
| CRUD Artikel | ✅ | ✅ | ❌ |
| CRUD Kegiatan/Agenda | ✅ | ✅ | ❌ |
| CRUD Galeri | ✅ | ✅ | ❌ |
| CRUD Banner | ✅ | ✅ | ❌ |
| CRUD Pengurus | ✅ | ✅ | ❌ |
| CRUD Program | ✅ | ✅ | ❌ |
| CRUD Dokumen | ✅ | ✅ | ❌ |
| Kelola Pengguna | ✅ | ❌ | ❌ |
| Lihat Dashboard Statistik | ✅ | ✅ | ❌ |

---

## 5. Ruang Lingkup Produk

### 5.1 Dalam Ruang Lingkup (In Scope)

#### Website Publik
- Halaman Beranda dengan semua section yang ditentukan
- Halaman Tentang Kami (profil, visi & misi)
- Halaman Program (Isra Miraj, Maulid Nabi, Sanlat)
- Halaman Galeri (foto & video)
- Halaman Artikel Islami (list, detail, search, filter)
- Halaman Agenda/Kegiatan (list, detail, search, filter)
- Halaman Kontak (form + Google Maps)
- Fitur Donasi (opsional — lihat catatan)
- Search global artikel & kegiatan
- Share artikel ke media sosial
- Download dokumen publik
- Tombol WhatsApp floating
- Responsive di semua perangkat

#### Panel Admin
- Autentikasi JWT (login/logout)
- Dashboard statistik
- CRUD lengkap: Artikel, Kegiatan, Agenda, Galeri, Banner, Pengurus, Program, Dokumen
- Manajemen pengguna (Super Admin only)
- Upload media (gambar, dokumen)

#### Teknis
- API RESTful dengan Express.js
- Database MongoDB
- Image storage (Cloudinary atau Supabase Storage — tier gratis)
- SEO lengkap (meta, OG, sitemap, structured data)
- Dokumentasi API, schema DB, deployment guide

### 5.2 Di Luar Ruang Lingkup (Out of Scope) — Fase 1

| Item | Alasan | Fase Berikutnya |
|------|--------|-----------------|
| Aplikasi mobile native | Fokus web responsive dulu | Fase 2 |
| Sistem keanggotaan online (registrasi anggota) | Kompleksitas tambahan | Fase 2 |
| Payment gateway donasi | Perlu legal & integrasi payment | Fase 2 |
| Live streaming kegiatan | Infrastruktur tambahan | Fase 3 |
| Multi-bahasa (i18n) | Konten utama Bahasa Indonesia | Fase 3 |
| Notifikasi push | Perlu service worker/PWA | Fase 2 |
| Forum/diskusi komunitas | Moderasi kompleks | Fase 3 |
| Sistem absensi kegiatan | Fitur operasional terpisah | Fase 2 |

### 5.3 Catatan Fitur Opsional

**Donasi**: Halaman donasi bersifat opsional. Jika diimplementasikan di Fase 1, cukup menampilkan informasi rekening/nomor donasi statis tanpa payment gateway. Integrasi payment masuk Out of Scope.

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Ringkasan, Latar Belakang & Visi](./01-product-overview.md) | [Selanjutnya: Arsitektur Informasi](./03-information-architecture.md)
