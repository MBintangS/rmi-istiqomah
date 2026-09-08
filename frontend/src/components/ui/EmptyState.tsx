import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

function DefaultIcon() {
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center" aria-hidden="true">
      <span className="absolute h-10 w-10 rotate-45 border border-primary/25" />
      <span className="h-2.5 w-2.5 rotate-45 bg-secondary" />
    </span>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-rmi border border-foreground/10 bg-surface px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-5">{icon ?? <DefaultIcon />}</div>
      <h3 className="text-lg font-semibold text-heading">{title}</h3>
      {description && (
        <p className="text-body mt-2 max-w-sm text-foreground/70">{description}</p>
      )}
      {action ??
        (actionLabel && onAction ? (
          <Button className="mt-6" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : actionLabel ? (
          <Button className="mt-6">{actionLabel}</Button>
        ) : null)}
    </div>
  );
}
