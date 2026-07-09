import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Kategori, type IKategori } from "../models";
import type { CreateKategoriInput, KategoriListQuery } from "../schemas/artikel.schema";
import { generateUniqueSlug, slugify } from "../utils/slug";
import { sendSuccess } from "../utils/response";

function formatKategori(kategori: { _id: { toString(): string }; name: string; slug: string; type: string; createdAt?: Date }) {
  return {
    id: kategori._id.toString(),
    name: kategori.name,
    slug: kategori.slug,
    type: kategori.type,
    createdAt: kategori.createdAt,
  };
}

export async function listKategori(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as KategoriListQuery;
  const filter: FilterQuery<IKategori> = {};

  if (query.type) {
    filter.type = query.type;
  }

  const items = await Kategori.find(filter).sort({ name: 1 });

  sendSuccess(res, items.map(formatKategori));
}

export async function createKategori(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateKategoriInput;
  const baseSlug = data.slug ? slugify(data.slug) : slugify(data.name);

  if (!baseSlug) {
    throw new AppError(400, "VALIDATION_ERROR", "Slug kategori tidak valid");
  }

  const slug = await generateUniqueSlug(baseSlug, async (candidate) => {
    const existing = await Kategori.findOne({ slug: candidate }).select("_id");
    return Boolean(existing);
  });

  const kategori = await Kategori.create({
    name: data.name,
    slug,
    type: data.type,
  });

  sendSuccess(res, formatKategori(kategori), {
    status: 201,
    message: "Kategori berhasil dibuat",
  });
}
