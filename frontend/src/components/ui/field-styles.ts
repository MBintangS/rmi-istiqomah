import { cn } from "@/lib/utils";

export const fieldBaseClass =
  "w-full rounded-rmi border bg-white px-4 py-2.5 text-body text-foreground placeholder:text-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function fieldStateClass(error?: boolean) {
  return cn(
    error ? "border-red-500 focus-visible:ring-red-500" : "border-foreground/20 focus-visible:ring-primary",
  );
}
