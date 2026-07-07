import { Kategori } from "./artikel";

export type KegiatanStatus = "upcoming" | "ongoing" | "completed";

export interface Kegiatan {
  id: string;
  title: string;
  slug: string;
  description: string;
  dateStart: string;
  dateEnd?: string;
  time?: string;
  location: string;
  locationMap?: string;
  category: Kategori;
  thumbnail: string;
  status: KegiatanStatus;
  isPublished: boolean;
  createdAt: string;
}

export interface Agenda {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  eventId?: string;
  isPublished: boolean;
  createdAt: string;
}
