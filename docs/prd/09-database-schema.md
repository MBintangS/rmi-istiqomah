# Skema Data

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: User Stories](./08-user-stories.md) | [Selanjutnya: Spesifikasi API](./10-api-specification.md)

---

## 12. Skema Data

### 12.1 Entity Relationship Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │     │ Artikel  │     │ Kegiatan │
│──────────│     │──────────│     │──────────│
│ _id      │     │ _id      │     │ _id      │
│ name     │     │ title    │     │ title    │
│ email    │     │ slug     │     │ slug     │
│ password │     │ content  │     │ desc     │
│ role     │     │ category │     │ dateStart│
│ createdAt│     │ thumbnail│     │ dateEnd  │
└──────────┘     │ status   │     │ location │
                 │ author   │──┐  │ category │
                 │ createdAt│  │  │ thumbnail│
                 └──────────┘  │  │ status   │
                               │  │ createdAt│
┌──────────┐     ┌──────────┐  │  └────┬─────┘
│  Banner  │     │  Agenda  │  │       │
│──────────│     │──────────│  │       │ 1:N
│ _id      │     │ _id      │  │  ┌────▼─────┐
│ title    │     │ title    │  │  │  Galeri  │
│ image    │     │ date     │  │  │──────────│
│ link     │     │ time     │  │  │ _id      │
│ order    │     │ location │  │  │ title    │
│ isActive │     │ desc     │  │  │ images[] │
└──────────┘     │ eventId  │──┘  │ category │
                 └──────────┘     │ eventId  │
                                   │ order    │
┌──────────┐     ┌──────────┐     └──────────┘
│ Pengurus │     │ Program  │
│──────────│     │──────────│     ┌──────────┐
│ _id      │     │ _id      │     │ Dokumen  │
│ name     │     │ name     │     │──────────│
│ position │     │ slug     │     │ _id      │
│ photo    │     │ desc     │     │ name     │
│ period   │     │ content  │     │ fileUrl  │
│ order    │     │ image    │     │ category │
└──────────┘     └──────────┘     │ fileSize │
                                  └──────────┘

┌──────────────┐     ┌──────────────┐
│  Kategori    │     │  Testimoni   │
│──────────────│     │──────────────│
│ _id          │     │ _id          │
│ name         │     │ name         │
│ slug         │     │ content      │
│ type         │     │ role         │
└──────────────┘     │ photo        │
                     │ order        │
                     └──────────────┘
```

### 12.2 Model Detail

#### User
```typescript
{
  _id: ObjectId,
  name: string,          // required
  email: string,         // required, unique
  password: string,      // required, hashed
  role: 'superadmin' | 'admin',  // required
  isActive: boolean,     // default: true
  createdAt: Date,
  updatedAt: Date
}
```

#### Artikel
```typescript
{
  _id: ObjectId,
  title: string,         // required
  slug: string,          // required, unique, auto-generated
  content: string,       // required, HTML/Markdown
  excerpt: string,       // auto-generated from content
  category: ObjectId,    // ref: Kategori
  thumbnail: string,     // URL cloudinary
  status: 'draft' | 'published',  // default: draft
  author: ObjectId,      // ref: User
  metaTitle: string,     // SEO
  metaDescription: string, // SEO
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Kegiatan
```typescript
{
  _id: ObjectId,
  title: string,         // required
  slug: string,          // required, unique
  description: string,   // required
  dateStart: Date,       // required
  dateEnd: Date,
  time: string,
  location: string,
  locationMap: string,   // Google Maps embed URL
  category: ObjectId,    // ref: Kategori
  thumbnail: string,
  status: 'upcoming' | 'ongoing' | 'completed',
  isPublished: boolean,  // default: false
  createdAt: Date,
  updatedAt: Date
}
```

#### Agenda
```typescript
{
  _id: ObjectId,
  title: string,         // required
  date: Date,            // required
  time: string,
  location: string,
  description: string,
  eventId: ObjectId,     // ref: Kegiatan (optional)
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Galeri
```typescript
{
  _id: ObjectId,
  title: string,         // required
  images: [{
    url: string,
    publicId: string,    // cloudinary public_id
    caption: string
  }],
  videoUrl: string,      // YouTube embed (optional)
  category: ObjectId,    // ref: Kategori
  eventId: ObjectId,     // ref: Kegiatan (optional)
  order: number,
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Banner
```typescript
{
  _id: ObjectId,
  title: string,
  image: string,         // required, URL
  link: string,
  order: number,         // untuk urutan tampil
  isActive: boolean,     // default: true
  createdAt: Date,
  updatedAt: Date
}
```

#### Pengurus
```typescript
{
  _id: ObjectId,
  name: string,          // required
  position: string,      // required (Ketua, Sekretaris, dll)
  photo: string,
  period: string,        // e.g. "2024-2026"
  order: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Program
```typescript
{
  _id: ObjectId,
  name: string,          // required
  slug: string,          // required, unique
  description: string,
  content: string,       // detail content HTML
  image: string,
  icon: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Dokumen
```typescript
{
  _id: ObjectId,
  name: string,          // required
  fileUrl: string,       // required
  fileSize: number,
  fileType: string,      // pdf, doc, etc
  category: string,
  description: string,
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Kategori
```typescript
{
  _id: ObjectId,
  name: string,          // required
  slug: string,          // required, unique
  type: 'artikel' | 'kegiatan' | 'galeri',  // required
  createdAt: Date
}
```

#### Testimoni
```typescript
{
  _id: ObjectId,
  name: string,          // required
  content: string,       // required
  role: string,          // e.g. "Anggota RMI"
  photo: string,
  order: number,
  isActive: boolean,
  createdAt: Date
}
```

#### Pengaturan (Settings)
```typescript
{
  _id: ObjectId,
  siteName: string,
  tagline: string,
  about: string,         // profil singkat
  vision: string,
  mission: string,       // array of strings
  address: string,
  phone: string,
  whatsapp: string,
  email: string,
  socialMedia: {
    instagram: string,
    facebook: string,
    youtube: string,
    tiktok: string
  },
  googleMapsEmbed: string,
  stats: {
    totalEvents: number,
    totalMembers: number,
    totalPengurus: number,
    establishedYear: number
  },
  updatedAt: Date
}
```

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: User Stories](./08-user-stories.md) | [Selanjutnya: Spesifikasi API](./10-api-specification.md)
