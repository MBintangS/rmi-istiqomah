import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { TestimoniListItem } from "@/types/api";
import type { Testimoni } from "@/types";

export function mapTestimoniListItem(item: TestimoniListItem): Testimoni {
  return {
    id: item.id,
    name: item.name,
    content: item.content,
    role: item.role ?? "",
    photo: item.photo || PLACEHOLDER_IMAGE,
    order: item.order,
    isActive: item.isActive,
  };
}
