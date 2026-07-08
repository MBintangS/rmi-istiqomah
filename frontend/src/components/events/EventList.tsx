"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/home/EventCard";
import { Input, Select } from "@/components/ui";
import type { Kegiatan, Kategori } from "@/types";

interface EventListProps {
  events: Kegiatan[];
  categories: Kategori[];
}

export function EventList({ events, categories }: EventListProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory = !categoryId || event.category.id === categoryId;
      const matchesSearch = !query || event.title.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, categoryId, search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="search"
          placeholder="Cari nama kegiatan..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:flex-1"
          aria-label="Cari kegiatan"
        />

        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="sm:w-56"
          aria-label="Filter kategori"
        >
          <option value="">Semua kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-body rounded-rmi border border-dashed border-foreground/20 bg-surface p-8 text-center text-foreground/70">
          Tidak ada kegiatan yang cocok dengan pencarian atau filter.
        </p>
      )}
    </div>
  );
}
