import { mockEvents } from "@/data/mock";
import type { Kegiatan, Kategori, KegiatanStatus } from "@/types";

export function getPublishedEvents(): Kegiatan[] {
  return mockEvents
    .filter((event) => event.isPublished)
    .sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
}

export function getEventBySlug(slug: string): Kegiatan | undefined {
  return mockEvents.find((event) => event.slug === slug && event.isPublished);
}

export function getEventById(id: string): Kegiatan | undefined {
  return mockEvents.find((event) => event.id === id && event.isPublished);
}

export function getEventSlugs(): string[] {
  return getPublishedEvents().map((event) => event.slug);
}

export function getEventCategories(): Kategori[] {
  const categories = new Map<string, Kategori>();

  for (const event of getPublishedEvents()) {
    categories.set(event.category.id, event.category);
  }

  return Array.from(categories.values());
}

export const eventStatusLabels: Record<
  KegiatanStatus,
  { label: string; variant: "default" | "success" | "warning" | "category" }
> = {
  upcoming: { label: "Akan Datang", variant: "default" },
  ongoing: { label: "Berlangsung", variant: "warning" },
  completed: { label: "Selesai", variant: "category" },
};
