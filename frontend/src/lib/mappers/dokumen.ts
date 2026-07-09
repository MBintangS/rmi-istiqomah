import type { DokumenListItem } from "@/types/api";
import type { Dokumen } from "@/types";

export function mapDokumenListItem(item: DokumenListItem): Dokumen {
  return {
    id: item.id,
    name: item.name,
    fileUrl: item.fileUrl,
    fileSize: item.fileSize ?? 0,
    fileType: item.fileType ?? "file",
    category: item.category ?? "Umum",
    description: item.description ?? "",
    isPublished: item.isPublished,
    createdAt: item.createdAt,
  };
}
