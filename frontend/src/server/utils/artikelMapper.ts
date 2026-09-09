import type { Types } from "mongoose";
import type { IArtikel } from "../models/Artikel.model";

interface PopulatedCategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
}

interface PopulatedAuthor {
  _id: Types.ObjectId;
  name: string;
}

type PopulatedArtikel = IArtikel & {
  _id: Types.ObjectId;
  category: PopulatedCategory | Types.ObjectId;
  author: PopulatedAuthor | Types.ObjectId;
};

function formatCategory(category: PopulatedArtikel["category"]) {
  if (!category || typeof category === "string" || !("name" in category)) {
    return null;
  }

  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
  };
}

function formatAuthor(author: PopulatedArtikel["author"]) {
  if (!author || typeof author === "string" || !("name" in author)) {
    return null;
  }

  return {
    id: author._id.toString(),
    name: author.name,
  };
}

export function formatArtikel(artikel: PopulatedArtikel, options?: { includeContent?: boolean }) {
  const base = {
    id: artikel._id.toString(),
    title: artikel.title,
    slug: artikel.slug,
    excerpt: artikel.excerpt,
    thumbnail: artikel.thumbnail ?? null,
    status: artikel.status,
    category: formatCategory(artikel.category),
    author: formatAuthor(artikel.author),
    metaTitle: artikel.metaTitle ?? null,
    metaDescription: artikel.metaDescription ?? null,
    publishedAt: artikel.publishedAt ?? null,
    createdAt: artikel.createdAt,
    updatedAt: artikel.updatedAt,
  };

  if (options?.includeContent) {
    return { ...base, content: artikel.content };
  }

  return base;
}

export function isAdminUser(user?: { role: string }): boolean {
  return user?.role === "admin" || user?.role === "superadmin";
}

/** Parse query flag for CMS list/detail that may include drafts/inactive. */
export function parseIncludeUnpublished(value: unknown): boolean {
  return value === true || value === "true" || value === "1";
}

/**
 * Admin JWT alone is not enough — public pages may send the token.
 * Unpublished content is only returned when admin also passes includeUnpublished.
 */
export function canViewUnpublished(
  user: { role: string } | undefined,
  query: { includeUnpublished?: unknown } | Record<string, unknown>,
): boolean {
  return isAdminUser(user) && parseIncludeUnpublished(query.includeUnpublished);
}

