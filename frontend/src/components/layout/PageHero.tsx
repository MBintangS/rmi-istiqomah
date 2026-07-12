import { RmiLogo } from "@/components/brand/RmiLogo";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  className?: string;
}

/**
 * Shared internal-page hero for public routes.
 * Asymmetric stack + brand atmosphere; not a marketing full-bleed hero.
 */
export function PageHero({ title, description, breadcrumb, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "page-hero relative overflow-hidden border-b border-foreground/10 bg-background",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(78,131,10,0.12),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl sm:h-64 sm:w-64"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <Breadcrumb items={breadcrumb} className="mb-6 sm:mb-8" />

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="mb-4 h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
            <h1 className="font-display text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {title}
            </h1>
            <p className="text-body mt-4 max-w-[42ch] text-foreground/70 sm:mt-5 sm:max-w-[48ch]">
              {description}
            </p>
          </div>

          <div className="hidden lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full bg-primary/10 blur-md"
                aria-hidden="true"
              />
              <RmiLogo size={144} className="relative ring-1 ring-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
