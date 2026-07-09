import { mockEvents, mockGaleri } from "@/data/mock";

export interface FlatGalleryItem {
  id: string;
  url: string;
  caption: string;
  category?: string;
  categoryLabel?: string;
  albumTitle: string;
  eventId?: string;
  eventLabel?: string;
}

export const galleryCategoryLabels: Record<string, string> = {
  rutin: "Kegiatan Rutin",
  besar: "Acara Besar",
  dokumentasi: "Dokumentasi",
};

export function getGalleryItems(): FlatGalleryItem[] {
  return mockGaleri
    .filter((album) => album.isPublished)
    .sort((a, b) => a.order - b.order)
    .flatMap((album) =>
      album.images.map((image, index) => ({
        id: `${album.id}-${index}`,
        url: image.url,
        caption: image.caption,
        category: album.category,
        albumTitle: album.title,
        eventId: album.eventId,
      })),
    );
}

export function getGalleryCategories(): { value: string; label: string }[] {
  const categories = new Set<string>();

  for (const item of getGalleryItems()) {
    if (item.category) {
      categories.add(item.category);
    }
  }

  return Array.from(categories).map((value) => ({
    value,
    label: galleryCategoryLabels[value] ?? value,
  }));
}

export function getGalleryEventFilters(): { value: string; label: string }[] {
  const eventIds = new Set<string>();

  for (const item of getGalleryItems()) {
    if (item.eventId) {
      eventIds.add(item.eventId);
    }
  }

  return Array.from(eventIds)
    .map((eventId) => {
      const event = mockEvents.find((item) => item.id === eventId);
      return event ? { value: eventId, label: event.title } : null;
    })
    .filter((item): item is { value: string; label: string } => item !== null);
}
