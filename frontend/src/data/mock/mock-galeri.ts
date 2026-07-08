import type { Galeri, GaleriImage } from "@/types";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80",
    caption: "Kajian remaja masjid",
  },
  {
    url: "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=600&q=80",
    caption: "Sholat berjamaah",
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    caption: "Pengajian rutin",
  },
  {
    url: "https://images.unsplash.com/photo-1542816414-09727d0edc98?w=600&q=80",
    caption: "Kegiatan sosial",
  },
  {
    url: "https://images.unsplash.com/photo-1512385244942-b517a856f2e4?w=600&q=80",
    caption: "Peringatan Isra Miraj",
  },
  {
    url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    caption: "Sanlat remaja",
  },
  {
    url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80",
    caption: "Bakti sosial",
  },
  {
    url: "https://images.unsplash.com/photo-1456513087680-7db5eb5db5c0?w=600&q=80",
    caption: "Belajar bersama",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    caption: "Maulid Nabi",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    caption: "Outbound kebersamaan",
  },
] satisfies GaleriImage[];

export const mockGaleri: Galeri[] = [
  {
    id: "gal-1",
    title: "Kegiatan Rutin RMI",
    images: photos.slice(0, 5),
    category: "rutin",
    order: 1,
    isPublished: true,
  },
  {
    id: "gal-2",
    title: "Peringatan Besar",
    images: photos.slice(5, 8),
    category: "besar",
    order: 2,
    isPublished: true,
  },
  {
    id: "gal-3",
    title: "Dokumentasi Tahunan",
    images: photos.slice(8),
    category: "dokumentasi",
    order: 3,
    isPublished: true,
  },
];

export const mockGalleryPreview: GaleriImage[] = mockGaleri
  .flatMap((album) => album.images)
  .slice(0, 8);
