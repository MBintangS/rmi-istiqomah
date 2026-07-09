import type { AgendaListItem } from "@/types/api";
import type { Agenda } from "@/types";

export function mapAgendaListItem(item: AgendaListItem): Agenda {
  return {
    id: item.id,
    title: item.title,
    date: item.date,
    time: item.time ?? undefined,
    location: item.location ?? "",
    description: item.description ?? "",
    eventId: item.event?.id,
    isPublished: item.isPublished,
    createdAt: item.createdAt,
  };
}
