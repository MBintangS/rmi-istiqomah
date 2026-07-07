# Persyaratan Fungsional

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Arsitektur Informasi](./03-information-architecture.md) | [Selanjutnya: Persyaratan Non-Fungsional](./05-non-functional-requirements.md)

---

## 7. Persyaratan Fungsional

### 7.1 Halaman Beranda

| ID | Requirement | Prioritas | Keterangan |
|----|-------------|-----------|------------|
| FR-HOME-01 | Hero banner dengan tagline organisasi | Must | Dikelola via admin (CRUD Banner) |
| FR-HOME-02 | Tombol CTA "Lihat Kegiatan" → `/kegiatan` | Must | — |
| FR-HOME-03 | Tombol CTA "Gabung Bersama Kami" → `/kontak` atau WA | Must | — |
| FR-HOME-04 | Section profil singkat RMI | Must | Link ke `/tentang-kami` |
| FR-HOME-05 | Section Visi & Misi | Must | Konten dari CMS |
| FR-HOME-06 | Section Program Unggulan (3 program) | Must | Card dengan link ke detail program |
| FR-HOME-07 | Section Agenda Terdekat (max 5 item) | Must | Diurutkan tanggal terdekat |
| FR-HOME-08 | Section Berita Terbaru (max 6 artikel) | Must | Artikel terbaru yang published |
| FR-HOME-09 | Section Dokumentasi/Galeri (preview) | Must | 6–8 thumbnail, link ke `/galeri` |
| FR-HOME-10 | Section Statistik (kegiatan, pengurus, anggota, tahun berdiri) | Should | Data dari CMS |
| FR-HOME-11 | Section Testimoni | Should | Carousel/slider |
| FR-HOME-12 | Footer lengkap (alamat, WA, email, sosmed, maps) | Must | — |

### 7.2 Halaman Tentang Kami

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-ABOUT-01 | Profil lengkap organisasi RMI | Must |
| FR-ABOUT-02 | Visi & Misi detail | Must |
| FR-ABOUT-03 | Sejarah singkat organisasi | Should |
| FR-ABOUT-04 | Daftar pengurus dengan foto & jabatan | Must |
| FR-ABOUT-05 | Foto organisasi/kegiatan | Should |

### 7.3 Halaman Program

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-PROG-01 | Halaman index semua program | Must |
| FR-PROG-02 | Halaman detail per program (Isra Miraj, Maulid Nabi, Sanlat) | Must |
| FR-PROG-03 | Deskripsi, jadwal, galeri terkait per program | Must |
| FR-PROG-04 | CTA untuk info lebih lanjut / daftar | Should |

### 7.4 Halaman Artikel

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-ART-01 | Daftar artikel dengan pagination | Must |
| FR-ART-02 | Filter berdasarkan kategori | Must |
| FR-ART-03 | Search artikel by judul/konten | Must |
| FR-ART-04 | Halaman detail artikel dengan rich content | Must |
| FR-ART-05 | Share ke media sosial (WA, FB, Twitter/X) | Must |
| FR-ART-06 | Artikel terkait di halaman detail | Should |
| FR-ART-07 | Estimasi waktu baca | Could |
| FR-ART-08 | Hanya artikel berstatus `published` yang tampil di publik | Must |

### 7.5 Halaman Kegiatan & Agenda

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-EVT-01 | Daftar kegiatan dengan pagination | Must |
| FR-EVT-02 | Filter kegiatan (kategori, tanggal) | Must |
| FR-EVT-03 | Search kegiatan by judul/deskripsi | Must |
| FR-EVT-04 | Halaman detail kegiatan (judul, deskripsi, tanggal, lokasi, galeri) | Must |
| FR-EVT-05 | Agenda terdekat terpisah atau terintegrasi | Must |
| FR-EVT-06 | Badge status: upcoming / ongoing / completed | Should |
| FR-EVT-07 | Integrasi Google Maps di detail (jika ada lokasi) | Should |

### 7.6 Halaman Galeri

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-GAL-01 | Grid galeri foto responsif | Must |
| FR-GAL-02 | Lightbox untuk preview foto | Must |
| FR-GAL-03 | Filter berdasarkan kegiatan/kategori | Must |
| FR-GAL-04 | Dukungan embed video (YouTube) | Should |
| FR-GAL-05 | Lazy loading gambar | Must |

### 7.7 Halaman Kontak

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-CONT-01 | Form kontak (nama, email, subjek, pesan) | Must |
| FR-CONT-02 | Validasi form client & server side | Must |
| FR-CONT-03 | Embed Google Maps | Must |
| FR-CONT-04 | Info kontak: alamat, WA, email | Must |
| FR-CONT-05 | Tombol WhatsApp floating di seluruh halaman | Must |
| FR-CONT-06 | Notifikasi sukses/error setelah submit form | Must |

### 7.8 Halaman Dokumen

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-DOC-01 | Daftar dokumen yang dapat diunduh | Must |
| FR-DOC-02 | Info file (nama, ukuran, tanggal upload) | Must |
| FR-DOC-03 | Tombol download | Must |

### 7.9 Fitur Publik Lainnya

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-PUB-01 | Search global (artikel + kegiatan) | Should |
| FR-PUB-02 | Breadcrumb di halaman detail | Must |
| FR-PUB-03 | 404 page custom | Must |
| FR-PUB-04 | Loading skeleton di semua halaman data | Must |
| FR-PUB-05 | Empty state jika tidak ada data | Must |

### 7.10 Panel Admin — Autentikasi

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-AUTH-01 | Login dengan email & password | Must |
| FR-AUTH-02 | JWT token dengan expiry | Must |
| FR-AUTH-03 | Refresh token mechanism | Should |
| FR-AUTH-04 | Logout & invalidate session | Must |
| FR-AUTH-05 | Protected routes berdasarkan role | Must |
| FR-AUTH-06 | Redirect ke login jika belum auth | Must |

### 7.11 Panel Admin — Dashboard

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-DASH-01 | Statistik: jumlah artikel | Must |
| FR-DASH-02 | Statistik: jumlah agenda | Must |
| FR-DASH-03 | Statistik: jumlah pengunjung | Should |
| FR-DASH-04 | Statistik: jumlah galeri | Must |
| FR-DASH-05 | Quick actions ke modul CRUD | Should |
| FR-DASH-06 | Artikel/kegiatan terbaru | Should |

### 7.12 Panel Admin — CRUD (Semua Modul)

Setiap modul CRUD harus memiliki operasi berikut:

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| FR-CRUD-01 | **Create** — Form tambah data baru | Must |
| FR-CRUD-02 | **Read** — Tabel/list data dengan pagination | Must |
| FR-CRUD-03 | **Update** — Form edit data existing | Must |
| FR-CRUD-04 | **Delete** — Hapus dengan konfirmasi modal | Must |
| FR-CRUD-05 | Validasi form dengan Zod | Must |
| FR-CRUD-06 | Upload gambar ke cloud storage | Must |
| FR-CRUD-07 | Preview sebelum publish (artikel) | Should |
| FR-CRUD-08 | Status draft/published (artikel, kegiatan) | Must |
| FR-CRUD-09 | Toast notification sukses/error | Must |
| FR-CRUD-10 | Search & filter di tabel admin | Should |

#### Modul CRUD Spesifik

| Modul | Field Utama |
|-------|-------------|
| **Artikel** | judul, slug, konten (rich text), kategori, thumbnail, status, meta SEO |
| **Kegiatan** | judul, slug, deskripsi, tanggal mulai/selesai, lokasi, kategori, thumbnail, galeri, status |
| **Agenda** | judul, tanggal, waktu, lokasi, deskripsi, terkait kegiatan (opsional) |
| **Galeri** | judul, gambar/video, kategori, kegiatan terkait, urutan |
| **Banner** | judul, gambar, link, urutan, aktif/nonaktif |
| **Pengurus** | nama, jabatan, foto, periode, urutan |
| **Program** | nama, slug, deskripsi, icon/gambar, konten detail |
| **Dokumen** | nama, file, kategori, deskripsi |
| **Pengguna** | nama, email, password, role (superadmin/admin) |

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Arsitektur Informasi](./03-information-architecture.md) | [Selanjutnya: Persyaratan Non-Fungsional](./05-non-functional-requirements.md)
