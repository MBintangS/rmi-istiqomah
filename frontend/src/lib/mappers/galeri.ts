import type { GaleriListItem } from "@/types/api";
import type { FlatGalleryItem } from "@/lib/gallery";
import type { GaleriImage } from "@/types";

export function flattenGaleriItems(albums: GaleriListItem[]): FlatGalleryItem[] {
  return albums
    .filter((album) => album.isPublished)
    .sort((a, b) => a.order - b.order)
    .flatMap((album) =>
      album.images.map((image, index) => ({
        id: `${album.id}-${index}`,
        url: image.url,
        caption: image.caption || album.title,
        category: album.category?.slug,
        categoryLabel: album.category?.name,
        albumTitle: album.title,
        eventId: album.event?.id,
        eventLabel: album.event?.title,
      })),
    );
}

export function getGalleryCategoriesFromItems(
  items: FlatGalleryItem[],
): { value: string; label: string }[] {
  const categories = new Map<string, string>();

  for (const item of items) {
    if (item.category) {
      categories.set(item.category, item.categoryLabel ?? item.category);
    }
  }

  return Array.from(categories.entries()).map(([value, label]) => ({ value, label }));
}

export function getGalleryEventFiltersFromItems(
  items: FlatGalleryItem[],
): { value: string; label: string }[] {
  const events = new Map<string, string>();

  for (const item of items) {
    if (item.eventId) {
      events.set(item.eventId, item.eventLabel ?? item.eventId);
    }
  }

  return Array.from(events.entries()).map(([value, label]) => ({ value, label }));
}

export function getGalleryPreviewImages(
  albums: GaleriListItem[],
  limit = 5,
): GaleriImage[] {
  return flattenGaleriItems(albums)
    .slice(0, limit)
    .map((item) => ({
      url: item.url,
      caption: item.caption,
    }));
}
