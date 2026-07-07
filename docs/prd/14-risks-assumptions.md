# Risiko & Asumsi

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Fase & Milestone](./13-timeline.md) | [Selanjutnya: Deliverables & Glosarium](./15-deliverables-glossary.md)

---

## 17. Risiko & Mitigasi

| # | Risiko | Probabilitas | Dampak | Mitigasi |
|---|--------|-------------|--------|----------|
| 1 | Keterlambatan pengumpulan konten dari pengurus | Tinggi | Tinggi | Siapkan placeholder content & seed data; buat panduan pengisian konten |
| 2 | Free tier storage/database terbatas | Sedang | Sedang | Optimasi ukuran gambar; monitoring usage; rencana upgrade |
| 3 | Admin tidak familiar dengan CMS | Sedang | Sedang | UI admin yang intuitif; buat video panduan singkat |
| 4 | Performa lambat karena gambar besar | Sedang | Tinggi | Auto-compress upload; WebP format; lazy loading |
| 5 | Security breach | Rendah | Tinggi | JWT, bcrypt, input sanitization, HTTPS, rate limiting |
| 6 | Scope creep (fitur bertambah) | Tinggi | Sedang | Patuhi PRD ini; fitur baru masuk backlog fase berikutnya |
| 7 | Kompatibilitas browser lama | Rendah | Rendah | Progressive enhancement; test di browser utama |
| 8 | Downtime hosting gratis | Sedang | Sedang | Pilih provider reliable; setup monitoring |

---

## 18. Asumsi & Ketergantungan

### 18.1 Asumsi

1. Konten awal (teks, foto) akan disediakan oleh pengurus RMI sebelum atau selama development
2. Domain dan hosting akan disediakan/dibiayai oleh RMI
3. Akun Cloudinary/Supabase (free tier) akan dibuat untuk storage
4. Akun MongoDB Atlas (free tier) akan dibuat untuk database
5. Google Maps API key tersedia untuk embed peta
6. Nomor WhatsApp resmi RMI tersedia untuk integrasi
7. Tim development terdiri dari 1–2 developer
8. Tidak ada requirement multi-bahasa di fase 1

### 18.2 Ketergantungan

| Ketergantungan | Dari Siapa | Dibutuhkan Kapan |
|----------------|-----------|------------------|
| Logo & brand assets RMI | Pengurus RMI | Fase 1 |
| Konten profil, visi, misi | Pengurus RMI | Fase 3 |
| Foto kegiatan untuk galeri | Pengurus RMI | Fase 3 |
| Artikel awal (min. 3) | Admin RMI | Fase 3 |
| Info kontak (alamat, WA, email) | Pengurus RMI | Fase 3 |
| Akun media sosial RMI | Pengurus RMI | Fase 3 |
| Domain name | Pengurus RMI | Fase 5 |
| Google Maps koordinat masjid | Pengurus RMI | Fase 3 |
| Akun Cloudinary/Supabase | Developer | Fase 1 |
| Akun MongoDB Atlas | Developer | Fase 1 |

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Fase & Milestone](./13-timeline.md) | [Selanjutnya: Deliverables & Glosarium](./15-deliverables-glossary.md)
