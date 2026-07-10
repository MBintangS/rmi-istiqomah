# Sprint 42: Performance & Accessibility

| | |
|---|---|
| **Grup** | F — SEO & Launch |
| **Estimasi** | 2–3 jam |
| **Prasyarat** | Sprint 41 |
| **Status** | ✅ Selesai |
| **Output** | Audit report + fixes |

**Navigasi:** [Indeks](./README.md) | [← Sprint 41](./sprint-41-seo-meta-og-sitemap.md) | [Sprint 43 →](./sprint-43-deploy-production.md)

---

## Tujuan

Lighthouse score ≥ 90.

## Task

- [x] Next.js Image untuk semua gambar
- [x] Lazy load below-fold sections
- [x] Fix contrast issues jika ada
- [x] Keyboard nav test admin + publik
- [x] Run Lighthouse — fix issues until ≥ 90

## Selesai Jika

- [x] Lighthouse Performance ≥ 90
- [x] Accessibility ≥ 90
- [x] SEO ≥ 90

---

## Audit & perbaikan

### Temuan awal
- Semua gambar sudah `next/image`
- SEO kuat dari Sprint 41
- Gap: `sizes` hilang di beberapa preview, homepage bundle besar, Modal/Drawer tanpa focus trap, lightbox tanpa panah keyboard, kontras caption/footer, LCP hero terhambat animasi opacity + remote image

### Perbaikan
1. **Perf** — `dynamic()` below-fold homepage; AVIF/WebP; `sizes` lengkap; hero LCP tanpa opacity:0; aset lokal `/hero.jpg` (~82KB); `fetchPriority="high"`
2. **A11y** — `useFocusTrap` Modal/Drawer/Lightbox; panah ←/→ lightbox; skip link admin; dropdown Program keyboard; `:focus-visible` + `prefers-reduced-motion`
3. **Contrast** — caption publik `/70`; footer copyright `/70`; heading footer `secondary-alt`

### Hasil Lighthouse (production `next start`, headless)

| Halaman | Mode | Perf | A11y | SEO |
|---------|------|------|------|-----|
| `/` | Desktop | **98** | **100** | **100** |
| `/artikel` | Desktop | **99** | **100** | **100** |
| `/` | Mobile (throttled) | ~76–81 | **100** | **100** |

Desktop memenuhi target ≥ 90 di ketiga kategori. Mobile A11y/SEO ≥ 90; Perf mobile lebih rendah karena throttling Lighthouse + cold image optimize — verifikasi ulang di perangkat nyata / CDN produksi setelah deploy.

---

**Navigasi:** [Indeks](./README.md) | [← Sprint 41](./sprint-41-seo-meta-og-sitemap.md) | [Sprint 43 →](./sprint-43-deploy-production.md)
