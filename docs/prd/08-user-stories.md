# User Stories

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Arsitektur Teknis](./07-technical-architecture.md) | [Selanjutnya: Skema Data](./09-database-schema.md)

---

## 11. User Stories & Acceptance Criteria

### 11.1 Epic: Website Publik

#### US-01: Melihat Beranda
> **Sebagai** pengunjung, **saya ingin** melihat halaman beranda yang informatif **agar** saya dapat mengenal RMI dengan cepat.

**Acceptance Criteria:**
- [ ] Hero banner tampil dengan tagline dan 2 tombol CTA
- [ ] Semua section (tentang, visi-misi, program, agenda, berita, galeri, statistik, testimoni) tampil
- [ ] Halaman load dalam < 3 detik di koneksi 3G
- [ ] Responsif di mobile, tablet, dan desktop

#### US-02: Membaca Artikel
> **Sebagai** jamaah, **saya ingin** membaca artikel Islami **agar** saya mendapat ilmu tambahan.

**Acceptance Criteria:**
- [ ] Daftar artikel tampil dengan thumbnail, judul, tanggal, kategori
- [ ] Dapat filter berdasarkan kategori
- [ ] Dapat search berdasarkan kata kunci
- [ ] Halaman detail menampilkan konten lengkap
- [ ] Dapat share artikel ke WA/sosmed

#### US-03: Melihat Agenda Kegiatan
> **Sebagai** remaja masjid, **saya ingin** melihat agenda kegiatan terdekat **agar** saya tidak ketinggalan acara.

**Acceptance Criteria:**
- [ ] Agenda terdekat tampil di beranda (max 5)
- [ ] Halaman agenda menampilkan semua kegiatan upcoming
- [ ] Dapat filter berdasarkan tanggal/kategori
- [ ] Detail kegiatan menampilkan info lengkap (tanggal, lokasi, deskripsi)

#### US-04: Menghubungi RMI
> **Sebagai** calon anggota, **saya ingin** menghubungi pengurus RMI **agar** saya bisa bertanya atau mendaftar.

**Acceptance Criteria:**
- [ ] Form kontak berfungsi dengan validasi
- [ ] Pesan terkirim dan notifikasi sukses tampil
- [ ] Google Maps menampilkan lokasi masjid
- [ ] Tombol WhatsApp floating tersedia di semua halaman

#### US-05: Melihat Galeri
> **Sebagai** pengunjung, **saya ingin** melihat dokumentasi kegiatan **agar** saya tahu aktivitas RMI.

**Acceptance Criteria:**
- [ ] Grid foto responsif
- [ ] Lightbox preview saat klik foto
- [ ] Filter berdasarkan kegiatan
- [ ] Gambar lazy loaded

### 11.2 Epic: Panel Admin

#### US-06: Login Admin
> **Sebagai** admin, **saya ingin** login ke panel admin **agar** saya dapat mengelola konten website.

**Acceptance Criteria:**
- [ ] Login dengan email & password
- [ ] Error message jelas jika kredensial salah
- [ ] Redirect ke dashboard setelah login sukses
- [ ] Token disimpan dan digunakan untuk request berikutnya

#### US-07: Mengelola Artikel
> **Sebagai** admin, **saya ingin** membuat dan mengedit artikel **agar** konten dakwah selalu update.

**Acceptance Criteria:**
- [ ] Form create artikel: judul, konten, kategori, thumbnail, status
- [ ] Rich text editor untuk konten
- [ ] Upload thumbnail ke cloud storage
- [ ] Status draft/published
- [ ] Artikel published tampil di website publik
- [ ] Dapat edit dan hapus artikel existing

#### US-08: Mengelola Kegiatan & Agenda
> **Sebagai** admin, **saya ingin** mengelola kegiatan dan agenda **agar** jamaah mendapat info terkini.

**Acceptance Criteria:**
- [ ] CRUD kegiatan lengkap
- [ ] CRUD agenda lengkap
- [ ] Set tanggal, waktu, lokasi
- [ ] Kegiatan upcoming tampil di beranda

#### US-09: Mengelola Galeri
> **Sebagai** admin, **saya ingin** upload foto kegiatan **agar** dokumentasi terarsip.

**Acceptance Criteria:**
- [ ] Upload multiple images
- [ ] Kategorisasi per kegiatan
- [ ] Preview dan hapus gambar
- [ ] Gambar tampil di halaman galeri publik

#### US-10: Melihat Dashboard
> **Sebagai** admin, **saya ingin** melihat ringkasan statistik **agar** saya tahu kondisi website.

**Acceptance Criteria:**
- [ ] Jumlah artikel, agenda, galeri ditampilkan
- [ ] Quick link ke modul CRUD
- [ ] Data real-time dari database

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Arsitektur Teknis](./07-technical-architecture.md) | [Selanjutnya: Skema Data](./09-database-schema.md)
