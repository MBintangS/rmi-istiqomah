import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-rmi border border-foreground/10 bg-background shadow-[0_1px_2px_rgba(20,32,10,0.04)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary/8 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:py-5">
        <div className="min-w-0 pl-2">
          <h2 className="font-display text-lg font-semibold tracking-tight text-heading sm:text-xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground/60">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2 pl-2 sm:pl-0">
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}
