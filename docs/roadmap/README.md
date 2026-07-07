# Development Roadmap — Sprint Guide
# Website RMI

| | |
|---|---|
| **Pendekatan** | Visual First → Backend → Integrasi → CMS → Launch |
| **Total Sprint** | 43 sprint kecil |
| **Estimasi** | ~108–172 jam total |
| **PRD** | [../PRD.md](../PRD.md) |

---

## Filosofi: Visual First

Urutan ini sengaja **membalik** pola backend-dulu agar beban terasa ringan:

```
1. Setup frontend + komponen UI     (Sprint 01–07)
2. Tampilkan SEMUA halaman visual   (Sprint 08–19)  ← pakai mock data
3. Baru bangun backend API          (Sprint 20–28)
4. Sambungkan frontend ke API        (Sprint 29–33)
5. CMS admin panel                   (Sprint 34–40)
6. SEO & deploy                      (Sprint 41–43)
```

**Keuntungan:**
- Hasil visual bisa dilihat & direview sejak minggu pertama
- Tiap sprint 1–4 jam — bisa selesai dalam 1 sesi kerja
- Mock data = tidak blocking di backend
- Stakeholder bisa kasih feedback UI lebih awal

---

## Peta Sprint

### Grup A: Frontend Setup

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [01](./sprint-01-inisialisasi-next-js.md) | Inisialisasi Next.js | 2–3 jam |
| [02](./sprint-02-design-tokens-font.md) | Design Tokens & Font | 2 jam |
| [03](./sprint-03-ui-button-card-badge.md) | UI — Button, Card, Badge | 2–3 jam |
| [04](./sprint-04-ui-input-form-primitives.md) | UI — Input & Form Primitives | 2 jam |
| [05](./sprint-05-ui-modal-drawer-toast.md) | UI — Modal, Drawer, Toast | 2–3 jam |
| [06](./sprint-06-ui-loading-empty-states.md) | UI — Loading & Empty States | 1–2 jam |
| [07](./sprint-07-framer-motion-mock-data-setup.md) | Framer Motion & Mock Data Setup | 2 jam |

### Grup B: Visual First (Mock Data)

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [08](./sprint-08-layout-navbar-footer.md) | Layout — Navbar & Footer | 3–4 jam |
| [09](./sprint-09-beranda-hero-tentang.md) | Beranda — Hero & Tentang | 2–3 jam |
| [10](./sprint-10-beranda-visi-misi-program.md) | Beranda — Visi Misi & Program | 2–3 jam |
| [11](./sprint-11-beranda-agenda-berita.md) | Beranda — Agenda & Berita | 2–3 jam |
| [12](./sprint-12-beranda-galeri-statistik-testimoni.md) | Beranda — Galeri, Statistik, Testimoni | 2–3 jam |
| [13](./sprint-13-halaman-tentang-kami.md) | Halaman Tentang Kami | 2 jam |
| [14](./sprint-14-halaman-program.md) | Halaman Program | 2–3 jam |
| [15](./sprint-15-halaman-artikel-list-detail.md) | Halaman Artikel — List & Detail | 3 jam |
| [16](./sprint-16-halaman-kegiatan-agenda.md) | Halaman Kegiatan & Agenda | 3 jam |
| [17](./sprint-17-halaman-galeri.md) | Halaman Galeri | 2–3 jam |
| [18](./sprint-18-halaman-kontak-dokumen-404.md) | Halaman Kontak, Dokumen & 404 | 2–3 jam |
| [19](./sprint-19-review-visual-responsive-pass.md) | Review Visual & Responsive Pass | 2–3 jam |

### Grup C: Backend API

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [20](./sprint-20-express-init-mongodb.md) | Express Init & MongoDB | 2–3 jam |
| [21](./sprint-21-models-user-kategori-settings.md) | Models — User, Kategori, Settings | 2 jam |
| [22](./sprint-22-auth-api-login-jwt.md) | Auth API — Login & JWT | 2–3 jam |
| [23](./sprint-23-api-artikel-kategori.md) | API — Artikel & Kategori | 2–3 jam |
| [24](./sprint-24-api-kegiatan-agenda.md) | API — Kegiatan & Agenda | 2–3 jam |
| [25](./sprint-25-api-galeri-banner.md) | API — Galeri & Banner | 2 jam |
| [26](./sprint-26-api-pengurus-program-testimoni.md) | API — Pengurus, Program, Testimoni | 2 jam |
| [27](./sprint-27-api-dokumen-contact-search.md) | API — Dokumen, Contact, Search | 2 jam |
| [28](./sprint-28-upload-cloudinary-seed-data.md) | Upload Cloudinary & Seed Data | 2–3 jam |

### Grup D: Integrasi API

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [29](./sprint-29-api-client-tanstack-query.md) | API Client & TanStack Query | 2 jam |
| [30](./sprint-30-integrasi-artikel-program.md) | Integrasi — Artikel & Program | 2 jam |
| [31](./sprint-31-integrasi-kegiatan-agenda-galeri.md) | Integrasi — Kegiatan, Agenda & Galeri | 2 jam |
| [32](./sprint-32-integrasi-homepage-settings.md) | Integrasi — Homepage & Settings | 2 jam |
| [33](./sprint-33-integrasi-kontak-form-dokumen.md) | Integrasi — Kontak Form & Dokumen | 1–2 jam |

### Grup E: CMS Admin Panel

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [34](./sprint-34-admin-login-layout.md) | Admin — Login & Layout | 2–3 jam |
| [35](./sprint-35-cms-dashboard-artikel.md) | CMS — Dashboard & Artikel | 3–4 jam |
| [36](./sprint-36-cms-kegiatan-agenda.md) | CMS — Kegiatan & Agenda | 2–3 jam |
| [37](./sprint-37-cms-galeri-banner.md) | CMS — Galeri & Banner | 2–3 jam |
| [38](./sprint-38-cms-pengurus-program-dokumen.md) | CMS — Pengurus, Program, Dokumen | 2–3 jam |
| [39](./sprint-39-cms-testimoni-kategori-pengaturan.md) | CMS — Testimoni, Kategori, Pengaturan | 2 jam |
| [40](./sprint-40-cms-manajemen-pengguna.md) | CMS — Manajemen Pengguna | 1–2 jam |

### Grup F: SEO & Launch

| Sprint | Judul | Estimasi |
|--------|-------|----------|
| [41](./sprint-41-seo-meta-og-sitemap.md) | SEO — Meta, OG, Sitemap | 2 jam |
| [42](./sprint-42-performance-accessibility.md) | Performance & Accessibility | 2–3 jam |
| [43](./sprint-43-deploy-production.md) | Deploy Production | 2–3 jam |

---

## Alur Dependensi

```
01→02→03→04→05→06→07
              ↓
08→09→10→11→12 (beranda)
08→13,14,15,16,17,18 (halaman)
              ↓
            19 (review visual) ✅ WEBSITE TAMPIL LENGKAP
              ↓
20→21→22→23→24→25→26→27→28 (backend)
              ↓
29→30→31→32→33 (integrasi) ✅ DATA REAL
              ↓
34→35→36→37→38→39→40 (CMS)
              ↓
41→42→43 (launch) 🚀 LIVE
```

---

## Cara Pakai

1. Kerjakan sprint **berurutan** sesuai nomor
2. Centang task di file sprint saat selesai
3. Jangan lanjut ke sprint berikutnya jika "Selesai Jika" belum terpenuhi
4. Satu sprint = satu sesi fokus (1–4 jam)

**Mulai sekarang:** [Sprint 01 — Inisialisasi Next.js](./sprint-01-inisialisasi-next-js.md)

---

## Grup (Ringkasan)

| Grup | File | Sprint | Fokus |
|------|------|--------|-------|
| A | [Frontend Setup](./group-a-frontend-setup.md) | 01–07 | Tooling & komponen UI |
| B | [Visual First](./group-b-visual-first-mock-data.md) | 08–19 | Halaman + mock data |
| C | [Backend API](./group-c-backend-api.md) | 20–28 | Express + MongoDB |
| D | [Integrasi](./group-d-integrasi-api.md) | 29–33 | Sambung frontend ↔ API |
| E | [CMS Admin](./group-e-cms-admin-panel.md) | 34–40 | Panel pengurus |
| F | [Launch](./group-f-seo-launch.md) | 41–43 | SEO & deploy |

