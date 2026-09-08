import { cn } from "@/lib/utils";

interface JejakLineProps {
  className?: string;
}

/** Horizontal jejak RMI: diamond nodes on a gold-to-green rail. */
export function JejakLine({ className }: JejakLineProps) {
  return (
    <div className={cn("flex items-center", className)} aria-hidden="true">
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary" />
      <span className="h-px min-w-[2.5rem] flex-1 bg-gradient-to-r from-secondary via-primary/35 to-transparent" />
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-secondary bg-background" />
      <span className="h-px w-8 bg-primary/20" />
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-primary/40 bg-background" />
    </div>
  );
}
