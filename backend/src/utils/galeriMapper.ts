import type { Types } from "mongoose";
import type { IGaleri } from "../models/Galeri.model";

interface PopulatedCategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
}

interface PopulatedEvent {
  _id: Types.ObjectId;
  title: string;
  slug: string;
}

type PopulatedGaleri = IGaleri & {
  _id: Types.ObjectId;
  category: PopulatedCategory | Types.ObjectId;
  eventId?: PopulatedEvent | Types.ObjectId;
};

function formatCategory(category: PopulatedGaleri["category"]) {
  if (!category || typeof category === "string" || !("name" in category)) {
    return null;
  }

  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
  };
}

function formatEvent(event: PopulatedGaleri["eventId"]) {
  if (!event || typeof event === "string" || !("title" in event)) {
    return null;
  }

  return {
    id: event._id.toString(),
    title: event.title,
    slug: event.slug,
  };
}

export function formatGaleri(galeri: PopulatedGaleri) {
  return {
    id: galeri._id.toString(),
    title: galeri.title,
    images: galeri.images,
    videoUrl: galeri.videoUrl ?? null,
    category: formatCategory(galeri.category),
    event: formatEvent(galeri.eventId),
    order: galeri.order,
    isPublished: galeri.isPublished,
    createdAt: galeri.createdAt,
    updatedAt: galeri.updatedAt,
  };
}
