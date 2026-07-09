# Sprint 22: Auth API — Login & JWT

| | |
|---|---|
| **Grup** | C — Backend API |
| **Estimasi** | 2–3 jam |
| **Prasyarat** | Sprint 21 |
| **Output** | `POST /api/auth/login`, `GET /api/auth/me` |
| **Status** | ✅ Selesai |

**Navigasi:** [Indeks](./README.md) | [← Sprint 21](./sprint-21-models-user-kategori-settings.md) | [Sprint 23 →](./sprint-23-api-artikel-kategori.md)

---

## Tujuan

Admin bisa login via API.

## Task

- [x] JWT middleware `authenticate`
- [x] Role guard `requireAdmin`, `requireSuperAdmin`
- [x] Login endpoint + bcrypt verify
- [x] Me endpoint (current user)
- [x] Rate limit pada login (5 req/15min)
- [x] Seed 1 superadmin user

## Selesai Jika

- [x] Login return token
- [x] Protected route reject tanpa token

---

**Navigasi:** [Indeks](./README.md) | [← Sprint 21](./sprint-21-models-user-kategori-settings.md) | [Sprint 23 →](./sprint-23-api-artikel-kategori.md)
