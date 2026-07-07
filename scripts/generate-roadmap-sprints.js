const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'roadmap');

const sprints = [
  // A — Frontend Setup
  {
    id: '01',
    group: 'A',
    groupName: 'Frontend Setup',
    title: 'Inisialisasi Next.js',
    hours: '2–3 jam',
    prereq: '—',
    goal: 'Project frontend jalan di localhost dengan TypeScript dan Tailwind.',
    output: '`npm run dev` → halaman kosong tampil tanpa error',
    tasks: [
      'Buat folder `frontend/` dan init Next.js 14 (App Router) + TypeScript',
      'Install & konfigurasi Tailwind CSS',
      'Setup struktur folder: `src/app`, `src/components`, `src/lib`, `src/types`',
      'Setup ESLint + Prettier',
      'Buat halaman placeholder `/` dengan teks "RMI"',
      'Commit: `chore: init next.js frontend`',
    ],
    done: ['`npm run dev` jalan di port 3000', 'Tidak ada error TypeScript/ESLint'],
  },
  {
    id: '02',
    group: 'A',
    title: 'Design Tokens & Font',
    hours: '2 jam',
    prereq: 'Sprint 01',
    goal: 'Warna, font, dan spacing RMI terdefinisi di Tailwind.',
    output: 'Theme RMI (hijau + emas + background warm) siap dipakai',
    tasks: [
      'Setup font Poppins via `next/font/google`',
      'Tambahkan warna PRD ke `tailwind.config.ts` (primary, secondary, background, surface)',
      'Buat `globals.css` dengan CSS variables',
      'Buat halaman `/design-system` sementara untuk preview warna & font',
      'Hapus atau keep design-system page sebagai referensi dev',
    ],
    done: ['Class `bg-primary`, `text-secondary` dll. berfungsi', 'Font Poppins tampil di seluruh app'],
  },
  {
    id: '03',
    group: 'A',
    title: 'UI — Button, Card, Badge',
    hours: '2–3 jam',
    prereq: 'Sprint 02',
    goal: '3 komponen dasar paling sering dipakai.',
    output: '`components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`',
    tasks: [
      'Button: variant primary, secondary, outline, ghost + size sm/md/lg',
      'Card: dengan optional image, title, description, footer slot',
      'Badge: variant default, success, warning + kategori tag',
      'Preview ketiga komponen di `/design-system`',
    ],
    done: ['Komponen reusable dengan props TypeScript', 'Styling konsisten tema RMI'],
  },
  {
    id: '04',
    group: 'A',
    title: 'UI — Input & Form Primitives',
    hours: '2 jam',
    prereq: 'Sprint 03',
    goal: 'Komponen form siap untuk halaman kontak & admin nanti.',
    output: 'Input, Textarea, Select, Label',
    tasks: [
      'Buat `Input.tsx` dengan error state',
      'Buat `Textarea.tsx`',
      'Buat `Select.tsx` (native atau headless sederhana)',
      'Buat `Label.tsx`',
      'Preview form sederhana di design-system',
    ],
    done: ['Focus ring & error styling konsisten', 'Accessible label association'],
  },
  {
    id: '05',
    group: 'A',
    title: 'UI — Modal, Drawer, Toast',
    hours: '2–3 jam',
    prereq: 'Sprint 03',
    goal: 'Overlay & feedback untuk navigasi mobile dan notifikasi.',
    output: 'Modal, Drawer (mobile nav), Toaster setup',
    tasks: [
      'Install `react-hot-toast` + setup `<Toaster />` di root layout',
      'Buat `Modal.tsx` dengan backdrop + close button',
      'Buat `Drawer.tsx` untuk mobile menu (slide from right)',
      'Test buka/tutup di design-system',
    ],
    done: ['Toast `toast.success()` berfungsi', 'Drawer & Modal accessible (ESC close)'],
  },
  {
    id: '06',
    group: 'A',
    title: 'UI — Loading & Empty States',
    hours: '1–2 jam',
    prereq: 'Sprint 03',
    goal: 'State visual saat data belum ada atau sedang load.',
    output: 'Skeleton, Spinner, EmptyState',
    tasks: [
      'Buat `Skeleton.tsx` (bar, card, text variants)',
      'Buat `Spinner.tsx`',
      'Buat `EmptyState.tsx` dengan icon + pesan + optional CTA',
    ],
    done: ['Bisa dipakai di halaman list nanti', 'Animasi skeleton pulse halus'],
  },
  {
    id: '07',
    group: 'A',
    title: 'Framer Motion & Mock Data Setup',
    hours: '2 jam',
    prereq: 'Sprint 02',
    goal: 'Animasi ringan + folder mock data untuk fase visual.',
    output: '`lib/motion.ts` + `data/mock/*.ts`',
    tasks: [
      'Install Framer Motion, buat preset `fadeIn`, `slideUp`',
      'Buat folder `src/data/mock/`',
      'Buat `mock-articles.ts`, `mock-events.ts`, `mock-programs.ts` (3–5 item each)',
      'Buat `mock-settings.ts` (tagline, visi, misi, kontak)',
      'Export types di `src/types/` yang match struktur PRD',
    ],
    done: ['Mock data bisa di-import di komponen', 'Types TypeScript untuk Artikel, Kegiatan, dll.'],
  },

  // B — Visual First (static + mock)
  {
    id: '08',
    group: 'B',
    groupName: 'Visual First (Mock Data)',
    title: 'Layout — Navbar & Footer',
    hours: '3–4 jam',
    prereq: 'Sprint 05, 07',
    goal: 'Kerangka navigasi website tampil lengkap dan responsif.',
    output: 'Navbar desktop + mobile drawer, Footer lengkap',
    tasks: [
      'Buat `Navbar.tsx`: logo, menu links, hamburger mobile',
      'Integrasi `Drawer` untuk menu mobile',
      'Buat `Footer.tsx`: alamat, WA, email, sosmed (dari mock-settings)',
      'Buat `WhatsAppButton.tsx` floating fixed bottom-right',
      'Buat `app/(public)/layout.tsx` dengan Navbar + Footer',
    ],
    done: ['Navigasi 7 menu sesuai PRD', 'Responsif mobile & desktop', 'WA button tampil di semua halaman'],
  },
  {
    id: '09',
    group: 'B',
    title: 'Beranda — Hero & Tentang',
    hours: '2–3 jam',
    prereq: 'Sprint 08',
    goal: 'Dua section pertama beranda tampil visual.',
    output: 'HeroSection + AboutSection',
    tasks: [
      'Buat `HeroSection.tsx`: banner, tagline, 2 CTA button',
      'Gunakan gambar placeholder (unsplash atau local)',
      'Buat `AboutSection.tsx`: profil singkat RMI + link ke tentang-kami',
      'Animasi fadeIn saat scroll (Framer Motion)',
      'Susun di `app/(public)/page.tsx`',
    ],
    done: ['Hero full-width responsif', 'CTA "Lihat Kegiatan" & "Gabung Bersama Kami" ada'],
  },
  {
    id: '10',
    group: 'B',
    title: 'Beranda — Visi Misi & Program',
    hours: '2–3 jam',
    prereq: 'Sprint 09',
    goal: 'Section visi-misi dan 3 program unggulan.',
    output: 'VisionMissionSection + ProgramsSection',
    tasks: [
      'Buat `VisionMissionSection.tsx` dari mock-settings',
      'Buat `ProgramCard.tsx` reusable',
      'Buat `ProgramsSection.tsx` — 3 card: Isra Miraj, Maulid Nabi, Sanlat',
      'Link ke `/program/[slug]` (belum perlu halaman detail)',
    ],
    done: ['3 program card tampil grid responsif', 'Visi & misi terbaca jelas'],
  },
  {
    id: '11',
    group: 'B',
    title: 'Beranda — Agenda & Berita',
    hours: '2–3 jam',
    prereq: 'Sprint 10',
    goal: 'Section agenda terdekat dan artikel terbaru dari mock.',
    output: 'UpcomingEventsSection + LatestArticlesSection',
    tasks: [
      'Buat `EventCard.tsx`',
      'Buat `UpcomingEventsSection.tsx` — max 5 dari mock-events',
      'Buat `ArticleCard.tsx`',
      'Buat `LatestArticlesSection.tsx` — max 6 dari mock-articles',
    ],
    done: ['Tanggal agenda terformat (locale id-ID)', 'Card artikel punya thumbnail placeholder'],
  },
  {
    id: '12',
    group: 'B',
    title: 'Beranda — Galeri, Statistik, Testimoni',
    hours: '2–3 jam',
    prereq: 'Sprint 11',
    goal: 'Section bawah beranda lengkap — homepage selesai visual.',
    output: 'GalleryPreview + StatsSection + TestimonialsSection',
    tasks: [
      'Buat `GalleryPreviewSection.tsx` — 6–8 thumbnail grid',
      'Buat `StatsSection.tsx` — 4 angka (kegiatan, pengurus, anggota, tahun)',
      'Buat `TestimonialsSection.tsx` — carousel sederhana (mock 3 item)',
      'Homepage lengkap di `page.tsx`',
    ],
    done: ['Homepage 12 section lengkap (visual)', 'Scroll smooth antar section'],
  },
  {
    id: '13',
    group: 'B',
    title: 'Halaman Tentang Kami',
    hours: '2 jam',
    prereq: 'Sprint 08',
    goal: 'Halaman profil organisasi + daftar pengurus.',
    output: '`/tentang-kami`',
    tasks: [
      'Buat mock `mock-pengurus.ts` (6–8 orang)',
      'Buat `PengurusCard.tsx`',
      'Halaman: profil lengkap, visi misi detail, sejarah singkat',
      'Grid pengurus dengan foto placeholder',
    ],
    done: ['Halaman responsif', 'Breadcrumb: Beranda > Tentang Kami'],
  },
  {
    id: '14',
    group: 'B',
    title: 'Halaman Program',
    hours: '2–3 jam',
    prereq: 'Sprint 10',
    goal: 'Index program + halaman detail per program.',
    output: '`/program` + `/program/[slug]`',
    tasks: [
      'Halaman index: grid semua program dari mock',
      'Halaman detail: deskripsi, jadwal, galeri terkait (placeholder)',
      'CTA "Info lebih lanjut" ke kontak',
      'Static params atau dynamic route untuk 3 slug',
    ],
    done: ['3 program bisa dibuka detailnya', '404 jika slug tidak ada'],
  },
  {
    id: '15',
    group: 'B',
    title: 'Halaman Artikel — List & Detail',
    hours: '3 jam',
    prereq: 'Sprint 08, 07',
    goal: 'Blog/dakwah tampil dengan filter & detail (mock).',
    output: '`/artikel` + `/artikel/[slug]`',
    tasks: [
      'List: grid ArticleCard + pagination UI (static)',
      'Filter kategori (client-side filter mock data)',
      'Search input (filter judul client-side)',
      'Detail: konten HTML mock, share buttons (WA, FB — link only)',
      'Breadcrumb + artikel terkait (2–3 card)',
    ],
    done: ['Filter & search bekerja di mock', 'Share button generate URL benar'],
  },
  {
    id: '16',
    group: 'B',
    title: 'Halaman Kegiatan & Agenda',
    hours: '3 jam',
    prereq: 'Sprint 08, 07',
    goal: 'Daftar kegiatan + detail + halaman agenda.',
    output: '`/kegiatan`, `/kegiatan/[slug]`, `/agenda`',
    tasks: [
      'List kegiatan: EventCard grid + filter kategori + search',
      'Badge status: upcoming / ongoing / completed',
      'Detail: tanggal, lokasi, deskripsi, maps placeholder',
      'Halaman agenda: fokus kegiatan upcoming saja',
    ],
    done: ['Filter client-side jalan', 'Detail kegiatan informatif'],
  },
  {
    id: '17',
    group: 'B',
    title: 'Halaman Galeri',
    hours: '2–3 jam',
    prereq: 'Sprint 08',
    goal: 'Grid foto responsif dengan lightbox.',
    output: '`/galeri`',
    tasks: [
      'Buat mock `mock-galeri.ts` (12–20 foto placeholder)',
      'Grid masonry atau uniform grid responsif',
      'Lightbox sederhana (modal fullscreen) saat klik foto',
      'Filter by kategori/kegiatan (client-side)',
      'Lazy load images (`loading="lazy"`)',
    ],
    done: ['Lightbox buka/tutup', 'Grid 2 kolom mobile, 4 desktop'],
  },
  {
    id: '18',
    group: 'B',
    title: 'Halaman Kontak, Dokumen & 404',
    hours: '2–3 jam',
    prereq: 'Sprint 04, 08',
    goal: 'Halaman pendukung terakhir — frontend visual 100% selesai.',
    output: '`/kontak`, `/dokumen`, `not-found.tsx`',
    tasks: [
      'Kontak: form UI (belum submit), validasi Zod client-side only',
      'Embed Google Maps iframe (koordinat placeholder)',
      'Dokumen: list file mock + tombol download (href `#`)',
      'Halaman 404 custom dengan branding RMI',
      'Optional: `/donasi` halaman info rekening statis',
    ],
    done: ['Semua route publik PRD bisa dikunjungi', 'Form kontak validasi tampil error'],
  },
  {
    id: '19',
    group: 'B',
    title: 'Review Visual & Responsive Pass',
    hours: '2–3 jam',
    prereq: 'Sprint 12–18',
    goal: 'Pastikan seluruh tampilan rapi sebelum sentuh backend.',
    output: 'Screenshot-ready website dengan mock data',
    tasks: [
      'Test semua halaman di 320px, 768px, 1280px',
      'Fix spacing, overflow, font size di mobile',
      'Pastikan semua gambar punya alt text',
      'Tambah `Pagination.tsx` & `Breadcrumb.tsx` shared jika belum',
      'Demo ke stakeholder untuk feedback visual',
    ],
    done: ['Tidak ada horizontal scroll di mobile', 'Stakeholder approve tampilan awal'],
  },

  // C — Backend
  {
    id: '20',
    group: 'C',
    groupName: 'Backend API',
    title: 'Express Init & MongoDB',
    hours: '2–3 jam',
    prereq: 'Sprint 19 (visual selesai)',
    goal: 'Backend jalan terpisah, database terkoneksi.',
    output: '`backend/` + `GET /api/health`',
    tasks: [
      'Init Express + TypeScript di `backend/`',
      'Setup Mongoose + connect MongoDB Atlas',
      'Middleware: cors, helmet, express.json',
      'Error handler + standard response format',
      'Endpoint `GET /api/health` return `{ status: "ok" }`',
      'Buat `.env.example` backend',
    ],
    done: ['`npm run dev` backend di port 5000', 'Health check return 200'],
  },
  {
    id: '21',
    group: 'C',
    title: 'Models — User, Kategori, Settings',
    hours: '2 jam',
    prereq: 'Sprint 20',
    goal: 'Model dasar untuk auth dan konfigurasi situs.',
    output: '3 Mongoose schemas',
    tasks: [
      'Model `User` (bcrypt password pre-save)',
      'Model `Kategori` (type: artikel/kegiatan/galeri)',
      'Model `Settings` (singleton site config)',
      'Indexes pada email (unique), slug (unique)',
    ],
    done: ['Models ter-export', 'Types match PRD schema'],
  },
  {
    id: '22',
    group: 'C',
    title: 'Auth API — Login & JWT',
    hours: '2–3 jam',
    prereq: 'Sprint 21',
    goal: 'Admin bisa login via API.',
    output: '`POST /api/auth/login`, `GET /api/auth/me`',
    tasks: [
      'JWT middleware `authenticate`',
      'Role guard `requireAdmin`, `requireSuperAdmin`',
      'Login endpoint + bcrypt verify',
      'Me endpoint (current user)',
      'Rate limit pada login (5 req/15min)',
      'Seed 1 superadmin user',
    ],
    done: ['Login return token', 'Protected route reject tanpa token'],
  },
  {
    id: '23',
    group: 'C',
    title: 'API — Artikel & Kategori',
    hours: '2–3 jam',
    prereq: 'Sprint 22',
    goal: 'CRUD artikel lengkap — modul pertama.',
    output: '`/api/artikel`, `/api/kategori`',
    tasks: [
      'Model `Artikel` dengan slug auto-generate',
      'GET list (pagination, search, filter kategori, status)',
      'GET by slug (publik: published only)',
      'POST, PUT, DELETE (admin only)',
      'Zod validation schemas',
    ],
    done: ['CRUD tested via Thunder Client/Postman', 'Publik hanya lihat published'],
  },
  {
    id: '24',
    group: 'C',
    title: 'API — Kegiatan & Agenda',
    hours: '2–3 jam',
    prereq: 'Sprint 23',
    goal: 'CRUD kegiatan + agenda upcoming endpoint.',
    output: '`/api/kegiatan`, `/api/agenda`',
    tasks: [
      'Model `Kegiatan` + `Agenda`',
      'CRUD kegiatan (sama pattern artikel)',
      'CRUD agenda',
      '`GET /api/agenda/upcoming` — max 5, sort by date',
      'Index pada dateStart, date',
    ],
    done: ['Upcoming endpoint return data benar', 'Slug unik enforced'],
  },
  {
    id: '25',
    group: 'C',
    title: 'API — Galeri & Banner',
    hours: '2 jam',
    prereq: 'Sprint 24',
    goal: 'Media visual untuk homepage dan galeri.',
    output: '`/api/galeri`, `/api/banner`',
    tasks: [
      'Model `Galeri` (images array) + `Banner`',
      'CRUD kedua modul',
      'GET banner: hanya `isActive: true`, sort by order',
    ],
    done: ['Banner aktif filter works', 'Galeri support multiple images schema'],
  },
  {
    id: '26',
    group: 'C',
    title: 'API — Pengurus, Program, Testimoni',
    hours: '2 jam',
    prereq: 'Sprint 25',
    goal: 'Konten organisasi dan homepage sections.',
    output: '3 endpoint groups',
    tasks: [
      'Model + CRUD `Pengurus` (sort by order)',
      'Model + CRUD `Program`',
      'Model + CRUD `Testimoni`',
      'GET publik: hanya active items',
    ],
    done: ['Pengurus sorted by order field', 'Program by slug works'],
  },
  {
    id: '27',
    group: 'C',
    title: 'API — Dokumen, Contact, Search',
    hours: '2 jam',
    prereq: 'Sprint 26',
    goal: 'Fitur pendukung + pencarian global.',
    output: '`/api/dokumen`, `/api/contact`, `/api/search`',
    tasks: [
      'Model + CRUD `Dokumen`',
      'POST `/api/contact` — simpan ke DB atau kirim email (pilih salah satu)',
      'GET `/api/search?q=` — search artikel + kegiatan',
      'GET/PUT `/api/settings`',
    ],
    done: ['Contact form tersimpan', 'Search return combined results'],
  },
  {
    id: '28',
    group: 'C',
    title: 'Upload Cloudinary & Seed Data',
    hours: '2–3 jam',
    prereq: 'Sprint 27',
    goal: 'Upload gambar jalan + database terisi sample.',
    output: '`POST /api/upload` + seed script',
    tasks: [
      'Setup Cloudinary config',
      'Multer middleware + upload endpoint',
      'Seed script: settings, 5 artikel, 5 kegiatan, 3 program, pengurus, galeri',
      'Seed pakai gambar placeholder Cloudinary atau URL external',
      'Dokumentasi API awal di `docs/API.md`',
    ],
    done: ['Upload return URL', 'Seed jalan tanpa error', 'Frontend bisa pakai data seed nanti'],
  },

  // D — Integration
  {
    id: '29',
    group: 'D',
    groupName: 'Integrasi API',
    title: 'API Client & TanStack Query',
    hours: '2 jam',
    prereq: 'Sprint 28',
    goal: 'Infrastruktur fetch data di frontend.',
    output: '`lib/api.ts` + QueryProvider + hooks pattern',
    tasks: [
      'Install Axios + TanStack Query',
      'Buat axios instance dengan `NEXT_PUBLIC_API_URL`',
      'Setup `QueryClientProvider` di root layout',
      'Buat pattern hook: `useArticles()`, `useArticle(slug)`',
      'Env `NEXT_PUBLIC_API_URL` di `.env.example`',
    ],
    done: ['Fetch health endpoint dari frontend berhasil', 'Hook pattern documented'],
  },
  {
    id: '30',
    group: 'D',
    title: 'Integrasi — Artikel & Program',
    hours: '2 jam',
    prereq: 'Sprint 29',
    goal: 'Halaman artikel & program pakai data real.',
    output: 'Ganti mock → API di artikel & program',
    tasks: [
      'Hook `useArticles`, `useArticle(slug)`',
      'Update `/artikel` list + detail',
      'Hook `usePrograms`, `useProgram(slug)`',
      'Update `/program` pages',
      'Tambah loading skeleton + empty state',
    ],
    done: ['Data dari MongoDB tampil', 'Loading state tampil saat fetch'],
  },
  {
    id: '31',
    group: 'D',
    title: 'Integrasi — Kegiatan, Agenda & Galeri',
    hours: '2 jam',
    prereq: 'Sprint 30',
    goal: 'Event dan galeri terhubung API.',
    output: 'Kegiatan, agenda, galeri live',
    tasks: [
      'Hooks untuk kegiatan & agenda',
      'Update `/kegiatan`, `/agenda`',
      'Hook galeri + update `/galeri`',
      'Homepage sections: UpcomingEvents, GalleryPreview dari API',
    ],
    done: ['Agenda terdekat di beranda dari API', 'Galeri lightbox dengan URL real'],
  },
  {
    id: '32',
    group: 'D',
    title: 'Integrasi — Homepage & Settings',
    hours: '2 jam',
    prereq: 'Sprint 31',
    goal: 'Seluruh beranda dan tentang-kami dari API.',
    output: 'Homepage fully dynamic',
    tasks: [
      'Hook `useSettings()` — tagline, visi, misi, stats, kontak',
      'Update Hero, About, VisionMission, Stats dari settings',
      'Hook banner, testimoni, pengurus',
      'Update Footer, Tentang Kami dari API',
      'Hapus import mock data (keep file sebagai fallback dev)',
    ],
    done: ['Ubah seed settings → beranda berubah', 'Tidak ada hardcoded teks organisasi'],
  },
  {
    id: '33',
    group: 'D',
    title: 'Integrasi — Kontak Form & Dokumen',
    hours: '1–2 jam',
    prereq: 'Sprint 32',
    goal: 'Form kontak submit ke API + dokumen unduh.',
    output: 'Contact POST + dokumen list',
    tasks: [
      'React Hook Form + Zod untuk kontak',
      'Submit ke `POST /api/contact`',
      'Toast sukses/error',
      'Dokumen list dari API + download link',
    ],
    done: ['Form kontak submit berhasil', 'Dokumen download link benar'],
  },

  // E — CMS
  {
    id: '34',
    group: 'E',
    groupName: 'CMS Admin Panel',
    title: 'Admin — Login & Layout',
    hours: '2–3 jam',
    prereq: 'Sprint 22, 29',
    goal: 'Panel admin dengan auth guard.',
    output: '`/admin/login` + sidebar layout',
    tasks: [
      'Halaman login form',
      'Simpan JWT di httpOnly cookie atau localStorage',
      'Auth context `useAuth()`',
      'Admin layout: sidebar menu, header, logout',
      'Protected route: redirect ke login jika belum auth',
    ],
    done: ['Login redirect ke dashboard', 'Logout clear token'],
  },
  {
    id: '35',
    group: 'E',
    title: 'CMS — Dashboard & Artikel',
    hours: '3–4 jam',
    prereq: 'Sprint 34',
    goal: 'Dashboard statistik + kelola artikel pertama.',
    output: 'Dashboard + CRUD artikel admin',
    tasks: [
      'Dashboard: cards statistik dari `/api/dashboard/stats`',
      'Tabel artikel: list, search, pagination',
      'Form create/edit artikel + rich text editor (Tiptap atau similar)',
      'Upload thumbnail via `/api/upload`',
      'Delete dengan Modal konfirmasi',
      'Status draft/published toggle',
    ],
    done: ['Artikel baru muncul di website publik setelah publish', 'Dashboard angka akurat'],
  },
  {
    id: '36',
    group: 'E',
    title: 'CMS — Kegiatan & Agenda',
    hours: '2–3 jam',
    prereq: 'Sprint 35',
    goal: 'Kelola kegiatan dan agenda.',
    output: 'Admin CRUD kegiatan + agenda',
    tasks: [
      'Reuse DataTable pattern dari artikel',
      'Form kegiatan: tanggal, lokasi, status, thumbnail',
      'Form agenda: tanggal, waktu, link ke kegiatan optional',
      'Validasi tanggal (end >= start)',
    ],
    done: ['Kegiatan upcoming tampil di beranda setelah publish'],
  },
  {
    id: '37',
    group: 'E',
    title: 'CMS — Galeri & Banner',
    hours: '2–3 jam',
    prereq: 'Sprint 36',
    goal: 'Kelola media visual homepage.',
    output: 'Admin galeri + banner',
    tasks: [
      'Galeri: multi image upload',
      'Banner: upload, urutan drag atau number, aktif toggle',
      'Preview gambar di tabel admin',
    ],
    done: ['Banner aktif tampil di hero', 'Galeri multi upload works'],
  },
  {
    id: '38',
    group: 'E',
    title: 'CMS — Pengurus, Program, Dokumen',
    hours: '2–3 jam',
    prereq: 'Sprint 37',
    goal: 'Sisa modul konten admin.',
    output: '3 modul CRUD',
    tasks: [
      'CRUD pengurus dengan foto upload',
      'CRUD program dengan rich content',
      'CRUD dokumen dengan file upload',
    ],
    done: ['Pengurus tampil di tentang-kami', 'Dokumen bisa diunduh publik'],
  },
  {
    id: '39',
    group: 'E',
    title: 'CMS — Testimoni, Kategori, Pengaturan',
    hours: '2 jam',
    prereq: 'Sprint 38',
    goal: 'Modul pendukung + konfigurasi situs.',
    output: 'Testimoni, kategori, settings admin',
    tasks: [
      'CRUD testimoni',
      'CRUD kategori (per type)',
      'Halaman pengaturan: edit profil, visi, misi, kontak, sosmed, stats',
    ],
    done: ['Ubah settings → footer berubah', 'Kategori filter artikel works'],
  },
  {
    id: '40',
    group: 'E',
    title: 'CMS — Manajemen Pengguna',
    hours: '1–2 jam',
    prereq: 'Sprint 39',
    goal: 'Super Admin kelola akun admin.',
    output: '`/admin/pengguna` (Super Admin only)',
    tasks: [
      'Tabel users',
      'Form create user dengan role select',
      'Edit & deactivate user',
      'Sembunyikan menu dari role Admin biasa',
    ],
    done: ['Hanya superadmin akses halaman', 'Admin baru bisa login'],
  },

  // F — Launch
  {
    id: '41',
    group: 'F',
    groupName: 'SEO & Launch',
    title: 'SEO — Meta, OG, Sitemap',
    hours: '2 jam',
    prereq: 'Sprint 33',
    goal: 'Website siap diindeks Google.',
    output: 'Metadata dinamis per halaman',
    tasks: [
      'Next.js `generateMetadata` per halaman',
      'OG image default + per artikel',
      'Auto sitemap.xml + robots.txt',
      'JSON-LD Organization di homepage',
      'JSON-LD Article di detail artikel',
    ],
    done: ['View page source: meta tags ada', 'sitemap.xml accessible'],
  },
  {
    id: '42',
    group: 'F',
    title: 'Performance & Accessibility',
    hours: '2–3 jam',
    prereq: 'Sprint 41',
    goal: 'Lighthouse score ≥ 90.',
    output: 'Audit report + fixes',
    tasks: [
      'Next.js Image untuk semua gambar',
      'Lazy load below-fold sections',
      'Fix contrast issues jika ada',
      'Keyboard nav test admin + publik',
      'Run Lighthouse — fix issues until ≥ 90',
    ],
    done: ['Lighthouse Performance ≥ 90', 'Accessibility ≥ 90', 'SEO ≥ 90'],
  },
  {
    id: '43',
    group: 'F',
    title: 'Deploy Production',
    hours: '2–3 jam',
    prereq: 'Sprint 42',
    goal: 'Website live di internet.',
    output: 'Production URLs',
    tasks: [
      'Deploy frontend ke Vercel',
      'Deploy backend ke Railway/Render',
      'Set environment variables production',
      'Connect domain + HTTPS',
      'Tulis `docs/DEPLOYMENT.md`',
      'UAT final dengan pengurus RMI',
      'Update README.md',
    ],
    done: ['Website accessible via domain', 'Admin panel works di production', 'UAT signed off'],
  },
];

function nav(sprint, all) {
  const idx = all.findIndex((s) => s.id === sprint.id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  let n = '**Navigasi:** [Indeks](./README.md)';
  if (prev) n += ` | [← Sprint ${prev.id}](./sprint-${prev.id}-${slug(prev.title)}.md)`;
  if (next) n += ` | [Sprint ${next.id} →](./sprint-${next.id}-${slug(next.title)}.md)`;
  return n;
}

function slug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

fs.mkdirSync(dir, { recursive: true });

let currentGroup = '';
const groupReadmes = {};

for (const sprint of sprints) {
  if (sprint.groupName && sprint.group !== currentGroup) {
    currentGroup = sprint.group;
    groupReadmes[currentGroup] = {
      name: sprint.groupName,
      sprints: [],
    };
  }
  if (groupReadmes[sprint.group]) {
    groupReadmes[sprint.group].sprints.push(sprint);
  }

  const filename = `sprint-${sprint.id}-${slug(sprint.title)}.md`;
  const content = `# Sprint ${sprint.id}: ${sprint.title}

| | |
|---|---|
| **Grup** | ${sprint.group} — ${groupReadmes[sprint.group]?.name || sprint.groupName || ''} |
| **Estimasi** | ${sprint.hours} |
| **Prasyarat** | ${sprint.prereq} |
| **Output** | ${sprint.output} |

${nav(sprint, sprints)}

---

## Tujuan

${sprint.goal}

## Task

${sprint.tasks.map((t) => `- [ ] ${t}`).join('\n')}

## Selesai Jika

${sprint.done.map((d) => `- [ ] ${d}`).join('\n')}

---

${nav(sprint, sprints)}
`;

  fs.writeFileSync(path.join(dir, filename), content);
}

// Group README files
for (const [key, group] of Object.entries(groupReadmes)) {
  const groupFile = path.join(dir, `group-${key.toLowerCase()}-${slug(group.name)}.md`);
  let content = `# Grup ${key}: ${group.name}\n\n`;
  content += `> [Kembali ke Indeks](./README.md)\n\n`;
  content += '| Sprint | Judul | Estimasi | File |\n';
  content += '|--------|-------|----------|------|\n';
  for (const s of group.sprints) {
    const fn = `sprint-${s.id}-${slug(s.title)}.md`;
    content += `| ${s.id} | ${s.title} | ${s.hours} | [Buka](./${fn}) |\n`;
  }
  fs.writeFileSync(groupFile, content);
}

// Main README
const totalHours = sprints.length * 2.5; // rough
let readme = `# Development Roadmap — Sprint Guide
# Website RMI

| | |
|---|---|
| **Pendekatan** | Visual First → Backend → Integrasi → CMS → Launch |
| **Total Sprint** | ${sprints.length} sprint kecil |
| **Estimasi** | ~${Math.round(totalHours)}–${sprints.length * 4} jam total |
| **PRD** | [../PRD.md](../PRD.md) |

---

## Filosofi: Visual First

Urutan ini sengaja **membalik** pola backend-dulu agar beban terasa ringan:

\`\`\`
1. Setup frontend + komponen UI     (Sprint 01–07)
2. Tampilkan SEMUA halaman visual   (Sprint 08–19)  ← pakai mock data
3. Baru bangun backend API          (Sprint 20–28)
4. Sambungkan frontend ke API        (Sprint 29–33)
5. CMS admin panel                   (Sprint 34–40)
6. SEO & deploy                      (Sprint 41–43)
\`\`\`

**Keuntungan:**
- Hasil visual bisa dilihat & direview sejak minggu pertama
- Tiap sprint 1–4 jam — bisa selesai dalam 1 sesi kerja
- Mock data = tidak blocking di backend
- Stakeholder bisa kasih feedback UI lebih awal

---

## Peta Sprint

`;

for (const [key, group] of Object.entries(groupReadmes)) {
  readme += `### Grup ${key}: ${group.name}\n\n`;
  readme += '| Sprint | Judul | Estimasi |\n|--------|-------|----------|\n';
  for (const s of group.sprints) {
    const fn = `sprint-${s.id}-${slug(s.title)}.md`;
    readme += `| [${s.id}](./${fn}) | ${s.title} | ${s.hours} |\n`;
  }
  readme += '\n';
}

readme += `---

## Alur Dependensi

\`\`\`
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
\`\`\`

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

`;

fs.writeFileSync(path.join(dir, 'README.md'), readme);
console.log(`Generated ${sprints.length} sprints + ${Object.keys(groupReadmes).length} groups + README`);
