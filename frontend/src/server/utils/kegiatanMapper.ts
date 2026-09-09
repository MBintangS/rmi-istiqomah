import type { Types } from "mongoose";
import type { IKegiatan } from "../models/Kegiatan.model";

interface PopulatedCategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
}

type PopulatedKegiatan = IKegiatan & {
  _id: Types.ObjectId;
  category: PopulatedCategory | Types.ObjectId;
};

function formatCategory(category: PopulatedKegiatan["category"]) {
  if (!category || typeof category === "string" || !("name" in category)) {
    return null;
  }

  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
  };
}

export function formatKegiatan(kegiatan: PopulatedKegiatan) {
  return {
    id: kegiatan._id.toString(),
    title: kegiatan.title,
    slug: kegiatan.slug,
    description: kegiatan.description,
    dateStart: kegiatan.dateStart,
    dateEnd: kegiatan.dateEnd ?? null,
    time: kegiatan.time ?? null,
    location: kegiatan.location ?? null,
    locationMap: kegiatan.locationMap ?? null,
    thumbnail: kegiatan.thumbnail ?? null,
    status: kegiatan.status,
    isPublished: kegiatan.isPublished,
    category: formatCategory(kegiatan.category),
    createdAt: kegiatan.createdAt,
    updatedAt: kegiatan.updatedAt,
  };
}
