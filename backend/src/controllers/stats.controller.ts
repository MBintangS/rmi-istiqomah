import type { Request, Response } from "express";
import { Artikel, Galeri, Kegiatan } from "../models";
import { sendSuccess } from "../utils/response";

async function countPublishedGaleriImages(): Promise<number> {
  const result = await Galeri.aggregate<{ total: number }>([
    { $match: { isPublished: true } },
    { $project: { imageCount: { $size: { $ifNull: ["$images", []] } } } },
    { $group: { _id: null, total: { $sum: "$imageCount" } } },
  ]);

  return result[0]?.total ?? 0;
}

/** Public counts for homepage / tentang statistik (published only). */
export async function getPublicCounts(_req: Request, res: Response): Promise<void> {
  const [totalArtikel, totalKegiatan, totalGaleri] = await Promise.all([
    Artikel.countDocuments({ status: "published" }),
    Kegiatan.countDocuments({ isPublished: true }),
    countPublishedGaleriImages(),
  ]);

  sendSuccess(res, {
    totalArtikel,
    totalKegiatan,
    totalGaleri,
  });
}
