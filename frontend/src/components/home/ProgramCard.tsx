import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/types";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: Program;
  className?: string;
  featured?: boolean;
}

export function ProgramCard({ program, className, featured = false }: ProgramCardProps) {
  return (
    <Link
      href={`/program/${program.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-rmi bg-heading text-white",
        featured ? "min-h-[22rem] sm:min-h-[28rem]" : "min-h-[18rem] sm:min-h-[20rem]",
        className,
      )}
    >
      <Image
        src={program.image}
        alt={program.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 55vw"
            : "(max-width: 1024px) 100vw, 33vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-heading/95 via-heading/40 to-heading/10" />
      <div className={cn("absolute inset-x-0 bottom-0 space-y-2 p-5 sm:p-6", featured && "sm:p-8")}>
        <h3
          className={cn(
            "font-display font-bold tracking-tight text-white transition-colors group-hover:text-secondary",
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {program.name}
        </h3>
        <p className={cn("text-body text-white/80", featured ? "line-clamp-3 max-w-md" : "line-clamp-2 text-sm")}>
          {program.description}
        </p>
        <span className="text-caption inline-flex items-center font-medium text-secondary">
          Lihat detail
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
