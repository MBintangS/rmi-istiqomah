# Deployment — Website RMI

Panduan deploy production monorepo Remaja Masjid Istiqomah.

| Layer | Platform | Root directory |
|-------|----------|----------------|
| Frontend | [Vercel](https://vercel.com) | `frontend` |
| Backend | [Render](https://render.com) | `backend` |
| Database | MongoDB Atlas | DB `rmi-prod` |
| Media | Cloudinary | folder `rmi-prod` |

HTTPS disediakan otomatis oleh Vercel dan Render pada URL default. Domain custom bersifat opsional.

---

## Prasyarat

1. Repo GitHub sudah up to date (branch `main` / `master`).
2. MongoDB Atlas:
   - Database **`rmi-prod`** (data sudah di-copy dari `rmi-dev` jika diperlukan).
   - **Network Access** mengizinkan `0.0.0.0/0` (atau IP Render).
3. Akun Cloudinary (boleh cloud yang sama dengan development).
4. Akun [Render](https://dashboard.render.com) dan [Vercel](https://vercel.com) (login GitHub).

---

## 1. Deploy backend (Render)

### Opsi A — Dashboard (disarankan)

1. **New +** → **Web Service** → pilih repo `rmi`.
2. Settings:
   - **Name:** `rmi-api` (bebas)
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install --include=dev && npm run build`
   - **Start Command:** `npm start`
   - **Instance:** Free
3. **Environment** — tambahkan:

| Key | Nilai |
|-----|--------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://USER:PASS@HOST/rmi-prod?retryWrites=true&w=majority` |
| `JWT_SECRET` | string acak panjang (**beda** dari lokal) |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | URL frontend Vercel (isi setelah FE live), contoh `https://rmi.vercel.app` |
| `CLOUDINARY_CLOUD_NAME` | dari dashboard Cloudinary |
| `CLOUDINARY_API_KEY` | … |
| `CLOUDINARY_API_SECRET` | … |
| `CLOUDINARY_FOLDER` | `rmi-prod` |
| `SEED_FORCE` | `false` |

4. Deploy. Setelah live, catat URL misalnya `https://rmi-api.onrender.com`.
5. Verifikasi: `GET https://rmi-api.onrender.com/api/health`

### Opsi B — Blueprint

File [`render.yaml`](../render.yaml) di root repo mendefinisikan service yang sama. Secret bertanda `sync: false` wajib diisi di Dashboard setelah Blueprint dibuat.

### Catatan Free tier

Service dapat **sleep** setelah idle ~15 menit. Request pertama setelah sleep bisa lambat (cold start).

**Jangan** jalankan `SEED_FORCE=true` di production setelah data nyata ada.

---

## 2. Deploy frontend (Vercel)

1. [vercel.com/new](https://vercel.com/new) → import repo `rmi`.
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - Build/Output: biarkan default (`npm run build`)
3. **Environment Variables:**

| Key | Nilai |
|-----|--------|
| `NEXT_PUBLIC_API_URL` | `https://rmi-api.onrender.com/api` (sesuaikan URL Render) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` (atau domain custom) |

4. Deploy. Catat URL frontend.
5. Kembali ke Render → update `CORS_ORIGIN` ke URL Vercel (tanpa trailing slash) → **Manual Deploy** agar CORS aktif.

### Urutan saling ketergantungan

1. Deploy backend dulu (dapat URL API).
2. Deploy frontend dengan `NEXT_PUBLIC_API_URL`.
3. Set `CORS_ORIGIN` di backend = URL frontend, redeploy backend.

---

## 3. Domain custom (opsional)

### Vercel

Project → **Settings** → **Domains** → tambahkan domain → ikuti instruksi DNS (A/CNAME).

Update `NEXT_PUBLIC_SITE_URL` dan redeploy frontend. Update `CORS_ORIGIN` di Render ke domain baru.

### Render

Service → **Settings** → **Custom Domains** → ikuti DNS.

Update `NEXT_PUBLIC_API_URL` di Vercel jika API memakai domain custom.

---

## 4. Checklist UAT (pengurus RMI)

- [ ] Beranda & navigasi tampil benar
- [ ] Artikel, kegiatan, galeri, program terbuka
- [ ] Form kontak / WhatsApp (jika dipakai) berfungsi
- [ ] Login admin `/admin/login` berhasil
- [ ] CRUD singkat di CMS (artikel / banner) + upload gambar
- [ ] Logout & proteksi route admin
- [ ] Tampil wajar di mobile

Setelah UAT, catat sign-off (nama + tanggal) di bawah atau di issue GitHub.

**UAT sign-off:** _…_ — _tanggal_

---

## 5. Troubleshooting

| Gejala | Cek |
|--------|-----|
| Health 502 / crash | Log Render; `MONGODB_URI` ke `/rmi-prod`; Atlas Network Access |
| CORS error di browser | `CORS_ORIGIN` = origin FE exact (https, tanpa `/` di akhir) |
| FE tidak fetch API | `NEXT_PUBLIC_API_URL` harus di-set **sebelum** build Vercel; redeploy setelah ubah |
| Upload gagal | `CLOUDINARY_*` lengkap; folder `rmi-prod` |
| Cold start lambat | Normal di Free tier Render |

---

## 6. Environment ringkas

Lihat juga:

- `backend/.env.example`
- `frontend/.env.example`

Lokal development tetap memakai DB **`rmi-dev`** dan `CLOUDINARY_FOLDER=rmi`. Production memakai **`rmi-prod`** / `rmi-prod`.
