import type { Types } from "mongoose";
import type { IAgenda } from "../models/Agenda.model";

interface PopulatedEvent {
  _id: Types.ObjectId;
  title: string;
  slug: string;
}

type PopulatedAgenda = IAgenda & {
  _id: Types.ObjectId;
  eventId?: PopulatedEvent | Types.ObjectId;
};

function formatEvent(event: PopulatedAgenda["eventId"]) {
  if (!event || typeof event === "string" || !("title" in event)) {
    return null;
  }

  return {
    id: event._id.toString(),
    title: event.title,
    slug: event.slug,
  };
}

export function formatAgenda(agenda: PopulatedAgenda) {
  return {
    id: agenda._id.toString(),
    title: agenda.title,
    date: agenda.date,
    time: agenda.time ?? null,
    location: agenda.location ?? null,
    description: agenda.description ?? null,
    isPublished: agenda.isPublished,
    event: formatEvent(agenda.eventId),
    createdAt: agenda.createdAt,
    updatedAt: agenda.updatedAt,
  };
}
