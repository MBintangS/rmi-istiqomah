# Website Development Prompt
# Remaja Masjid Istiqomah (RMI)

## Project Overview

Bangun sebuah website resmi **Remaja Masjid Istiqomah (RMI)** yang berfungsi sebagai pusat informasi, media dakwah, dokumentasi kegiatan, serta sarana komunikasi antara pengurus, anggota, dan masyarakat.

Website harus memiliki tampilan modern namun tetap mencerminkan nilai-nilai Islam: bersih, elegan, tenang, kreativ, dan profesional.

---

# Project Goals

Website bertujuan untuk:

- Menjadi media informasi resmi RMI.
- Mempublikasikan kegiatan remaja masjid.
- Menyebarkan konten dakwah yang bermanfaat.
- Mempermudah masyarakat mengetahui agenda masjid.
- Menjadi arsip digital kegiatan organisasi.
- Meningkatkan keterlibatan jamaah, khususnya generasi muda.

---

# Target Users

### Pengunjung

- Jamaah masjid
- Remaja
- Orang tua
- Masyarakat umum
- Calon anggota

### Administrator

- Superadmin
- Admin 

---

# Design Direction

Nuansa website:

- Modern
- Islami
- Minimalis
- Elegan
- Bersih
- Ramah pengguna
- Mobile First
- Responsif

Inspirasi desain:

- Banyak whitespace
- Icon sederhana
- Card modern
- Soft shadow
- Rounded corner
- Animasi ringan

---

# Color Palette

Primary
#4e830a

Secondary
#D4AF37

Background
#ebded3

Surface
#F8FAFC

Text
#1F2937

warna lain:
/* CSS HEX */
--#94a658: #94a658;
--#6b9129: #6b9129;
--#c0a34e: #c0a34e;
--#3c5e0a: #3c5e0a;
--#ebded3: #ebded3;
--#23300a: #23300a;
--#477909: #477909;
--#598712: #598712;

---

# Typography

Font:

- Poppins
atau
- Inter

Heading:

- Bold
- Mudah dibaca

Body:

- Ringan
- Nyaman dibaca

---

# Main Navigation

- Beranda
- Tentang Kami
- Program (Isra Miraj, Maulid Nabi, Sanlat)
- Galeri
- Artikel Islami
- Donasi (opsional)
- Kontak

---

# Homepage Sections

## Hero

Banner utama

- Tagline
- Tombol "Lihat Kegiatan"
- Tombol "Gabung Bersama Kami"

---

## Tentang RMI

Profil singkat organisasi

---

## Visi & Misi

Menampilkan visi dan misi organisasi.

---

## Program Unggulan

Contoh:

- Isra Miraj
- Maulid Nabi 
- Sanlat (Pesantren Kilat)

---

## Agenda Terdekat

Menampilkan kegiatan yang akan datang.

---

## Berita Terbaru

Artikel terbaru.

---

## Dokumentasi

Galeri foto dan video kegiatan.

---

## Statistik

Contoh:

- Total Kegiatan
- Total Pengurus
- Total Anggota
- Tahun Berdiri

---

## Testimoni

Testimoni jamaah atau anggota.

---

## Footer

Berisi:

- Alamat
- Nomor WhatsApp
- Email
- Media Sosial
- Google Maps

---

# Public Features

- Search artikel
- Search kegiatan
- Filter berita
- Filter agenda
- Detail kegiatan
- Detail artikel
- Download dokumen
- Share artikel
- Responsive Gallery
- Contact Form
- Google Maps
- WhatsApp Button

---

# Admin Features

Dashboard

CRUD:

- Artikel
- Kegiatan
- Agenda
- Galeri
- Banner
- Pengurus
- Program
- Pengguna
- Dokumen

Dashboard menampilkan statistik:

- Jumlah Artikel
- Jumlah Agenda
- Jumlah Pengunjung
- Jumlah Galeri

---

# Authentication

Role:

- Super Admin
- Admin

---

# Tech Stack

Frontend

Next.js
Tailwind
TanStack Query
Axios
React Hook Form
Framer Motion
Lucide React
React Hot Toast
Zod

Backend

- Node.js
- Express.js

Database

- MongoDB

Authentication

- JWT

Storage

- Cloudinary atau Supabase Storage (yang gratis saja)

---

# Performance Requirements

- Mobile First
- SEO Friendly
- Lazy Loading
- Image Optimization
- Responsive Image
- Lighthouse Score > 90
- Accessibility > 90

---

# UI Components

- Navbar
- Footer
- Hero Banner
- Card
- Button
- Modal
- Drawer
- Breadcrumb
- Pagination
- Table
- Badge
- Alert
- Toast
- Skeleton Loading
- Empty State
- Loading Spinner

---

# SEO

- Dynamic Meta Title
- Dynamic Description
- Open Graph
- Sitemap
- robots.txt
- Structured Data

---

# Coding Standards

Selalu:

- Gunakan React Functional Component.
- Gunakan TypeScript jika memungkinkan.
- Pisahkan komponen berdasarkan tanggung jawabnya.
- Hindari duplikasi kode (DRY).
- Buat komponen reusable.
- Gunakan custom hooks untuk logika yang berulang.
- Gunakan environment variables untuk konfigurasi.
- Tulis kode yang mudah dibaca, diuji, dan dikembangkan.
- Pastikan seluruh halaman responsif dan aksesibel.

---

# Expected Deliverables

- Source Code
- Dokumentasi API
- Database Schema
- Dokumentasi Deployment
- README.md
- Environment Example (.env.example)