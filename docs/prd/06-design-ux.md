# Desain & UX

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Persyaratan Non-Fungsional](./05-non-functional-requirements.md) | [Selanjutnya: Arsitektur Teknis](./07-technical-architecture.md)

---

## 9. Persyaratan Desain & UX

### 9.1 Arah Desain

| Aspek | Spesifikasi |
|-------|-------------|
| Gaya | Modern, Islami, minimalis, elegan, bersih |
| Pendekatan | Mobile-first, responsive |
| Whitespace | Banyak ruang kosong untuk kesan tenang |
| Icon | Sederhana (Lucide React) |
| Card | Modern dengan soft shadow & rounded corner |
| Animasi | Ringan (Framer Motion) — fade, slide, hover |
| Interaksi | Feedback jelas (toast, loading, empty state) |

### 9.2 Palet Warna

| Token | Hex | Penggunaan |
|-------|-----|------------|
| Primary | `#4e830a` | Tombol utama, link, aksen |
| Primary Dark | `#3c5e0a` | Hover state |
| Primary Light | `#6b9129` | Background aksen |
| Secondary | `#D4AF37` | Aksen emas, highlight |
| Secondary Alt | `#c0a34e` | Variasi secondary |
| Background | `#ebded3` | Background utama (warm) |
| Surface | `#F8FAFC` | Card, panel |
| Text Primary | `#1F2937` | Teks utama |
| Text Dark | `#23300a` | Heading |
| Accent Green | `#94a658` | Badge, tag |
| Accent Green 2 | `#477909` | Icon, border |
| Accent Green 3 | `#598712` | Gradient |

### 9.3 Tipografi

| Elemen | Font | Weight | Size (Desktop) |
|--------|------|--------|----------------|
| Heading H1 | Poppins / Inter | Bold (700) | 36–48px |
| Heading H2 | Poppins / Inter | SemiBold (600) | 28–32px |
| Heading H3 | Poppins / Inter | SemiBold (600) | 22–24px |
| Body | Poppins / Inter | Regular (400) | 16px |
| Small/Caption | Poppins / Inter | Regular (400) | 14px |
| Button | Poppins / Inter | Medium (500) | 14–16px |

### 9.4 Komponen UI yang Diperlukan

| Komponen | Penggunaan |
|----------|------------|
| Navbar | Navigasi utama + mobile drawer |
| Footer | Info kontak & sosmed |
| Hero Banner | Section utama beranda |
| Card | Artikel, kegiatan, program, galeri |
| Button | Primary, secondary, outline, ghost |
| Modal | Konfirmasi delete, preview |
| Drawer | Mobile navigation |
| Breadcrumb | Navigasi halaman detail |
| Pagination | List artikel, kegiatan |
| Table | Admin data tables |
| Badge | Status, kategori |
| Alert | Peringatan & info |
| Toast | Notifikasi aksi |
| Skeleton Loading | Loading state |
| Empty State | Data kosong |
| Loading Spinner | Loading global |

### 9.5 Wireframe Konseptual — Beranda

```
┌─────────────────────────────────────────────┐
│  [Logo RMI]    Nav Links...    [☰ Mobile]  │
├─────────────────────────────────────────────┤
│                                             │
│           HERO BANNER                       │
│     "Tagline RMI"                           │
│   [Lihat Kegiatan]  [Gabung Bersama Kami]   │
│                                             │
├─────────────────────────────────────────────┤
│  TENTANG RMI (profil singkat)               │
├─────────────────────────────────────────────┤
│  VISI & MISI                                │
├─────────────────────────────────────────────┤
│  PROGRAM UNGGULAN                           │
│  [Card] [Card] [Card]                       │
├─────────────────────────────────────────────┤
│  AGENDA TERDEKAT                            │
│  [Event 1] [Event 2] [Event 3]              │
├─────────────────────────────────────────────┤
│  BERITA TERBARU                             │
│  [Artikel 1] [Artikel 2] [Artikel 3]        │
├─────────────────────────────────────────────┤
│  DOKUMENTASI (galeri preview)               │
│  [img] [img] [img] [img]                    │
├─────────────────────────────────────────────┤
│  STATISTIK: 50+ | 12 | 100+ | 2015          │
├─────────────────────────────────────────────┤
│  TESTIMONI (carousel)                       │
├─────────────────────────────────────────────┤
│  FOOTER: Alamat | WA | Email | Sosmed | Map │
└─────────────────────────────────────────────┘
                                        [WA]
```

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Persyaratan Non-Fungsional](./05-non-functional-requirements.md) | [Selanjutnya: Arsitektur Teknis](./07-technical-architecture.md)
