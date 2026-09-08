import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 rounded-rmi border border-foreground/10 bg-surface p-3 sm:flex-row sm:items-center sm:p-4",
          className,
        )}
      >
        <span
          className="hidden h-2 w-2 shrink-0 rotate-45 bg-secondary sm:block"
          aria-hidden="true"
        />
        {children}
      </div>
    );
  },
);
