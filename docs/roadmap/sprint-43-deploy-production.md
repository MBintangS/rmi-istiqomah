# Sprint 43: Deploy Production

| | |
|---|---|
| **Grup** | F — SEO & Launch |
| **Estimasi** | 2–3 jam |
| **Prasyarat** | Sprint 42 |
| **Status** | 🔄 In progress — FE/BE live; CORS + UAT pengurus |
| **Output** | Production URLs |

**Navigasi:** [Indeks](./README.md) | [← Sprint 42](./sprint-42-performance-accessibility.md)

---

## Tujuan

Website live di internet.

## Task

- [x] Deploy frontend ke Vercel — https://rmi-istiqomah.vercel.app
- [x] Deploy backend ke Railway/Render — https://rmi-istiqomah-api.onrender.com
- [x] Set environment variables production
- [x] Connect domain + HTTPS *(HTTPS default Vercel/Render; domain custom opsional)*
- [x] Tulis `docs/DEPLOYMENT.md`
- [ ] UAT final dengan pengurus RMI
- [x] Update README.md

### Persiapan di repo (selesai)

- [x] `render.yaml` (blueprint backend, rootDir `backend`)
- [x] Backend listen `0.0.0.0` (Render)
- [x] Build command terdokumentasi: `npm install --include=dev && npm run build`
- [x] `.env.example` frontend/backend + catatan production

## Selesai Jika

- [x] Website accessible via domain
- [ ] Admin panel works di production
- [ ] UAT signed off

---

**Navigasi:** [Indeks](./README.md) | [← Sprint 42](./sprint-42-performance-accessibility.md)
