import { mockArticles } from "@/data/mock";
import type { Artikel, Kategori } from "@/types";

export function getPublishedArticles(): Artikel[] {
  return mockArticles
    .filter((article) => article.status === "published")
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getArticleBySlug(slug: string): Artikel | undefined {
  return mockArticles.find(
    (article) => article.slug === slug && article.status === "published",
  );
}

export function getArticleSlugs(): string[] {
  return getPublishedArticles().map((article) => article.slug);
}

export function getArticleCategories(): Kategori[] {
  const categories = new Map<string, Kategori>();

  for (const article of getPublishedArticles()) {
    categories.set(article.category.id, article.category);
  }

  return Array.from(categories.values());
}

export function getRelatedArticles(article: Artikel, limit = 3): Artikel[] {
  const published = getPublishedArticles().filter((item) => item.id !== article.id);

  const sameCategory = published.filter((item) => item.category.id === article.category.id);
  const others = published.filter((item) => item.category.id !== article.category.id);

  return [...sameCategory, ...others].slice(0, limit);
}
