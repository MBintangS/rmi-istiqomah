import type { Artikel } from "@/types";
import { mockCategories } from "./mock-categories";

const thumbs = [
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1512385244942-b517a856f2e4?w=800&q=80",
  "https://images.unsplash.com/photo-1542816414-09727d0edc98?w=800&q=80",
];

export const mockArticles: Artikel[] = [
  {
    id: "art-1",
    title: "Menjaga Keistiqomahan di Usia Muda",
    slug: "menjaga-keistiqomahan-di-usia-muda",
    excerpt:
      "Keistiqomahan adalah kunci utama bagi remaja muslim dalam menghadapi godaan zaman.",
    content:
      "<p>Di era digital ini, remaja muslim dituntut untuk semakin kuat dalam menjaga prinsip agama. Keistiqomahan bukan sekadar konsisten di awal, melainkan tekad yang dijaga setiap hari.</p>",
    category: mockCategories.dakwah,
    thumbnail: thumbs[0],
    status: "published",
    author: "Admin RMI",
    publishedAt: "2026-06-15T08:00:00.000Z",
    createdAt: "2026-06-10T08:00:00.000Z",
  },
  {
    id: "art-2",
    title: "5 Amalan Sunnah yang Mudah Diterapkan",
    slug: "5-amalan-sunnah-mudah-diterapkan",
    excerpt: "Amalan sunnah yang ringan namun pahalanya besar, cocok untuk remaja sibuk.",
    content:
      "<p>Mulai dari membaca doa masuk masjid hingga memelihara silaturahmi, amalan-amalan sunnah ini mudah dilakukan di sela aktivitas sehari-hari.</p>",
    category: mockCategories.tips,
    thumbnail: thumbs[1],
    status: "published",
    author: "Admin RMI",
    publishedAt: "2026-06-20T08:00:00.000Z",
    createdAt: "2026-06-18T08:00:00.000Z",
  },
  {
    id: "art-3",
    title: "Hikmah di Balik Shalat Berjamaah",
    slug: "hikmah-shalat-berjamaah",
    excerpt: "Shalat berjamaah mempererat ukhuwah dan meningkatkan kedisiplinan jamaah.",
    content:
      "<p>Shalat berjamaah di masjid bukan hanya kewajiban, tetapi juga sarana membangun komunitas yang solid dan saling menguatkan.</p>",
    category: mockCategories.kajian,
    thumbnail: thumbs[2],
    status: "published",
    author: "Ustadz Ahmad",
    publishedAt: "2026-07-01T08:00:00.000Z",
    createdAt: "2026-06-28T08:00:00.000Z",
  },
  {
    id: "art-4",
    title: "Tips Menjaga Waktu di Bulan Ramadhan",
    slug: "tips-menjaga-waktu-ramadhan",
    excerpt: "Manajemen waktu yang baik membantu ibadah Ramadhan lebih maksimal.",
    content:
      "<p>Rencanakan aktivitas harian, prioritaskan ibadah, dan manfaatkan waktu luang untuk membaca Al-Qur'an dan tadarus bersama.</p>",
    category: mockCategories.tips,
    thumbnail: thumbs[3],
    status: "published",
    author: "Admin RMI",
    publishedAt: "2026-05-10T08:00:00.000Z",
    createdAt: "2026-05-08T08:00:00.000Z",
  },
  {
    id: "art-5",
    title: "Peran Remaja dalam Memajukan Masjid",
    slug: "peran-remaja-memajukan-masjid",
    excerpt: "Generasi muda punya energi dan kreativitas yang vital bagi kemajuan masjid.",
    content:
      "<p>Dari kegiatan sosial hingga dakwah digital, remaja masjid berperan penting dalam menarik minat jamaah muda lainnya.</p>",
    category: mockCategories.dakwah,
    thumbnail: thumbs[4],
    status: "published",
    author: "Admin RMI",
    publishedAt: "2026-07-05T08:00:00.000Z",
    createdAt: "2026-07-03T08:00:00.000Z",
  },
];
