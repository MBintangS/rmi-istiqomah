"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Select } from "@/components/ui";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { FlatGalleryItem } from "@/lib/gallery";

interface GalleryGridProps {
  items: FlatGalleryItem[];
  categories: { value: string; label: string }[];
  events: { value: string; label: string }[];
}

export function GalleryGrid({ items, categories, events }: GalleryGridProps) {
  const [category, setCategory] = useState("");
  const [eventId, setEventId] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = !category || item.category === category;
      const matchesEvent = !eventId || item.eventId === eventId;

      return matchesCategory && matchesEvent;
    });
  }, [items, category, eventId]);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="sm:w-56"
          aria-label="Filter kategori galeri"
        >
          <option value="">Semua kategori</option>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>

        <Select
          value={eventId}
          onChange={(event) => setEventId(event.target.value)}
          className="sm:w-64"
          aria-label="Filter kegiatan"
        >
          <option value="">Semua kegiatan</option>
          {events.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-rmi shadow-soft"
              aria-label={`Buka foto: ${item.caption}`}
            >
              <Image
                src={item.url}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-heading/0 transition-colors group-hover:bg-heading/20" />
              <span className="text-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-heading/80 to-transparent p-3 text-left text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-body rounded-rmi border border-dashed border-foreground/20 bg-surface p-8 text-center text-foreground/70">
          Tidak ada foto yang cocok dengan filter.
        </p>
      )}

      {activeIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  );
}
