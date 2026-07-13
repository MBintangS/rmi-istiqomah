import type { Request, Response } from "express";
import { AppError } from "../middleware/errorHandler";
import { Banner } from "../models";
import type { CreateBannerInput, UpdateBannerInput } from "../schemas/galeri.schema";
import { canViewUnpublished } from "../utils/artikelMapper";
import { formatBanner } from "../utils/bannerMapper";
import { sendSuccess } from "../utils/response";

export async function listBanner(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter = includeUnpublished ? {} : { isActive: true };
  const items = await Banner.find(filter).sort({ order: 1, createdAt: -1 });

  sendSuccess(res, items.map((item) => formatBanner(item)));
}

export async function createBanner(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateBannerInput;

  const banner = await Banner.create({
    title: data.title,
    image: data.image,
    link: data.link || undefined,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });

  sendSuccess(res, formatBanner(banner), {
    status: 201,
    message: "Banner berhasil dibuat",
  });
}

export async function updateBanner(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateBannerInput;
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new AppError(404, "NOT_FOUND", "Banner tidak ditemukan");
  }

  if (data.title !== undefined) banner.title = data.title;
  if (data.image !== undefined) banner.image = data.image;
  if (data.link !== undefined) banner.link = data.link || undefined;
  if (data.order !== undefined) banner.order = data.order;
  if (data.isActive !== undefined) banner.isActive = data.isActive;

  await banner.save();

  sendSuccess(res, formatBanner(banner), { message: "Banner berhasil diperbarui" });
}

export async function deleteBanner(req: Request, res: Response): Promise<void> {
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    throw new AppError(404, "NOT_FOUND", "Banner tidak ditemukan");
  }

  sendSuccess(res, { id: banner._id.toString() }, { message: "Banner berhasil dihapus" });
}
