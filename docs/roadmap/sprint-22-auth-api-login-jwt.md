# Sprint 22: Auth API — Login & JWT

| | |
|---|---|
| **Grup** | C — Backend API |
| **Estimasi** | 2–3 jam |
| **Prasyarat** | Sprint 21 |
| **Output** | `POST /api/auth/login`, `GET /api/auth/me` |

**Navigasi:** [Indeks](./README.md) | [← Sprint 21](./sprint-21-models-user-kategori-settings.md) | [Sprint 23 →](./sprint-23-api-artikel-kategori.md)

---

## Tujuan

Admin bisa login via API.

## Task

- [ ] JWT middleware `authenticate`
- [ ] Role guard `requireAdmin`, `requireSuperAdmin`
- [ ] Login endpoint + bcrypt verify
- [ ] Me endpoint (current user)
- [ ] Rate limit pada login (5 req/15min)
- [ ] Seed 1 superadmin user

## Selesai Jika

- [ ] Login return token
- [ ] Protected route reject tanpa token

---

**Navigasi:** [Indeks](./README.md) | [← Sprint 21](./sprint-21-models-user-kategori-settings.md) | [Sprint 23 →](./sprint-23-api-artikel-kategori.md)
