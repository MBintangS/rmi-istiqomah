import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SkeletonVariant = "bar" | "text" | "card";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  lines?: number;
}

function SkeletonBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-4 animate-pulse rounded-md bg-foreground/10", className)}
      {...props}
    />
  );
}

export function Skeleton({ variant = "bar", lines = 3, className, ...props }: SkeletonProps) {
  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonBar
            key={index}
            className={cn(index === lines - 1 && lines > 1 ? "w-4/5" : "w-full")}
          />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn("overflow-hidden rounded-rmi bg-surface shadow-soft", className)}
        {...props}
      >
        <div className="aspect-video animate-pulse bg-foreground/10" />
        <div className="space-y-3 p-5">
          <SkeletonBar className="h-5 w-2/3" />
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  return <SkeletonBar className={className} {...props} />;
}

export interface SkeletonListProps {
  count?: number;
  className?: string;
}

export function SkeletonList({ count = 3, className }: SkeletonListProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} variant="card" />
      ))}
    </div>
  );
}
