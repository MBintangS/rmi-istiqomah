import Image from "next/image";
import type { Pengurus } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PengurusCardProps {
  pengurus: Pengurus;
  className?: string;
}

export function PengurusCard({ pengurus, className }: PengurusCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-rmi border border-foreground/10 bg-surface",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-primary/10">
        <Image
          src={pengurus.photo || PLACEHOLDER_IMAGE}
          alt={pengurus.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="space-y-1 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-heading">
          {pengurus.name}
        </h3>
        <p className="text-caption font-medium text-primary">{pengurus.position}</p>
        {pengurus.period && (
          <p className="text-caption text-foreground/60">Periode {pengurus.period}</p>
        )}
      </div>
    </article>
  );
}
