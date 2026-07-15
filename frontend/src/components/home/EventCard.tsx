import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Kegiatan } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatEventDate, formatEventDateParts } from "@/lib/format-date";
import { eventStatusLabels } from "@/lib/events";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Kegiatan;
  className?: string;
  /** grid = 2 kolom (default); list = 1 baris dengan thumbnail kiri */
  variant?: "grid" | "list";
}

export function EventCard({ event, className, variant = "grid" }: EventCardProps) {
  const { day, month } = formatEventDateParts(event.dateStart);
  const formattedDate = formatEventDate(event.dateStart);
  const status = eventStatusLabels[event.status];
  const thumbnail = event.thumbnail || PLACEHOLDER_IMAGE;

  if (variant === "list") {
    return (
      <Link
        href={`/kegiatan/${event.slug}`}
        className={cn(
          "group flex gap-4 overflow-hidden rounded-rmi border border-foreground/10 bg-surface shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:gap-5",
          className,
        )}
      >
        <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-primary/10 sm:aspect-[16/11] sm:w-48 md:w-56">
          <Image
            src={thumbnail}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 112px, 224px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-3 pr-3 sm:gap-2 sm:py-4 sm:pr-5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant="category">{event.category.name}</Badge>
          </div>
          <h3 className="text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary sm:text-lg">
            {event.title}
          </h3>
          <time className="text-caption text-foreground/70" dateTime={event.dateStart}>
            {formattedDate}
          </time>
          <p className="text-body line-clamp-1 text-foreground/70">
            {event.time && <span>{event.time}</span>}
            {event.time && event.location && <span aria-hidden="true"> · </span>}
            <span className="break-words">{event.location}</span>
          </p>
        </div>

        <span
          className="text-caption hidden shrink-0 self-center pr-5 font-medium text-primary sm:inline-flex sm:items-center"
          aria-hidden="true"
        >
          Detail
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/kegiatan/${event.slug}`}
      className={cn(
        "group flex gap-4 rounded-rmi border border-foreground/10 bg-surface p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:gap-5 sm:p-5",
        className,
      )}
    >
      <div
        className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-rmi bg-primary text-white sm:h-[4.5rem] sm:w-[4.5rem]"
        aria-hidden="true"
      >
        <span className="font-display text-lg font-bold leading-none sm:text-2xl">{day}</span>
        <span className="text-caption mt-0.5 font-medium uppercase">{month}</span>
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
          <Badge variant="category">{event.category.name}</Badge>
        </div>
        <h3 className="text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary sm:text-lg">
          {event.title}
        </h3>
        <time className="text-caption text-foreground/70" dateTime={event.dateStart}>
          {formattedDate}
        </time>
        <p className="text-body text-foreground/70">
          {event.time && <span>{event.time}</span>}
          {event.time && event.location && <span aria-hidden="true"> · </span>}
          <span className="break-words">{event.location}</span>
        </p>
      </div>

      <span
        className="text-caption hidden shrink-0 self-center font-medium text-primary sm:inline-flex sm:items-center"
        aria-hidden="true"
      >
        Detail
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
