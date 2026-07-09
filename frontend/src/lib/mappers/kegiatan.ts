import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { KegiatanListItem } from "@/types/api";
import type { Kategori, Kegiatan } from "@/types";

const FALLBACK_CATEGORY: Kategori = {
  id: "unknown",
  name: "Umum",
  slug: "umum",
  type: "kegiatan",
};

function mapCategory(category: KegiatanListItem["category"]): Kategori {
  if (!category) {
    return FALLBACK_CATEGORY;
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    type: "kegiatan",
  };
}

export function mapKegiatanListItem(item: KegiatanListItem): Kegiatan {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    dateStart: item.dateStart,
    dateEnd: item.dateEnd ?? undefined,
    time: item.time ?? undefined,
    location: item.location ?? "",
    locationMap: item.locationMap ?? undefined,
    category: mapCategory(item.category),
    thumbnail: item.thumbnail ?? PLACEHOLDER_IMAGE,
    status: item.status,
    isPublished: item.isPublished,
    createdAt: item.createdAt,
  };
}

export function getEventCategoriesFromList(events: Kegiatan[]): Kategori[] {
  const categories = new Map<string, Kategori>();

  for (const event of events) {
    categories.set(event.category.id, event.category);
  }

  return Array.from(categories.values());
}
