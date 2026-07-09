import type { Types } from "mongoose";
import type { IBanner } from "../models/Banner.model";

type BannerLike = IBanner & { _id: Types.ObjectId };

export function formatBanner(banner: BannerLike) {
  return {
    id: banner._id.toString(),
    title: banner.title,
    image: banner.image,
    link: banner.link ?? null,
    order: banner.order,
    isActive: banner.isActive,
    createdAt: banner.createdAt,
    updatedAt: banner.updatedAt,
  };
}
