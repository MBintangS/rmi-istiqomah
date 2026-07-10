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

/** Dense surface for toolbars, forms, and content blocks */
export function AdminPanel({ children, className, padding = "md" }: AdminPanelProps) {
  return (
    <div
      className={cn(
        "rounded-rmi border border-foreground/10 bg-background",
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

interface AdminDataTableProps {
  children: ReactNode;
  className?: string;
}

/** Shared table chrome for all CMS list modules */
export function AdminDataTable({ children, className }: AdminDataTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-rmi border border-foreground/10 bg-background",
        className,
      )}
    >
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-foreground/10 bg-surface/80 text-[11px] font-medium uppercase tracking-wide text-foreground/55">
      {children}
    </thead>
  );
}

export function AdminToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-rmi border border-foreground/10 bg-background p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
