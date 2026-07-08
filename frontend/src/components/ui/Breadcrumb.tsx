import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-caption text-foreground/60 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 max-w-full items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="shrink-0 text-foreground/30">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="shrink-0 transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="min-w-0 truncate font-medium text-foreground"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
