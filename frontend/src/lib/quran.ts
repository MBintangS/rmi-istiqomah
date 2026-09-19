import type { QuranRevelationPlace, QuranSuratSummary } from "@/types/api";

export const DEFAULT_QARI_ID = "05";

export function suratPlaceLabel(place: QuranRevelationPlace): "Makkiyah" | "Madaniyah" {
  return place === "Mekah" ? "Makkiyah" : "Madaniyah";
}

export function filterQuranSurat(
  items: QuranSuratSummary[],
  options: { query?: string; place?: QuranRevelationPlace | "" },
): QuranSuratSummary[] {
  const needle = options.query?.trim().toLowerCase() ?? "";
  return items.filter((item) => {
    if (options.place && item.revelationPlace !== options.place) return false;
    if (!needle) return true;
    const haystack =
      `${item.number} ${item.nameLatin} ${item.nameArabic} ${item.meaning}`.toLowerCase();
    return haystack.includes(needle);
  });
}
