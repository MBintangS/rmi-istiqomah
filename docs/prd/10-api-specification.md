# Spesifikasi API

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Skema Data](./09-database-schema.md) | [Selanjutnya: SEO & Aksesibilitas](./11-seo-accessibility.md)

---

## 13. Spesifikasi API

### 13.1 Base URL

```
Development: http://localhost:5000/api
Production:  https://api.rmi-domain.com/api
```

### 13.2 Format Response Standar

```typescript
// Success
{
  success: true,
  data: T,
  message?: string,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// Error
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

### 13.3 Endpoint Overview

#### Auth
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/auth/login` | ❌ | Login admin |
| POST | `/auth/logout` | ✅ | Logout |
| GET | `/auth/me` | ✅ | Get current user |
| POST | `/auth/refresh` | ✅ | Refresh token |

#### Artikel
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/artikel` | ❌ | List artikel (publik: published only) |
| GET | `/artikel/:slug` | ❌ | Detail artikel |
| POST | `/artikel` | ✅ Admin | Create artikel |
| PUT | `/artikel/:id` | ✅ Admin | Update artikel |
| DELETE | `/artikel/:id` | ✅ Admin | Delete artikel |

#### Kegiatan
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/kegiatan` | ❌ | List kegiatan |
| GET | `/kegiatan/:slug` | ❌ | Detail kegiatan |
| POST | `/kegiatan` | ✅ Admin | Create kegiatan |
| PUT | `/kegiatan/:id` | ✅ Admin | Update kegiatan |
| DELETE | `/kegiatan/:id` | ✅ Admin | Delete kegiatan |

#### Agenda
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/agenda` | ❌ | List agenda |
| GET | `/agenda/upcoming` | ❌ | Agenda terdekat |
| GET | `/agenda/:id` | ❌ | Detail agenda |
| POST | `/agenda` | ✅ Admin | Create agenda |
| PUT | `/agenda/:id` | ✅ Admin | Update agenda |
| DELETE | `/agenda/:id` | ✅ Admin | Delete agenda |

#### Galeri
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/galeri` | ❌ | List galeri |
| GET | `/galeri/:id` | ❌ | Detail galeri |
| POST | `/galeri` | ✅ Admin | Create galeri |
| PUT | `/galeri/:id` | ✅ Admin | Update galeri |
| DELETE | `/galeri/:id` | ✅ Admin | Delete galeri |

#### Banner
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/banner` | ❌ | List banner aktif |
| POST | `/banner` | ✅ Admin | Create banner |
| PUT | `/banner/:id` | ✅ Admin | Update banner |
| DELETE | `/banner/:id` | ✅ Admin | Delete banner |

#### Pengurus
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/pengurus` | ❌ | List pengurus aktif |
| POST | `/pengurus` | ✅ Admin | Create pengurus |
| PUT | `/pengurus/:id` | ✅ Admin | Update pengurus |
| DELETE | `/pengurus/:id` | ✅ Admin | Delete pengurus |

#### Program
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/program` | ❌ | List program |
| GET | `/program/:slug` | ❌ | Detail program |
| POST | `/program` | ✅ Admin | Create program |
| PUT | `/program/:id` | ✅ Admin | Update program |
| DELETE | `/program/:id` | ✅ Admin | Delete program |

#### Dokumen
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/dokumen` | ❌ | List dokumen |
| POST | `/dokumen` | ✅ Admin | Upload dokumen |
| DELETE | `/dokumen/:id` | ✅ Admin | Delete dokumen |

#### Pengguna (Super Admin only)
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/users` | ✅ SuperAdmin | List users |
| POST | `/users` | ✅ SuperAdmin | Create user |
| PUT | `/users/:id` | ✅ SuperAdmin | Update user |
| DELETE | `/users/:id` | ✅ SuperAdmin | Delete user |

#### Lainnya
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/settings` | ❌ | Get site settings |
| PUT | `/settings` | ✅ Admin | Update settings |
| GET | `/testimoni` | ❌ | List testimoni |
| POST | `/testimoni` | ✅ Admin | Create testimoni |
| PUT | `/testimoni/:id` | ✅ Admin | Update testimoni |
| DELETE | `/testimoni/:id` | ✅ Admin | Delete testimoni |
| GET | `/kategori` | ❌ | List kategori |
| POST | `/kategori` | ✅ Admin | Create kategori |
| POST | `/upload` | ✅ Admin | Upload image |
| POST | `/contact` | ❌ | Submit contact form |
| GET | `/search` | ❌ | Global search |
| GET | `/dashboard/stats` | ✅ Admin | Dashboard statistics |

### 13.4 Query Parameters Umum

| Parameter | Type | Deskripsi |
|-----------|------|-----------|
| `page` | number | Halaman (default: 1) |
| `limit` | number | Item per halaman (default: 10) |
| `search` | string | Kata kunci pencarian |
| `category` | string | Filter kategori (slug) |
| `status` | string | Filter status |
| `sort` | string | Field sorting (e.g. `-createdAt`) |

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Skema Data](./09-database-schema.md) | [Selanjutnya: SEO & Aksesibilitas](./11-seo-accessibility.md)
