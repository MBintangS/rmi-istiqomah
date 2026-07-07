export type KategoriType = "artikel" | "kegiatan" | "galeri";

export interface Kategori {
  id: string;
  name: string;
  slug: string;
  type: KategoriType;
}

export type ArtikelStatus = "draft" | "published";

export interface Artikel {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Kategori;
  thumbnail: string;
  status: ArtikelStatus;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  createdAt: string;
}
