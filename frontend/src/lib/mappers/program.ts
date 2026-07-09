import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { ProgramDetail, ProgramListItem } from "@/types/api";
import type { Program } from "@/types";

export function mapProgramListItem(item: ProgramListItem): Program {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description ?? "",
    content: "",
    image: item.image ?? PLACEHOLDER_IMAGE,
    icon: item.icon ?? undefined,
    schedule: [],
    galleryImages: [],
    isActive: item.isActive,
    createdAt: item.createdAt,
  };
}

export function mapProgramDetail(item: ProgramDetail): Program {
  return {
    ...mapProgramListItem(item),
    content: item.content ?? "",
  };
}
