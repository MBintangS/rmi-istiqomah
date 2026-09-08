import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        featured ? "min-h-[22rem] sm:min-h-[28rem]" : "min-h-[16rem] sm:min-h-[18rem]",
        className,
      )}
    >
      <Image
        src={program.image || PLACEHOLDER_IMAGE}
        alt={program.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={
          featured ? "(max-width: 1024px) 100vw, 1152px" : "(max-width: 768px) 100vw, 50vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/40 to-heading/10" />
      <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 sm:space-y-3 sm:p-7">
        <h3
          className={cn(
            "font-display font-bold tracking-tight text-white",
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {program.name}
        </h3>
        <p
          className={cn(
            "text-white/85",
            featured ? "text-body max-w-[48ch]" : "text-caption line-clamp-2",
          )}
        >
          {program.description}
        </p>
        <span className="text-caption inline-flex items-center font-medium text-secondary">
          Lihat program
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
