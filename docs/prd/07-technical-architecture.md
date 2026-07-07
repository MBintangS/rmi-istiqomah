# Arsitektur Teknis

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Desain & UX](./06-design-ux.md) | [Selanjutnya: User Stories](./08-user-stories.md)

---

## 10. Arsitektur Teknis

### 10.1 Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT                              │
│  ┌─────────────────────────────────────────────────┐    │
│  │           Next.js (App Router)                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │    │
│  │  │  Public   │  │  Admin   │  │  Shared UI   │  │    │
│  │  │  Pages    │  │  Panel   │  │  Components  │  │    │
│  │  └──────────┘  └──────────┘  └──────────────┘  │    │
│  │                                                  │    │
│  │  Tailwind CSS | TanStack Query | Framer Motion  │    │
│  │  React Hook Form | Zod | Axios | Lucide React   │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────▼──────────────────────────────────┐
│                      SERVER                              │
│  ┌─────────────────────────────────────────────────┐    │
│  │           Express.js (Node.js)                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │    │
│  │  │  Routes   │  │Middleware│  │ Controllers  │  │    │
│  │  └──────────┘  └──────────┘  └──────────────┘  │    │
│  │                                                  │    │
│  │  JWT Auth | Validation | Upload Handler          │    │
│  └─────────────────────────────────────────────────┘    │
└──────────┬──────────────────────┬───────────────────────┘
           │                      │
┌──────────▼──────────┐  ┌───────▼───────────────────────┐
│      MongoDB         │  │   Cloudinary / Supabase        │
│  (Database)          │  │   (Image & File Storage)       │
└─────────────────────┘  └────────────────────────────────┘
```

### 10.2 Tech Stack

#### Frontend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 14+ | Framework React, SSR/SSG, routing |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3+ | Utility-first styling |
| TanStack Query | 5+ | Server state management, caching |
| Axios | 1+ | HTTP client |
| React Hook Form | 7+ | Form handling |
| Zod | 3+ | Schema validation |
| Framer Motion | 11+ | Animasi |
| Lucide React | latest | Icon set |
| React Hot Toast | 2+ | Toast notifications |

#### Backend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 20 LTS | Runtime |
| Express.js | 4+ | Web framework |
| Mongoose | 8+ | MongoDB ODM |
| jsonwebtoken | 9+ | JWT authentication |
| bcryptjs | 2+ | Password hashing |
| multer | 1+ | File upload handling |
| helmet | 7+ | Security headers |
| cors | 2+ | CORS middleware |
| express-rate-limit | 7+ | Rate limiting |
| cloudinary | 2+ | Image storage |

#### Database & Storage

| Teknologi | Fungsi |
|-----------|--------|
| MongoDB | Database utama |
| MongoDB Atlas | Hosting database (free tier) |
| Cloudinary / Supabase Storage | Media storage (free tier) |

### 10.3 Struktur Folder (Rekomendasi)

```
rmi/
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── (public)/        # Public routes group
│   │   │   ├── admin/           # Admin routes
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── home/            # Homepage sections
│   │   │   └── admin/           # Admin components
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utils, API client
│   │   ├── types/               # TypeScript types
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   └── package.json
│
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── config/              # DB, cloudinary config
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/           # Auth, validation, upload
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Helpers
│   │   └── app.ts               # Express app entry
│   └── package.json
│
├── docs/                        # Dokumentasi
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── .env.example
├── README.md
├── PRD.md                       # Dokumen ini
└── project.md                   # Brief awal
```

### 10.4 Environment Variables

```env
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ORIGIN=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
```

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Desain & UX](./06-design-ux.md) | [Selanjutnya: User Stories](./08-user-stories.md)
