# Sprint 43: Deploy Production

| | |
|---|---|
| **Grup** | F — SEO & Launch |
| **Estimasi** | 2–3 jam |
| **Prasyarat** | Sprint 42 |
| **Status** | 🔄 In progress — docs & config siap; tunggu deploy Render/Vercel + UAT |
| **Output** | Production URLs |

**Navigasi:** [Indeks](./README.md) | [← Sprint 42](./sprint-42-performance-accessibility.md)

---

## Tujuan

Website live di internet.

## Task

- [ ] Deploy frontend ke Vercel
- [ ] Deploy backend ke Railway/Render
- [ ] Set environment variables production
- [ ] Connect domain + HTTPS *(HTTPS default Vercel/Render; domain custom opsional)*
- [x] Tulis `docs/DEPLOYMENT.md`
- [ ] UAT final dengan pengurus RMI
- [x] Update README.md

### Persiapan di repo (selesai)

- [x] `render.yaml` (blueprint backend, rootDir `backend`)
- [x] Backend listen `0.0.0.0` (Render)
- [x] Build command terdokumentasi: `npm install --include=dev && npm run build`
- [x] `.env.example` frontend/backend + catatan production

## Selesai Jika

- [ ] Website accessible via domain
- [ ] Admin panel works di production
- [ ] UAT signed off

---

**Navigasi:** [Indeks](./README.md) | [← Sprint 42](./sprint-42-performance-accessibility.md)
