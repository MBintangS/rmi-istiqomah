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
