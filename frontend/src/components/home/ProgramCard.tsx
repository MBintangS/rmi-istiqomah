import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/types";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <Link
      href={`/program/${program.slug}`}
      className={cn(
        "group block overflow-hidden rounded-rmi bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={program.image}
          alt={program.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-heading transition-colors group-hover:text-primary">
          {program.name}
        </h3>
        <p className="text-body line-clamp-2 text-foreground/80">{program.description}</p>
        <span className="text-caption inline-flex items-center font-medium text-primary">
          Lihat detail
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
