# Dokumentasi API — RMI Backend

> Referensi implementasi aktual backend Express.  
> Spesifikasi desain lengkap: [`docs/prd/10-api-specification.md`](./prd/10-api-specification.md)

**Cakupan saat ini:** Sprint 20–26 (Health, Auth, Artikel, Kategori, Kegiatan, Agenda, Galeri, Banner, Pengurus, Program, Testimoni)

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000/api` |
| Production | `https://api.rmi-domain.com/api` *(belum deploy)* |

Jalankan backend:

```bash
cd backend
npm run dev
```

---

## Autentikasi

Endpoint admin membutuhkan header:

```
Authorization: Bearer <JWT_TOKEN>
```

Token didapat dari `POST /api/auth/login`. Role yang diizinkan untuk operasi admin: `admin`, `superadmin`.

### Optional Auth

Beberapa endpoint GET menerima token opsional. Jika token admin valid dikirim, response bisa menyertakan data non-publik (mis. artikel `draft`, kegiatan/agenda belum dipublish). Tanpa token, hanya data publik yang dikembalikan.

---

## Format Response

### Sukses

```json
{
  "success": true,
  "data": {},
  "message": "Pesan opsional",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

`pagination` hanya ada pada endpoint list yang mendukung paginasi.

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "details": {}
  }
}
```

### Kode Error Umum

| HTTP | Code | Keterangan |
|------|------|------------|
| 400 | `VALIDATION_ERROR` | Body/query tidak valid |
| 401 | `UNAUTHORIZED` | Token tidak ada / tidak valid |
| 401 | `INVALID_CREDENTIALS` | Email atau password salah |
| 403 | `FORBIDDEN` | Role tidak cukup |
| 403 | `ACCOUNT_INACTIVE` | Akun admin nonaktif |
| 404 | `NOT_FOUND` | Resource tidak ditemukan |
| 409 | `DUPLICATE_ERROR` | Data duplikat (mis. slug) |
| 429 | `TOO_MANY_REQUESTS` | Rate limit login (5× / 15 menit) |
| 500 | `INTERNAL_SERVER_ERROR` | Kesalahan server |

---

## Query Parameters Umum (List)

| Parameter | Type | Default | Keterangan |
|-----------|------|---------|------------|
| `page` | number | `1` | Halaman |
| `limit` | number | `10` | Item per halaman (max 100) |
| `search` | string | — | Pencarian teks |
| `category` | string | — | Filter slug kategori |
| `status` | string | — | Filter status (lihat tiap modul) |
| `sort` | string | — | Sort field; prefix `-` = descending (mis. `-createdAt`) |

---

## Health

### `GET /health`

Cek status server dan koneksi database.

**Auth:** Tidak

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

---

## Auth

### `POST /auth/login`

Login admin, mendapat JWT.

**Auth:** Tidak  
**Rate limit:** 5 request / 15 menit per IP

**Body:**

```json
{
  "email": "admin@rmi-masjid.org",
  "password": "AdminRMI123"
}
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6a4f70ecf9fb145d25794f52",
      "name": "Super Admin RMI",
      "email": "admin@rmi-masjid.org",
      "role": "superadmin"
    }
  }
}
```

### `GET /auth/me`

Profil user dari token.

**Auth:** Bearer token

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "6a4f70ecf9fb145d25794f52",
    "name": "Super Admin RMI",
    "email": "admin@rmi-masjid.org",
    "role": "superadmin"
  }
}
```

---

## Kategori

### `GET /kategori`

List kategori.

**Auth:** Tidak

**Query:**

| Parameter | Type | Keterangan |
|-----------|------|------------|
| `type` | `artikel` \| `kegiatan` \| `galeri` | Filter tipe kategori |

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "6a4f73465908fe972d6223c7",
      "name": "Kajian Islam",
      "slug": "kajian-islam",
      "type": "artikel",
      "createdAt": "2026-07-09T10:09:10.039Z"
    }
  ]
}
```

### `POST /kategori`

Buat kategori baru. Slug auto-generate dari `name` jika `slug` tidak dikirim.

**Auth:** Admin

**Body:**

```json
{
  "name": "Kajian Islam",
  "type": "artikel",
  "slug": "kajian-islam"
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `name` | ✅ | Nama kategori |
| `type` | ✅ | `artikel`, `kegiatan`, atau `galeri` |
| `slug` | — | Opsional; auto-generate jika kosong |

**Response `201`:** object kategori + `message`

---

## Artikel

### `GET /artikel`

List artikel dengan paginasi.

**Auth:** Optional (admin melihat semua status; publik hanya `published`)

**Query:**

| Parameter | Type | Keterangan |
|-----------|------|------------|
| `page`, `limit`, `search` | — | Lihat [Query Umum](#query-parameters-umum-list) |
| `category` | string | Slug kategori tipe `artikel` |
| `status` | `draft` \| `published` | Hanya efektif untuk admin |
| `sort` | string | `createdAt`, `updatedAt`, `publishedAt`, `title` (default: `-createdAt`) |

**Response `200`:** array artikel + `pagination`

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Tips Shalat Berjamaah",
      "slug": "tips-shalat-berjamaah",
      "excerpt": "Shalat berjamaah memiliki keutamaan besar.",
      "thumbnail": null,
      "status": "published",
      "category": { "id": "...", "name": "Kajian Islam", "slug": "kajian-islam" },
      "author": { "id": "...", "name": "Super Admin RMI" },
      "metaTitle": null,
      "metaDescription": null,
      "publishedAt": "2026-07-09T10:10:00.000Z",
      "createdAt": "2026-07-09T10:09:30.000Z",
      "updatedAt": "2026-07-09T10:09:30.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```

### `GET /artikel/:slug`

Detail artikel by slug.

**Auth:** Optional (publik: hanya `published`)

**Response `200`:** sama seperti item list, plus field `content`

### `POST /artikel`

**Auth:** Admin

**Body:**

```json
{
  "title": "Tips Shalat Berjamaah",
  "content": "<p>Shalat berjamaah memiliki keutamaan besar.</p>",
  "category": "6a4f73465908fe972d6223c7",
  "thumbnail": "",
  "status": "draft",
  "excerpt": "Opsional — auto dari content jika kosong",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `title` | ✅ | Judul |
| `content` | ✅ | HTML/Markdown |
| `category` | ✅ | ObjectId kategori tipe `artikel` |
| `status` | — | `draft` (default) atau `published` |
| `thumbnail` | — | URL gambar |
| `excerpt` | — | Auto-generate dari `content` |
| `metaTitle`, `metaDescription` | — | SEO |

Slug auto-generate dari `title`. `publishedAt` di-set otomatis saat `status` = `published`.

**Response `201`:** artikel lengkap + `message`

### `PUT /artikel/:id`

Update artikel (partial).

**Auth:** Admin

**Body:** field sama dengan POST (semua opsional)

**Response `200`:** artikel terbaru + `message`

### `DELETE /artikel/:id`

**Auth:** Admin

**Response `200`:**

```json
{
  "success": true,
  "data": { "id": "..." },
  "message": "Artikel berhasil dihapus"
}
```

---

## Kegiatan

### `GET /kegiatan`

List kegiatan dengan paginasi.

**Auth:** Optional (publik: hanya `isPublished: true`)

**Query:**

| Parameter | Type | Keterangan |
|-----------|------|------------|
| `page`, `limit`, `search` | — | Lihat [Query Umum](#query-parameters-umum-list) |
| `category` | string | Slug kategori tipe `kegiatan` |
| `status` | `upcoming` \| `ongoing` \| `completed` | Filter status kegiatan |
| `sort` | string | `createdAt`, `updatedAt`, `dateStart`, `title` (default: `-dateStart`) |

**Response `200`:** array kegiatan + `pagination`

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Kajian Ahad Pagi",
      "slug": "kajian-ahad-pagi",
      "description": "Kajian rutin setiap Ahad pagi.",
      "dateStart": "2026-07-15T08:00:00.000Z",
      "dateEnd": null,
      "time": null,
      "location": "Masjid Istiqomah",
      "locationMap": null,
      "thumbnail": null,
      "status": "upcoming",
      "isPublished": true,
      "category": { "id": "...", "name": "Kajian Rutin", "slug": "kajian-rutin" },
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```

### `GET /kegiatan/:slug`

Detail kegiatan by slug.

**Auth:** Optional (publik: hanya `isPublished: true`)

### `POST /kegiatan`

**Auth:** Admin

**Body:**

```json
{
  "title": "Kajian Ahad Pagi",
  "description": "Kajian rutin setiap Ahad pagi.",
  "dateStart": "2026-07-15T08:00:00.000Z",
  "dateEnd": "2026-07-15T10:00:00.000Z",
  "time": "08:00 WIB",
  "location": "Masjid Istiqomah",
  "locationMap": "https://maps.google.com/...",
  "category": "6a4f73465908fe972d6223c7",
  "thumbnail": "",
  "status": "upcoming",
  "isPublished": false
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `title` | ✅ | Judul kegiatan |
| `description` | ✅ | Deskripsi |
| `dateStart` | ✅ | ISO 8601 date |
| `category` | ✅ | ObjectId kategori tipe `kegiatan` |
| `dateEnd` | — | Tanggal selesai |
| `time`, `location`, `locationMap` | — | Info tambahan |
| `status` | — | `upcoming` (default), `ongoing`, `completed` |
| `isPublished` | — | `false` (default) |
| `thumbnail` | — | URL gambar |

Slug auto-generate dari `title`.

**Response `201`:** kegiatan + `message`

### `PUT /kegiatan/:id`

**Auth:** Admin — body partial

### `DELETE /kegiatan/:id`

**Auth:** Admin

---

## Agenda

### `GET /agenda/upcoming`

Agenda terdekat untuk beranda.

**Auth:** Tidak

**Aturan:**
- Hanya `isPublished: true`
- `date` ≥ hari ini (00:00 lokal server)
- Sort `date` ascending
- Maksimal **5** item

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Agenda Besok",
      "date": "2026-07-10T09:00:00.000Z",
      "time": null,
      "location": null,
      "description": null,
      "isPublished": true,
      "event": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

Field `event` terisi jika terhubung ke kegiatan:

```json
"event": { "id": "...", "title": "Kajian Ahad Pagi", "slug": "kajian-ahad-pagi" }
```

### `GET /agenda`

List agenda dengan paginasi.

**Auth:** Optional (publik: hanya `isPublished: true`)

**Query:**

| Parameter | Type | Keterangan |
|-----------|------|------------|
| `page`, `limit`, `search` | — | Lihat [Query Umum](#query-parameters-umum-list) |
| `sort` | string | `createdAt`, `updatedAt`, `date`, `title` (default: `date` ASC) |

### `GET /agenda/:id`

Detail agenda by MongoDB ObjectId.

**Auth:** Optional (publik: hanya `isPublished: true`)

### `POST /agenda`

**Auth:** Admin

**Body:**

```json
{
  "title": "Agenda Besok",
  "date": "2026-07-10T09:00:00.000Z",
  "time": "09:00 WIB",
  "location": "Masjid Istiqomah",
  "description": "Deskripsi singkat",
  "eventId": "6a4f73465908fe972d6223c8",
  "isPublished": true
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `title` | ✅ | Judul agenda |
| `date` | ✅ | ISO 8601 date |
| `time`, `location`, `description` | — | Opsional |
| `eventId` | — | ObjectId kegiatan terkait |
| `isPublished` | — | `false` (default) |

**Response `201`:** agenda + `message`

### `PUT /agenda/:id`

**Auth:** Admin — body partial

### `DELETE /agenda/:id`

**Auth:** Admin

---

## Galeri

### `GET /galeri`

List album galeri dengan paginasi.

**Auth:** Optional (publik: hanya `isPublished: true`)

**Query:**

| Parameter | Type | Keterangan |
|-----------|------|------------|
| `page`, `limit`, `search` | — | Lihat [Query Umum](#query-parameters-umum-list) |
| `category` | string | Slug kategori tipe `galeri` |
| `sort` | string | `createdAt`, `updatedAt`, `order`, `title` (default: `order` ASC) |

**Response `200`:** array galeri + `pagination`

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Kajian Ramadhan 2026",
      "images": [
        {
          "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          "publicId": null,
          "caption": "Sesi kajian"
        }
      ],
      "videoUrl": null,
      "category": { "id": "...", "name": "Dokumentasi", "slug": "dokumentasi" },
      "event": null,
      "order": 1,
      "isPublished": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
}
```

### `GET /galeri/:id`

Detail album galeri by MongoDB ObjectId.

**Auth:** Optional (publik: hanya `isPublished: true`)

### `POST /galeri`

**Auth:** Admin

**Body:**

```json
{
  "title": "Kajian Ramadhan 2026",
  "images": [
    {
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "publicId": "folder/image-id",
      "caption": "Sesi kajian"
    }
  ],
  "videoUrl": "https://www.youtube.com/embed/...",
  "category": "6a4f73465908fe972d6223c7",
  "eventId": "6a4f73465908fe972d6223c8",
  "order": 0,
  "isPublished": false
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `title` | ✅ | Judul album |
| `images` | ✅ | Array minimal 1 gambar |
| `images[].url` | ✅ | URL gambar |
| `images[].publicId` | — | Cloudinary public ID |
| `images[].caption` | — | Keterangan gambar |
| `category` | ✅ | ObjectId kategori tipe `galeri` |
| `eventId` | — | ObjectId kegiatan terkait |
| `videoUrl` | — | URL embed YouTube |
| `order` | — | Urutan tampil (default: `0`) |
| `isPublished` | — | `false` (default) |

**Response `201`:** galeri + `message`

### `PUT /galeri/:id`

**Auth:** Admin — body partial

### `DELETE /galeri/:id`

**Auth:** Admin

---

## Banner

### `GET /banner`

List banner untuk homepage/hero.

**Auth:** Tidak

**Aturan:**
- Hanya `isActive: true`
- Sort `order` ascending, lalu `createdAt` descending

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Banner Utama",
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "link": "/kegiatan",
      "order": 1,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

Banner dengan `isActive: false` **tidak** muncul di endpoint ini.

### `POST /banner`

**Auth:** Admin

**Body:**

```json
{
  "title": "Banner Utama",
  "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "link": "/kegiatan",
  "order": 1,
  "isActive": true
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `title` | ✅ | Judul banner |
| `image` | ✅ | URL gambar |
| `link` | — | URL tujuan klik |
| `order` | — | Urutan tampil (default: `0`) |
| `isActive` | — | `true` (default) |

**Response `201`:** banner + `message`

### `PUT /banner/:id`

**Auth:** Admin — body partial

### `DELETE /banner/:id`

**Auth:** Admin

---

## Pengurus

### `GET /pengurus`

List pengurus organisasi.

**Auth:** Optional (publik: hanya `isActive: true`)

**Aturan:** Sort `order` ascending, lalu `createdAt` descending

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Ahmad",
      "position": "Ketua",
      "photo": null,
      "period": "2024-2026",
      "order": 1,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### `POST /pengurus`

**Auth:** Admin

**Body:**

```json
{
  "name": "Ahmad",
  "position": "Ketua",
  "photo": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "period": "2024-2026",
  "order": 0,
  "isActive": true
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `name` | ✅ | Nama pengurus |
| `position` | ✅ | Jabatan |
| `photo` | — | URL foto |
| `period` | — | Periode menjabat |
| `order` | — | Urutan tampil (default: `0`) |
| `isActive` | — | `true` (default) |

### `PUT /pengurus/:id`

**Auth:** Admin — body partial

### `DELETE /pengurus/:id`

**Auth:** Admin

---

## Program

### `GET /program`

List program RMI.

**Auth:** Optional (publik: hanya `isActive: true`)

**Response `200`:** array program (tanpa field `content`)

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Tahfidz Quran",
      "slug": "tahfidz-quran",
      "description": "Program hafalan",
      "image": null,
      "icon": null,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### `GET /program/:slug`

Detail program by slug.

**Auth:** Optional (publik: hanya `isActive: true`)

**Response `200`:** object program + field `content`

### `POST /program`

**Auth:** Admin

**Body:**

```json
{
  "name": "Tahfidz Quran",
  "description": "Program hafalan Al-Quran",
  "content": "<p>Detail program...</p>",
  "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "icon": "book-open",
  "isActive": true
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `name` | ✅ | Nama program |
| `description`, `content`, `image`, `icon` | — | Opsional |
| `isActive` | — | `true` (default) |

Slug auto-generate dari `name`.

### `PUT /program/:id`

**Auth:** Admin — body partial

### `DELETE /program/:id`

**Auth:** Admin

---

## Testimoni

### `GET /testimoni`

List testimoni untuk homepage.

**Auth:** Optional (publik: hanya `isActive: true`)

**Aturan:** Sort `order` ascending, lalu `createdAt` descending

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Rina",
      "content": "RMI keren!",
      "role": "Anggota RMI",
      "photo": null,
      "order": 1,
      "isActive": true,
      "createdAt": "..."
    }
  ]
}
```

### `POST /testimoni`

**Auth:** Admin

**Body:**

```json
{
  "name": "Rina",
  "content": "RMI keren!",
  "role": "Anggota RMI",
  "photo": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "order": 0,
  "isActive": true
}
```

| Field | Required | Keterangan |
|-------|----------|------------|
| `name` | ✅ | Nama pemberi testimoni |
| `content` | ✅ | Isi testimoni |
| `role` | — | Peran/keterangan |
| `photo` | — | URL foto |
| `order` | — | Urutan tampil (default: `0`) |
| `isActive` | — | `true` (default) |

### `PUT /testimoni/:id`

**Auth:** Admin — body partial

### `DELETE /testimoni/:id`

**Auth:** Admin

---

## Seed & Testing

```bash
# Buat superadmin (sekali)
cd backend
npm run seed:admin
```

Contoh login + request admin (PowerShell):

```powershell
$login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method POST -Body '{"email":"admin@rmi-masjid.org","password":"AdminRMI123"}' `
  -ContentType "application/json"
$headers = @{ Authorization = "Bearer $($login.data.token)" }

Invoke-RestMethod -Uri "http://localhost:5000/api/artikel" -Headers $headers
```

---

## Changelog Dokumentasi

| Tanggal | Sprint | Perubahan |
|---------|--------|-----------|
| 2026-07-09 | 26 | Pengurus, Program (by slug), Testimoni CRUD |
| 2026-07-09 | 25 | Galeri CRUD (images array), Banner CRUD, GET banner aktif |
| 2026-07-09 | 20–24 | Dokumentasi awal: Health, Auth, Kategori, Artikel, Kegiatan, Agenda |

---

**Navigasi:** [Roadmap](./roadmap/README.md) | [PRD API Spec](./prd/10-api-specification.md) | [Database Schema](./prd/09-database-schema.md)
