import { type ReactNode } from "react";
import { JejakLine } from "@/components/layout/JejakLine";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  className?: string;
  variant?: "list" | "detail" | "utility";
  meta?: ReactNode;
  actions?: ReactNode;
}

/**
 * Editorial inner-page header. Signature: jejak diamonds, not a green banner.
 */
export function PageHero({
  title,
  description,
  breadcrumb,
  className,
  variant = "list",
  meta,
  actions,
}: PageHeroProps) {
  return (
    <section
      className={cn("page-hero relative border-b border-foreground/10 bg-background", className)}
    >
      <div
        className={cn(
          "relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          variant === "utility" && "py-8 sm:py-10",
          variant === "detail" && "py-8 sm:py-10 lg:py-12",
          variant === "list" && "py-10 sm:py-12 lg:py-14",
        )}
      >
        <Breadcrumb items={breadcrumb} className="mb-6 sm:mb-8" />

        <div className={cn(variant === "detail" ? "max-w-4xl" : "max-w-3xl")}>
          <h1
            className={cn(
              "font-display font-semibold tracking-tight text-heading",
              variant === "detail"
                ? "text-3xl leading-[1.15] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
                : "text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="text-body mt-4 max-w-[48ch] text-foreground/70 sm:mt-5">{description}</p>
          ) : null}
          {meta ? <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div> : null}
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        <JejakLine className="mt-8 max-w-sm sm:mt-10" />
      </div>
    </section>
  );
}
