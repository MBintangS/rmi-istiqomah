import Image from "next/image";
import type { Pengurus } from "@/types";
import { cn } from "@/lib/utils";

interface PengurusCardProps {
  pengurus: Pengurus;
  className?: string;
}

export function PengurusCard({ pengurus, className }: PengurusCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-rmi border border-foreground/10 bg-surface text-center shadow-soft",
        className,
      )}
    >
      <div className="relative mx-auto mt-6 aspect-square w-28 overflow-hidden rounded-full bg-primary/10 sm:w-32">
        {pengurus.photo ? (
          <Image
            src={pengurus.photo}
            alt={pengurus.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">
            {pengurus.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="space-y-1 p-5">
        <h3 className="text-lg font-semibold text-heading">{pengurus.name}</h3>
        <p className="text-caption font-medium text-primary">{pengurus.position}</p>
        <p className="text-caption text-foreground/60">Periode {pengurus.period}</p>
      </div>
    </article>
  );
}
