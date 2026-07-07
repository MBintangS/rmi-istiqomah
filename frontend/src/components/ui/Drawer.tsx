"use client";

import { ReactNode, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useBodyScrollLock, useEscapeKey } from "@/hooks/useOverlay";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  const titleId = useId();

  useEscapeKey(onClose, open);
  useBodyScrollLock(open);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-heading/50 backdrop-blur-sm"
        aria-label="Tutup menu"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "drawer-slide-in absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-surface shadow-soft",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
          {title && (
            <h2 id={titleId} className="text-lg font-semibold text-heading">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="ml-auto rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}
