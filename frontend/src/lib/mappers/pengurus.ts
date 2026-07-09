import type { PengurusListItem } from "@/types/api";
import type { Pengurus } from "@/types";

export function mapPengurusListItem(item: PengurusListItem): Pengurus {
  return {
    id: item.id,
    name: item.name,
    position: item.position,
    photo: item.photo ?? undefined,
    period: item.period ?? "",
    order: item.order,
    isActive: item.isActive,
  };
}
