import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function Spinner({ size = "md", label = "Memuat...", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-primary/20 border-t-primary",
          sizeStyles[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
