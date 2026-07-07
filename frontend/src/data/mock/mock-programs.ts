import type { Program } from "@/types";

const thumbs = [
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
];

export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    name: "Isra Miraj",
    slug: "isra-miraj",
    description:
      "Peringatan perjalanan Isra Miraj Nabi Muhammad SAW dengan rangkaian ibadah dan tausiyah.",
    content:
      "<p>Program Isra Miraj RMI diisi dengan pembacaan ayat suci, tausiyah inspiratif, dan doa bersama. Kegiatan ini menjadi momentum memperkuat keimanan jamaah remaja.</p>",
    image: thumbs[0],
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
      "<p>Maulid Nabi di RMI mengajak jamaah untuk mengenal dan mencintai Rasulullah SAW melalui berbagai kegiatan keagamaan dan sosial.</p>",
    image: thumbs[1],
    isActive: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "prog-3",
    name: "Sanlat",
    slug: "sanlat",
    description:
      "Pesantren Kilat (Sanlat) — program intensif mengaji, tahfidz, dan pembinaan karakter remaja.",
    content:
      "<p>Sanlat RMI diselenggarakan setiap tahun dengan materi ngaji, tahfidz, dan pembinaan akhlak. Program ini menjadi ciri khas kegiatan remaja masjid.</p>",
    image: thumbs[2],
    isActive: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
];
