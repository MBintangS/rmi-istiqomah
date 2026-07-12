import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { ArtikelDetail, ArtikelListItem } from "@/types/api";
import type { Artikel, Kategori } from "@/types";

function mapCategory(category: ArtikelListItem["category"]): Kategori {
  if (!category) {
    return { id: "unknown", name: "Umum", slug: "umum", type: "artikel" };
  }

  return { ...category, type: "artikel" };
}

export function mapArtikelListItem(item: ArtikelListItem): Artikel {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    content: "",
    excerpt: item.excerpt,
    category: mapCategory(item.category),
    thumbnail: item.thumbnail || PLACEHOLDER_IMAGE,
    status: item.status,
    author: item.author?.name ?? "RMI",
    metaTitle: item.metaTitle ?? undefined,
    metaDescription: item.metaDescription ?? undefined,
    publishedAt: item.publishedAt ?? item.createdAt,
    createdAt: item.createdAt,
  };
}

export function mapArtikelDetail(item: ArtikelDetail): Artikel {
  return {
    ...mapArtikelListItem(item),
    content: item.content,
  };
}

export function getArticleCategoriesFromList(articles: Artikel[]): Kategori[] {
  const categories = new Map<string, Kategori>();

  for (const article of articles) {
    categories.set(article.category.id, article.category);
  }

  return Array.from(categories.values());
}

export function getRelatedArticles(articles: Artikel[], current: Artikel, limit = 3): Artikel[] {
  const others = articles.filter((item) => item.id !== current.id);
  const sameCategory = others.filter((item) => item.category.id === current.category.id);

  return [...sameCategory, ...others.filter((item) => item.category.id !== current.category.id)].slice(
    0,
    limit,
  );
}
