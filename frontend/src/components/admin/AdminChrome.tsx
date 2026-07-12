import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPanelProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md";
}

const paddingStyles = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5",
} as const;

const panelSurface =
  "rounded-rmi border border-foreground/10 bg-background shadow-[0_1px_2px_rgba(20,32,10,0.04)]";

/** Dense surface for toolbars, forms, and content blocks */
export function AdminPanel({ children, className, padding = "md" }: AdminPanelProps) {
  return (
    <div className={cn(panelSurface, paddingStyles[padding], className)}>{children}</div>
  );
}

interface AdminDataTableProps {
  children: ReactNode;
  className?: string;
}

/** Shared table chrome for all CMS list modules */
export function AdminDataTable({ children, className }: AdminDataTableProps) {
  return (
    <div className={cn("overflow-x-auto", panelSurface, className)}>
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="sticky top-0 z-10 border-b border-foreground/10 bg-surface/90 text-[11px] font-medium uppercase tracking-wide text-foreground/55 backdrop-blur-sm">
      {children}
    </thead>
  );
}

export function AdminToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        panelSurface,
        "flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Standard form card used by create/edit modules */
export function AdminFormShell({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        panelSurface,
        "space-y-5 p-4 sm:p-5",
        narrow && "mx-auto max-w-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
