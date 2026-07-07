# Arsitektur Informasi

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Pengguna & Ruang Lingkup](./02-users-and-scope.md) | [Selanjutnya: Persyaratan Fungsional](./04-functional-requirements.md)

---

## 6. Arsitektur Informasi

### 6.1 Peta Situs — Publik

```
/
├── /                          → Beranda
├── /tentang-kami              → Profil, Visi & Misi
├── /program
│   ├── /program/isra-miraj
│   ├── /program/maulid-nabi
│   └── /program/sanlat
├── /kegiatan                  → Daftar kegiatan
│   └── /kegiatan/[slug]       → Detail kegiatan
├── /agenda                    → Daftar agenda
│   └── /agenda/[slug]         → Detail agenda
├── /artikel                   → Daftar artikel
│   └── /artikel/[slug]        → Detail artikel
├── /galeri                    → Galeri foto & video
├── /donasi                    → Info donasi (opsional)
├── /kontak                    → Form kontak + peta
└── /dokumen                   → Daftar dokumen unduhan
```

### 6.2 Peta Situs — Admin

```
/admin
├── /admin/login               → Halaman login
├── /admin/dashboard           → Dashboard statistik
├── /admin/artikel             → CRUD Artikel
├── /admin/kegiatan            → CRUD Kegiatan
├── /admin/agenda              → CRUD Agenda
├── /admin/galeri              → CRUD Galeri
├── /admin/banner              → CRUD Banner
├── /admin/pengurus            → CRUD Pengurus
├── /admin/program             → CRUD Program
├── /admin/dokumen             → CRUD Dokumen
├── /admin/pengguna            → CRUD Pengguna (Super Admin)
└── /admin/pengaturan          → Pengaturan umum
```

### 6.3 Navigasi Utama (Navbar)

| Menu | URL | Keterangan |
|------|-----|------------|
| Beranda | `/` | Landing page |
| Tentang Kami | `/tentang-kami` | Profil organisasi |
| Program | `/program` | Dropdown: Isra Miraj, Maulid Nabi, Sanlat |
| Galeri | `/galeri` | Foto & video |
| Artikel Islami | `/artikel` | Blog/dakwah |
| Donasi | `/donasi` | Opsional |
| Kontak | `/kontak` | Form & peta |

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Pengguna & Ruang Lingkup](./02-users-and-scope.md) | [Selanjutnya: Persyaratan Fungsional](./04-functional-requirements.md)
