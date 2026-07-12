"use client";

import { ReactNode, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "@/hooks/useOverlay";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Hapus header & padding — konten mengisi panel penuh (mis. sidebar admin). */
  bare?: boolean;
  /** Sisi panel. Default: kanan. */
  side?: "left" | "right";
  contentClassName?: string;
  headerClassName?: string;
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

export function Drawer({
  open,
  onClose,
  title,
  children,
  className,
  bare = false,
  side = "right",
  contentClassName,
  headerClassName,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);

  useEscapeKey(onClose, open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-heading/50 backdrop-blur-sm"
        aria-label="Tutup menu"
        onClick={onClose}
        tabIndex={-1}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Menu"}
        className={cn(
          "absolute top-0 flex h-full w-full max-w-sm flex-col shadow-soft",
          side === "left" ? "drawer-slide-in-left left-0" : "drawer-slide-in right-0",
          bare ? "bg-transparent" : "bg-surface",
          className,
        )}
      >
        {bare ? (
          <div className={cn("relative h-full min-h-0 flex-1", contentClassName)}>{children}</div>
        ) : (
          <>
            <div
              className={cn(
                "flex items-center justify-between border-b border-foreground/10 px-5 py-4",
                headerClassName,
              )}
            >
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

            <div className={cn("flex-1 overflow-y-auto p-5", contentClassName)}>{children}</div>
          </>
        )}
      </aside>
    </div>,
    document.body,
  );
}
