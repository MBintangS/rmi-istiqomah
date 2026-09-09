import { cn } from "@/lib/utils";

export const fieldBaseClass =
  "w-full rounded-rmi border bg-background px-4 py-2.5 text-body text-foreground placeholder:text-foreground/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

export function fieldStateClass(error?: boolean) {
  return cn(
    error ? "border-error focus-visible:ring-error" : "border-foreground/20 focus-visible:ring-primary",
  );
}
