# SEO & Aksesibilitas

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Spesifikasi API](./10-api-specification.md) | [Selanjutnya: Metrik Keberhasilan](./12-success-metrics.md)

---

## 14. SEO & Aksesibilitas

### 14.1 SEO Requirements

| Item | Implementasi |
|------|-------------|
| Dynamic Meta Title | `{pageTitle} \| Remaja Masjid Istiqomah` |
| Dynamic Meta Description | Per halaman, max 160 karakter |
| Open Graph Tags | og:title, og:description, og:image, og:url |
| Twitter Card | summary_large_image |
| Sitemap.xml | Auto-generated via Next.js |
| robots.txt | Allow all, sitemap reference |
| Structured Data | Organization, Article, Event (JSON-LD) |
| Canonical URL | Setiap halaman |
| Semantic HTML | header, main, nav, article, section, footer |

### 14.2 Structured Data Examples

```json
// Organization (Homepage)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Remaja Masjid Istiqomah",
  "url": "https://rmi-domain.com",
  "logo": "https://rmi-domain.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-xxx",
    "contactType": "customer service"
  }
}

// Article
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Judul Artikel",
  "author": { "@type": "Person", "name": "Admin RMI" },
  "datePublished": "2026-07-07",
  "image": "https://..."
}
```

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Spesifikasi API](./10-api-specification.md) | [Selanjutnya: Metrik Keberhasilan](./12-success-metrics.md)
