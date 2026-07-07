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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary/60"
      aria-hidden="true"
    >
      <path d="M4 22h16" />
      <path d="M6 18V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
    </svg>
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
        "flex flex-col items-center justify-center rounded-rmi bg-surface px-6 py-12 text-center shadow-soft",
        className,
      )}
    >
      <div className="mb-4">{icon ?? <DefaultIcon />}</div>
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
