import type { Agenda, Kegiatan } from "@/types";
import { mockCategories } from "./mock-categories";

const thumbs = [
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1542816414-09727d0edc98?w=800&q=80",
  "https://images.unsplash.com/photo-1512385244942-b517a856f2e4?w=800&q=80",
];

export const mockEvents: Kegiatan[] = [
  {
    id: "evt-1",
    title: "Peringatan Isra Miraj",
    slug: "peringatan-isra-miraj-2026",
    description:
      "Acara peringatan Isra Miraj dengan tausiyah, sholawat, dan doa bersama jamaah.",
    dateStart: "2026-08-15T00:00:00.000Z",
    time: "19:30",
    location: "Masjid Istiqomah",
    category: mockCategories.besar,
    thumbnail: thumbs[0],
    status: "upcoming",
    isPublished: true,
    createdAt: "2026-06-01T08:00:00.000Z",
  },
  {
    id: "evt-2",
    title: "Maulid Nabi Muhammad SAW",
    slug: "maulid-nabi-2026",
    description: "Peringatan Maulid Nabi dengan pembacaan maulid, ceramah, dan santunan.",
    dateStart: "2026-09-05T00:00:00.000Z",
    time: "08:00",
    location: "Aula Masjid Istiqomah",
    category: mockCategories.besar,
    thumbnail: thumbs[1],
    status: "upcoming",
    isPublished: true,
    createdAt: "2026-06-01T08:00:00.000Z",
  },
  {
    id: "evt-3",
    title: "Sanlat RMI - Pesantren Kilat",
    slug: "sanlat-rmi-2026",
    description: "Program pesantren kilat 3 hari 2 malam untuk remaja putra dan putri.",
    dateStart: "2026-12-20T00:00:00.000Z",
    dateEnd: "2026-12-22T00:00:00.000Z",
    time: "07:00",
    location: "Masjid Istiqomah",
    category: mockCategories.besar,
    thumbnail: thumbs[2],
    status: "upcoming",
    isPublished: true,
    createdAt: "2026-06-15T08:00:00.000Z",
  },
  {
    id: "evt-4",
    title: "Kajian Ahad Pagi",
    slug: "kajian-ahad-pagi",
    description: "Kajian rutin setiap Ahad pagi membahas tema keislaman kontemporer.",
    dateStart: "2026-07-13T00:00:00.000Z",
    time: "06:30",
    location: "Masjid Istiqomah",
    category: mockCategories.rutin,
    thumbnail: thumbs[3],
    status: "upcoming",
    isPublished: true,
    createdAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "evt-5",
    title: "Bakti Sosial Ramadhan",
    slug: "bakti-sosial-ramadhan-2026",
    description: "Kegiatan berbagi takjil dan paket sembako untuk masyarakat sekitar masjid.",
    dateStart: "2026-03-10T00:00:00.000Z",
    time: "15:00",
    location: "Lingkungan Masjid Istiqomah",
    category: mockCategories.rutin,
    thumbnail: thumbs[4],
    status: "completed",
    isPublished: true,
    createdAt: "2026-02-01T08:00:00.000Z",
  },
];

export const mockAgenda: Agenda[] = mockEvents
  .filter((e) => e.status === "upcoming")
  .slice(0, 5)
  .map((event) => ({
    id: `agd-${event.id}`,
    title: event.title,
    date: event.dateStart,
    time: event.time,
    location: event.location,
    description: event.description,
    eventId: event.id,
    isPublished: true,
    createdAt: event.createdAt,
  }));
