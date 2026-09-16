import type { DoaItem } from "@/types/api";

export function filterDoaItems(
  items: DoaItem[],
  options: { group?: string; tag?: string; query?: string },
): DoaItem[] {
  const needle = options.query?.trim().toLowerCase() ?? "";
  return items.filter((item) => {
    if (options.group && item.group !== options.group) return false;
    if (options.tag && !item.tags.includes(options.tag)) return false;
    if (!needle) return true;
    const haystack =
      `${item.name} ${item.group} ${item.latin} ${item.translation} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(needle);
  });
}

export function suggestDoaId(items: DoaItem[], now = new Date()): number | null {
  if (!items.length) return null;

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      hour12: false,
    }).format(now),
  );

  const byTag = (tag: string) => items.find((item) => item.tags.includes(tag));
  const byGroup = (fragment: string) =>
    items.find((item) => item.group.toLowerCase().includes(fragment.toLowerCase()));

  if (hour >= 20 || hour < 5) {
    return byTag("tidur")?.id ?? byGroup("Tidur")?.id ?? items[0].id;
  }
  if (hour >= 5 && hour < 12) {
    return byGroup("Adzan")?.id ?? byTag("wudhu")?.id ?? byGroup("Ilmu")?.id ?? items[0].id;
  }
  return byGroup("Ilmu")?.id ?? items[0].id;
}
