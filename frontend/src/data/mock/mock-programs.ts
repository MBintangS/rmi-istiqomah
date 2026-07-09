import type { Program } from "@/types";

const thumbs = [
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
];

const gallerySets = [
  [
    "https://images.unsplash.com/photo-1512385244942-b517a856f2e4?w=600&q=80",
    "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80",
    "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=600&q=80",
    "https://images.unsplash.com/photo-1542816414-09727d0edc98?w=600&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80",
    "https://images.unsplash.com/photo-1456513087680-7db5eb5db5c0?w=600&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    "https://images.unsplash.com/photo-1512385244942-b517a856f2e4?w=600&q=80",
  ],
];

export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    name: "Isra Miraj",
    slug: "isra-miraj",
    description:
      "Peringatan perjalanan Isra Miraj Nabi Muhammad SAW dengan rangkaian ibadah dan tausiyah.",
    content:
      "<p>Program Isra Miraj RMI diisi dengan pembacaan ayat suci, tausiyah inspiratif, dan doa bersama. Kegiatan ini menjadi momentum memperkuat keimanan jamaah remaja.</p><p>Seluruh rangkaian acara dirancang agar peserta dapat merenungkan makna perjalanan spiritual Nabi Muhammad SAW sambil mempererat ukhuwah antar anggota.</p>",
    image: thumbs[0],
    schedule: [
      { label: "Waktu", value: "Malam 27 Rajab, pukul 19:30 WIB" },
      { label: "Tempat", value: "Masjid Istiqomah" },
      { label: "Frekuensi", value: "Tahunan" },
    ],
    galleryImages: gallerySets[0],
    isActive: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "prog-2",
    name: "Maulid Nabi",
    slug: "maulid-nabi",
    description:
      "Peringatan kelahiran Nabi Muhammad SAW melalui pembacaan maulid, sholawat, dan kegiatan sosial.",
    content:
      "<p>Maulid Nabi di RMI mengajak jamaah untuk mengenal dan mencintai Rasulullah SAW melalui berbagai kegiatan keagamaan dan sosial.</p><p>Acara dilengkapi pembacaan maulid, ceramah, sholawat bersama, serta kegiatan berbagi kepada masyarakat sekitar masjid.</p>",
    image: thumbs[1],
    schedule: [
      { label: "Waktu", value: "12 Rabiul Awal, pukul 08:00 WIB" },
      { label: "Tempat", value: "Aula Masjid Istiqomah" },
      { label: "Frekuensi", value: "Tahunan" },
    ],
    galleryImages: gallerySets[1],
    isActive: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "prog-3",
    name: "Sanlat",
    slug: "sanlat",
    description:
      "Pesantren Kilat (Sanlat): program intensif mengaji, tahfidz, dan pembinaan karakter remaja.",
    content:
      "<p>Sanlat RMI diselenggarakan setiap tahun dengan materi ngaji, tahfidz, dan pembinaan akhlak. Program ini menjadi ciri khas kegiatan remaja masjid.</p><p>Peserta mengikuti kegiatan full day selama 3 hari 2 malam dengan pengajar terpilih dan suasana pesantren yang kondusif.</p>",
    image: thumbs[2],
    schedule: [
      { label: "Waktu", value: "Libur akhir tahun, pukul 07:00 WIB" },
      { label: "Tempat", value: "Masjid Istiqomah" },
      { label: "Durasi", value: "3 hari 2 malam" },
      { label: "Frekuensi", value: "Tahunan" },
    ],
    galleryImages: gallerySets[2],
    isActive: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
];
