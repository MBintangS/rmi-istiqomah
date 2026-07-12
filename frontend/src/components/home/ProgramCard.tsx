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
        featured ? "min-h-[22rem] sm:min-h-[28rem]" : "min-h-[18rem] sm:min-h-[20rem]",
        className,
      )}
    >
      <Image
        src={program.image || PLACEHOLDER_IMAGE}
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
    </Link>
  );
}
