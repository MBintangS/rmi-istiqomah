# Development Roadmap
# Website Remaja Masjid Istiqomah (RMI)

| Field | Detail |
|-------|--------|
| **Versi** | 2.0 — Sprint-based |
| **Tanggal** | 7 Juli 2026 |
| **Total Sprint** | 43 sprint (~2–4 jam/sprint) |

---

> **Roadmap telah dipecah menjadi 43 sprint kecil** dengan pendekatan **Visual First**.
>
> **Mulai di sini:** [docs/roadmap/README.md](./roadmap/README.md)

---

## Pendekatan Baru: Visual First

```
Frontend Setup → Tampil Visual (mock) → Backend API → Integrasi → CMS → Launch
   Sprint 01–07      Sprint 08–19        Sprint 20–28   29–33    34–40   41–43
```

Website **tampil lengkap dulu** dengan mock data (Sprint 19), baru backend dibangun (Sprint 20+).

---

## Grup Sprint

| Grup | Sprint | Fokus | Detail |
|------|--------|-------|--------|
| **A** | 01–07 | [Frontend Setup](./roadmap/group-a-frontend-setup.md) | Next.js, design tokens, komponen UI |
| **B** | 08–19 | [Visual First](./roadmap/group-b-visual-first-mock-data.md) | Semua halaman publik + mock data |
| **C** | 20–28 | [Backend API](./roadmap/group-c-backend-api.md) | Express, MongoDB, endpoints |
| **D** | 29–33 | [Integrasi](./roadmap/group-d-integrasi-api.md) | Sambung frontend ke API |
| **E** | 34–40 | [CMS Admin](./roadmap/group-e-cms-admin-panel.md) | Panel pengurus |
| **F** | 41–43 | [Launch](./roadmap/group-f-seo-launch.md) | SEO, performa, deploy |

---

## Milestone Penting

| Setelah Sprint | Apa yang Sudah Jadi |
|----------------|---------------------|
| **07** | Komponen UI + mock data siap |
| **19** | Website visual 100% — bisa demo ke stakeholder |
| **28** | Backend API + seed data siap |
| **33** | Website pakai data real dari database |
| **40** | CMS admin lengkap |
| **43** | Live production |

---

## Mulai Development

**[Sprint 01 — Inisialisasi Next.js](./roadmap/sprint-01-inisialisasi-next-js.md)** (2–3 jam)

---

## Referensi

- [Indeks Sprint Lengkap](./roadmap/README.md)
- [PRD](../PRD.md)
- [Arsitektur Teknis](./prd/07-technical-architecture.md)
- [Database Schema](./prd/09-database-schema.md)
- [API Specification](./prd/10-api-specification.md)

---

*Roadmap v1.0 (fase besar) diganti v2.0 (sprint kecil). File sprint ada di `docs/roadmap/`.*
