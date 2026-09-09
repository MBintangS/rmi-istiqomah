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
  /** grid = photo + date stamp (default); list = thumbnail row */
  variant?: "grid" | "list";
  compact?: boolean;
}

export function EventCard({ event, className, variant = "grid", compact = false }: EventCardProps) {
  const { day, month } = formatEventDateParts(event.dateStart);
  const status = eventStatusLabels[event.status];
  const thumbnail = event.thumbnail || PLACEHOLDER_IMAGE;

  if (variant === "list") {
    const formattedDate = formatEventDate(event.dateStart);
    return (
      <Link
        href={`/kegiatan/${event.slug}`}
        className={cn(
          "group flex gap-4 overflow-hidden rounded-rmi border border-foreground/10 bg-surface transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
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
          <time
            dateTime={event.dateStart}
            className="absolute left-2 top-2 flex h-11 w-11 flex-col items-center justify-center rounded-rmi bg-background/95 text-heading shadow-soft sm:h-12 sm:w-12"
          >
            <span className="font-display text-sm font-bold leading-none sm:text-base">{day}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide">{month}</span>
          </time>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-3 pr-3 sm:gap-2 sm:py-4 sm:pr-5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant="category">{event.category.name}</Badge>
          </div>
          <h3 className="text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary sm:text-lg">
            {event.title}
          </h3>
          <p className="text-body line-clamp-1 text-foreground/70">
            {event.time && <span>{event.time}</span>}
            {event.time && event.location && <span aria-hidden="true"> · </span>}
            <span className="break-words">{event.location}</span>
          </p>
          <time className="text-caption text-foreground/70" dateTime={event.dateStart}>
            {formattedDate}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/kegiatan/${event.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-rmi border border-foreground/10 bg-surface transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-primary/10", compact ? "aspect-[3/1]" : "aspect-[16/11]")}>
        <Image
          src={thumbnail}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={compact ? "(max-width: 640px) 70vw, (max-width: 768px) 50vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
        />
        <time
          dateTime={event.dateStart}
          className={cn(
            "absolute flex flex-col items-center justify-center rounded-rmi bg-background text-heading shadow-soft",
            compact ? "bottom-2 left-2 h-10 w-10" : "bottom-3 left-3 h-14 w-14",
          )}
        >
          <span className={cn("font-display font-bold leading-none", compact ? "text-sm" : "text-xl")}>{day}</span>
          <span className={cn("font-medium uppercase", compact ? "text-[10px]" : "text-caption mt-0.5")}>{month}</span>
        </time>
      </div>

      <div className={cn("flex flex-1 flex-col", compact ? "gap-1.5 p-3" : "gap-2 p-4 sm:p-5")}>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
          <Badge variant="category">{event.category.name}</Badge>
        </div>
        <h3
          className={cn(
            "font-semibold leading-snug text-heading transition-colors group-hover:text-primary",
            compact ? "line-clamp-2 text-sm" : "text-base sm:text-lg",
          )}
        >
          {event.title}
        </h3>
        <p className={cn("text-foreground/70", compact ? "text-caption line-clamp-1" : "text-body")}>
          {event.time && <span>{event.time}</span>}
          {event.time && event.location && <span aria-hidden="true"> · </span>}
          <span className="break-words">{event.location}</span>
        </p>
      </div>
    </Link>
  );
}
