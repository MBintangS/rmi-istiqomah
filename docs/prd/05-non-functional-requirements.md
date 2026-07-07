# Persyaratan Non-Fungsional

> Bagian dari [PRD Website RMI](./README.md)

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Persyaratan Fungsional](./04-functional-requirements.md) | [Selanjutnya: Desain & UX](./06-design-ux.md)

---

## 8. Persyaratan Non-Fungsional

### 8.1 Performa

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-01 | Lighthouse Performance Score | ≥ 90 |
| NFR-PERF-02 | First Contentful Paint (FCP) | < 1.8s |
| NFR-PERF-03 | Largest Contentful Paint (LCP) | < 2.5s |
| NFR-PERF-04 | Cumulative Layout Shift (CLS) | < 0.1 |
| NFR-PERF-05 | Time to Interactive (TTI) | < 3.8s |
| NFR-PERF-06 | Image optimization (WebP, lazy load) | Wajib |
| NFR-PERF-07 | Code splitting & lazy loading komponen | Wajib |

### 8.2 Aksesibilitas

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-A11Y-01 | Lighthouse Accessibility Score | ≥ 90 |
| NFR-A11Y-02 | Semantic HTML | Wajib |
| NFR-A11Y-03 | Alt text pada semua gambar | Wajib |
| NFR-A11Y-04 | Keyboard navigation | Wajib |
| NFR-A11Y-05 | Color contrast ratio (WCAG AA) | ≥ 4.5:1 |
| NFR-A11Y-06 | Focus indicators visible | Wajib |

### 8.3 Keamanan

| ID | Requirement |
|----|-------------|
| NFR-SEC-01 | Password hashing (bcrypt) |
| NFR-SEC-02 | JWT dengan secret key di environment variable |
| NFR-SEC-03 | Input sanitization (XSS prevention) |
| NFR-SEC-04 | Rate limiting pada endpoint auth |
| NFR-SEC-05 | CORS configuration |
| NFR-SEC-06 | Helmet.js untuk security headers |
| NFR-SEC-07 | Validasi & sanitasi upload file |
| NFR-SEC-08 | HTTPS wajib di production |

### 8.4 Skalabilitas & Reliabilitas

| ID | Requirement |
|----|-------------|
| NFR-SCALE-01 | Database indexing pada field yang sering di-query |
| NFR-SCALE-02 | Pagination di semua list endpoint |
| NFR-SCALE-03 | Error handling terstandar di API |
| NFR-SCALE-04 | Logging error di server |
| NFR-SCALE-05 | Uptime target ≥ 99% |

### 8.5 Kompatibilitas

| ID | Requirement |
|----|-------------|
| NFR-COMPAT-01 | Chrome, Firefox, Safari, Edge (2 versi terakhir) |
| NFR-COMPAT-02 | Mobile: iOS Safari, Chrome Android |
| NFR-COMPAT-03 | Responsive breakpoints: 320px, 768px, 1024px, 1280px |
| NFR-COMPAT-04 | Mobile-first design approach |

### 8.6 Maintainability

| ID | Requirement |
|----|-------------|
| NFR-MAINT-01 | TypeScript untuk type safety |
| NFR-MAINT-02 | Komponen reusable & terpisah berdasarkan tanggung jawab |
| NFR-MAINT-03 | Custom hooks untuk logika berulang |
| NFR-MAINT-04 | Environment variables untuk konfigurasi |
| NFR-MAINT-05 | Konsisten coding standards (ESLint, Prettier) |
| NFR-MAINT-06 | Dokumentasi API (Swagger/OpenAPI) |

---


---

**Navigasi:** [Indeks](./README.md) | [Sebelumnya: Persyaratan Fungsional](./04-functional-requirements.md) | [Selanjutnya: Desain & UX](./06-design-ux.md)
