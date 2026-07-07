const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'PRD.md'), 'utf8');
const lines = src.split('\n');

const sectionStarts = [];
for (let i = 0; i < lines.length; i++) {
  if (/^## \d+\. /.test(lines[i])) {
    sectionStarts.push({ line: i, title: lines[i].replace('## ', '') });
  }
}

const files = [
  { name: '01-product-overview.md', title: 'Ringkasan, Latar Belakang & Visi', sections: [1, 2, 3] },
  { name: '02-users-and-scope.md', title: 'Pengguna & Ruang Lingkup', sections: [4, 5] },
  { name: '03-information-architecture.md', title: 'Arsitektur Informasi', sections: [6] },
  { name: '04-functional-requirements.md', title: 'Persyaratan Fungsional', sections: [7] },
  { name: '05-non-functional-requirements.md', title: 'Persyaratan Non-Fungsional', sections: [8] },
  { name: '06-design-ux.md', title: 'Desain & UX', sections: [9] },
  { name: '07-technical-architecture.md', title: 'Arsitektur Teknis', sections: [10] },
  { name: '08-user-stories.md', title: 'User Stories', sections: [11] },
  { name: '09-database-schema.md', title: 'Skema Data', sections: [12] },
  { name: '10-api-specification.md', title: 'Spesifikasi API', sections: [13] },
  { name: '11-seo-accessibility.md', title: 'SEO & Aksesibilitas', sections: [14] },
  { name: '12-success-metrics.md', title: 'Metrik Keberhasilan', sections: [15] },
  { name: '13-timeline.md', title: 'Fase & Milestone', sections: [16] },
  { name: '14-risks-assumptions.md', title: 'Risiko & Asumsi', sections: [17, 18] },
  { name: '15-deliverables-glossary.md', title: 'Deliverables & Glosarium', sections: [19, 20] },
];

const dir = path.join(__dirname, '..', 'docs', 'prd');
fs.mkdirSync(dir, { recursive: true });

function getSectionContent(sectionNum) {
  const idx = sectionStarts.findIndex((s) => s.title.startsWith(`${sectionNum}.`));
  if (idx === -1) return '';
  const startLine = sectionStarts[idx].line;
  const endLine = idx + 1 < sectionStarts.length ? sectionStarts[idx + 1].line : lines.length;
  return lines.slice(startLine, endLine).join('\n').trim();
}

const fileList = files.map((f) => ({ ...f, path: f.name }));

function nav(currentIdx) {
  const prev = currentIdx > 0 ? fileList[currentIdx - 1] : null;
  const next = currentIdx < fileList.length - 1 ? fileList[currentIdx + 1] : null;
  let n = '**Navigasi:** [Indeks](./README.md)';
  if (prev) n += ` | [Sebelumnya: ${prev.title}](./${prev.name})`;
  if (next) n += ` | [Selanjutnya: ${next.title}](./${next.name})`;
  return n;
}

files.forEach((file, idx) => {
  let content = `# ${file.title}\n\n`;
  content += '> Bagian dari [PRD Website RMI](./README.md)\n\n';
  content += `${nav(idx)}\n\n---\n\n`;
  for (const sec of file.sections) {
    const secContent = getSectionContent(sec);
    if (secContent) content += `${secContent}\n\n`;
  }
  if (file.name === '15-deliverables-glossary.md') {
    const lampiranStart = lines.findIndex((l) => l === '## Lampiran');
    if (lampiranStart !== -1) {
      content += `${lines.slice(lampiranStart).join('\n').trim()}\n`;
    }
  }
  content += `\n---\n\n${nav(idx)}\n`;
  fs.writeFileSync(path.join(dir, file.name), content);
});

const readme = `# PRD — Website Remaja Masjid Istiqomah (RMI)

| Field | Detail |
|-------|--------|
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 7 Juli 2026 |
| **Status** | Draft — Siap untuk Development |
| **Sumber** | [project.md](../../project.md) |
| **Pemilik Produk** | Pengurus Remaja Masjid Istiqomah |

---

## Tentang Dokumen Ini

Product Requirements Document (PRD) untuk website resmi **Remaja Masjid Istiqomah (RMI)**. Dokumen dipisah menjadi beberapa file agar mudah dibaca dan dirujuk selama development.

---

## Daftar Isi

### Produk & Pengguna

| # | Dokumen | Isi |
|---|---------|-----|
| 1 | [Ringkasan, Latar Belakang & Visi](./01-product-overview.md) | Konteks, masalah, visi, tujuan bisnis |
| 2 | [Pengguna & Ruang Lingkup](./02-users-and-scope.md) | Persona, role, in/out scope |
| 3 | [Arsitektur Informasi](./03-information-architecture.md) | Peta situs publik & admin |

### Requirements

| # | Dokumen | Isi |
|---|---------|-----|
| 4 | [Persyaratan Fungsional](./04-functional-requirements.md) | Semua FR dengan ID & prioritas |
| 5 | [Persyaratan Non-Fungsional](./05-non-functional-requirements.md) | Performa, keamanan, kompatibilitas |
| 6 | [Desain & UX](./06-design-ux.md) | Warna, tipografi, komponen, wireframe |
| 7 | [User Stories](./08-user-stories.md) | User stories & acceptance criteria |

### Teknis

| # | Dokumen | Isi |
|---|---------|-----|
| 8 | [Arsitektur Teknis](./07-technical-architecture.md) | Stack, diagram, struktur folder |
| 9 | [Skema Data](./09-database-schema.md) | ERD & model MongoDB |
| 10 | [Spesifikasi API](./10-api-specification.md) | Endpoints REST & format response |
| 11 | [SEO & Aksesibilitas](./11-seo-accessibility.md) | Meta tags, structured data |

### Perencanaan

| # | Dokumen | Isi |
|---|---------|-----|
| 12 | [Metrik Keberhasilan](./12-success-metrics.md) | KPI teknis & bisnis, Definition of Done |
| 13 | [Fase & Milestone](./13-timeline.md) | Timeline 10 minggu per fase |
| 14 | [Risiko & Asumsi](./14-risks-assumptions.md) | Risiko, mitigasi, ketergantungan |
| 15 | [Deliverables & Glosarium](./15-deliverables-glossary.md) | Output proyek, istilah, lampiran |

---

## Quick Links

- [Brief awal project](../../project.md)
- [Persyaratan Fungsional](./04-functional-requirements.md) — referensi utama saat coding
- [Skema Data](./09-database-schema.md) — referensi database
- [Spesifikasi API](./10-api-specification.md) — referensi backend
- [Timeline Development](./13-timeline.md) — urutan pengerjaan

---

*Dokumen ini merupakan living document. Perubahan signifikan harus disetujui oleh pemilik produk.*

**Disusun oleh:** Tim Development RMI
`;

fs.writeFileSync(path.join(dir, 'README.md'), readme);
console.log(`Created ${files.length + 1} files in docs/prd/`);
