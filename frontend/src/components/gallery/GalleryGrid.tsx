"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EmptyState, FilterBar, Select } from "@/components/ui";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { FlatGalleryItem } from "@/lib/gallery";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  items: FlatGalleryItem[];
  categories: { value: string; label: string }[];
  events: { value: string; label: string }[];
}

export function GalleryGrid({ items, categories, events }: GalleryGridProps) {
  const [category, setCategory] = useState("");
  const [eventId, setEventId] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

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
      <FilterBar>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="sm:flex-1 sm:max-w-xs"
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
          className="sm:flex-1 sm:max-w-sm"
          aria-label="Filter kegiatan"
        >
          <option value="">Semua kegiatan</option>
          {events.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </FilterBar>

      {filteredItems.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={reduce ? undefined : staggerContainer}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={reduce ? undefined : staggerItem}
              className={cn(index === 0 && "col-span-2 row-span-2")}
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className={cn(
                  "group relative block w-full cursor-pointer overflow-hidden rounded-rmi bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  index === 0 ? "aspect-[4/3] h-full min-h-[14rem] md:aspect-auto" : "aspect-square",
                )}
                aria-label={`Buka foto: ${item.caption}`}
              >
                <Image
                  src={item.url || PLACEHOLDER_IMAGE}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  loading="lazy"
                />
                {item.caption ? (
                  <span className="absolute inset-x-0 bottom-0 bg-heading/70 p-2.5 text-left text-xs leading-snug text-white sm:p-3 sm:text-sm">
                    {item.caption}
                  </span>
                ) : null}
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          title="Tidak ada foto"
          description="Tidak ada foto yang cocok dengan filter."
        />
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
