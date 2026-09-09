import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Banner } from "@/server/models";
import type { CreateBannerInput, UpdateBannerInput } from "@/server/schemas/galeri.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatBanner } from "@/server/utils/bannerMapper";

export async function listBanner(query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter = includeUnpublished ? {} : { isActive: true };
  const items = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
  return items.map((item) => formatBanner(item));
}

export async function createBanner(data: CreateBannerInput) {
  const banner = await Banner.create({
    title: data.title,
    image: data.image,
    link: data.link || undefined,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });
  return formatBanner(banner);
}

export async function updateBanner(id: string, data: UpdateBannerInput) {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new AppError(404, "NOT_FOUND", "Banner tidak ditemukan");
  }
  if (data.title !== undefined) banner.title = data.title;
  if (data.image !== undefined) banner.image = data.image;
  if (data.link !== undefined) banner.link = data.link || undefined;
  if (data.order !== undefined) banner.order = data.order;
  if (data.isActive !== undefined) banner.isActive = data.isActive;
  await banner.save();
  return formatBanner(banner);
}

export async function deleteBanner(id: string) {
  const banner = await Banner.findByIdAndDelete(id);
  if (!banner) {
    throw new AppError(404, "NOT_FOUND", "Banner tidak ditemukan");
  }
  return { id: banner._id.toString() };
}
