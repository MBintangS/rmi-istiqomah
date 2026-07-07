# Product Requirements Document (PRD)
# Website Remaja Masjid Istiqomah (RMI)

| Field | Detail |
|-------|--------|
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 7 Juli 2026 |
| **Status** | Draft — Siap untuk Development |
| **Sumber** | [project.md](./project.md) |
| **Pemilik Produk** | Pengurus Remaja Masjid Istiqomah |

---

> **PRD telah dipisah menjadi beberapa file** agar lebih mudah dibaca dan dirujuk.
>
> **Mulai di sini:** [docs/prd/README.md](./docs/prd/README.md)

---

## Daftar Isi

### Produk & Pengguna

| # | Dokumen | Isi |
|---|---------|-----|
| 1 | [Ringkasan, Latar Belakang & Visi](./docs/prd/01-product-overview.md) | Konteks, masalah, visi, tujuan bisnis |
| 2 | [Pengguna & Ruang Lingkup](./docs/prd/02-users-and-scope.md) | Persona, role, in/out scope |
| 3 | [Arsitektur Informasi](./docs/prd/03-information-architecture.md) | Peta situs publik & admin |

### Requirements

| # | Dokumen | Isi |
|---|---------|-----|
| 4 | [Persyaratan Fungsional](./docs/prd/04-functional-requirements.md) | Semua FR dengan ID & prioritas |
| 5 | [Persyaratan Non-Fungsional](./docs/prd/05-non-functional-requirements.md) | Performa, keamanan, kompatibilitas |
| 6 | [Desain & UX](./docs/prd/06-design-ux.md) | Warna, tipografi, komponen, wireframe |
| 7 | [User Stories](./docs/prd/08-user-stories.md) | User stories & acceptance criteria |

### Teknis

| # | Dokumen | Isi |
|---|---------|-----|
| 8 | [Arsitektur Teknis](./docs/prd/07-technical-architecture.md) | Stack, diagram, struktur folder |
| 9 | [Skema Data](./docs/prd/09-database-schema.md) | ERD & model MongoDB |
| 10 | [Spesifikasi API](./docs/prd/10-api-specification.md) | Endpoints REST & format response |
| 11 | [SEO & Aksesibilitas](./docs/prd/11-seo-accessibility.md) | Meta tags, structured data |

### Perencanaan

| # | Dokumen | Isi |
|---|---------|-----|
| — | **[Development Roadmap](./docs/DEVELOPMENT-ROADMAP.md)** | **43 sprint kecil: visual first → backend → CMS** |
| — | **[Sprint Guide](./docs/roadmap/README.md)** | **Detail per sprint (mulai coding di sini)** |
| 12 | [Metrik Keberhasilan](./docs/prd/12-success-metrics.md) | KPI teknis & bisnis, Definition of Done |
| 13 | [Fase & Milestone](./docs/prd/13-timeline.md) | Timeline 10 minggu per fase |
| 14 | [Risiko & Asumsi](./docs/prd/14-risks-assumptions.md) | Risiko, mitigasi, ketergantungan |
| 15 | [Deliverables & Glosarium](./docs/prd/15-deliverables-glossary.md) | Output proyek, istilah, lampiran |

---

## Struktur Folder

```
docs/prd/
├── README.md                        ← Indeks utama (mulai di sini)
├── 01-product-overview.md
├── 02-users-and-scope.md
├── 03-information-architecture.md
├── 04-functional-requirements.md
├── 05-non-functional-requirements.md
├── 06-design-ux.md
├── 07-technical-architecture.md
├── 08-user-stories.md
├── 09-database-schema.md
├── 10-api-specification.md
├── 11-seo-accessibility.md
├── 12-success-metrics.md
├── 13-timeline.md
├── 14-risks-assumptions.md
└── 15-deliverables-glossary.md
```

Setiap file memiliki navigasi **Sebelumnya / Selanjutnya** di bagian atas dan bawah.

---

*Dokumen ini merupakan living document. Perubahan signifikan harus disetujui oleh pemilik produk.*
