import type { Kategori } from "@/types";

export const mockCategories: Record<string, Kategori> = {
  dakwah: {
    id: "cat-1",
    name: "Dakwah",
    slug: "dakwah",
    type: "artikel",
  },
  tips: {
    id: "cat-2",
    name: "Tips Remaja",
    slug: "tips-remaja",
    type: "artikel",
  },
  kajian: {
    id: "cat-3",
    name: "Kajian",
    slug: "kajian",
    type: "artikel",
  },
  rutin: {
    id: "cat-4",
    name: "Kegiatan Rutin",
    slug: "kegiatan-rutin",
    type: "kegiatan",
  },
  besar: {
    id: "cat-5",
    name: "Acara Besar",
    slug: "acara-besar",
    type: "kegiatan",
  },
};
