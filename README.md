# Remaja Masjid Istiqomah (RMI)

Website resmi Remaja Masjid Istiqomah — frontend publik + CMS admin + API.

## Struktur Project

```
rmi/
├── frontend/     # Next.js 14 (App Router)
├── backend/      # Express.js + MongoDB + Cloudinary
├── docs/         # PRD, roadmap, API, deployment
└── render.yaml   # Blueprint opsional backend (Render)
```

## Production

| | URL |
|---|-----|
| Website | https://rmi-istiqomah.vercel.app |
| API | https://rmi-istiqomah-api.onrender.com/api |
| Admin | https://rmi-istiqomah.vercel.app/admin/login |
| Health | https://rmi-istiqomah-api.onrender.com/api/health |

Panduan lengkap: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## Development

### Backend

```bash
cd backend
cp .env.example .env   # isi MONGODB_URI, JWT, Cloudinary
npm install
npm run dev
```

Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

`NEXT_PUBLIC_API_URL` default: `http://localhost:5000/api`

## Dokumentasi

- [PRD](./PRD.md)
- [API (implementasi)](./docs/API.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Development Roadmap](./docs/DEVELOPMENT-ROADMAP.md)
- [Sprint Guide](./docs/roadmap/README.md)
