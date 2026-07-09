import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { Artikel, type IArtikel, Kegiatan, type IKegiatan } from "../models";
import type { SearchQuery } from "../schemas/misc.schema";
import { sendSuccess } from "../utils/response";

function buildTextFilter(keyword: string, fields: string[]) {
  const regex = new RegExp(keyword, "i");
  return { $or: fields.map((field) => ({ [field]: regex })) };
}

export async function globalSearch(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as SearchQuery;
  const limit = query.limit ?? 10;
  const perTypeLimit = Math.max(1, Math.ceil(limit / 2));

  const artikelFilter: FilterQuery<IArtikel> = {
    status: "published",
    ...buildTextFilter(query.q, ["title", "excerpt"]),
  };

  const kegiatanFilter: FilterQuery<IKegiatan> = {
    isPublished: true,
    ...buildTextFilter(query.q, ["title", "description"]),
  };

  const [artikelItems, kegiatanItems] = await Promise.all([
    Artikel.find(artikelFilter)
      .select("title slug excerpt thumbnail publishedAt createdAt")
      .sort({ publishedAt: -1 })
      .limit(perTypeLimit),
    Kegiatan.find(kegiatanFilter)
      .select("title slug description thumbnail dateStart status createdAt")
      .sort({ dateStart: -1 })
      .limit(perTypeLimit),
  ]);

  const artikel = artikelItems.map((item) => ({
    type: "artikel" as const,
    id: item._id.toString(),
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    thumbnail: item.thumbnail ?? null,
    publishedAt: item.publishedAt ?? null,
    createdAt: item.createdAt,
  }));

  const kegiatan = kegiatanItems.map((item) => ({
    type: "kegiatan" as const,
    id: item._id.toString(),
    title: item.title,
    slug: item.slug,
    description: item.description,
    thumbnail: item.thumbnail ?? null,
    dateStart: item.dateStart,
    status: item.status,
    createdAt: item.createdAt,
  }));

  sendSuccess(res, {
    query: query.q,
    artikel,
    kegiatan,
    total: artikel.length + kegiatan.length,
  });
}
