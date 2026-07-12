"use client";

import { ReactNode, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "@/hooks/useOverlay";

export interface ModalProps {
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
      width="18"
      height="18"
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

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose, open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="modal-backdrop absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Tutup dialog"
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "modal-panel relative z-10 flex max-h-[min(92dvh,40rem)] w-full flex-col overflow-hidden rounded-t-2xl border border-foreground/10 bg-background shadow-[0_24px_64px_rgba(20,32,10,0.18)] sm:max-w-md sm:rounded-rmi",
          className,
        )}
      >
        <div className="flex shrink-0 items-start gap-3 border-b border-foreground/10 px-5 py-4 sm:px-6">
          {title ? (
            <h2
              id={titleId}
              className="min-w-0 flex-1 pt-0.5 font-display text-base font-semibold tracking-tight text-heading sm:text-lg"
            >
              {title}
            </h2>
          ) : (
            <span className="flex-1" />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-foreground/55 transition-colors hover:bg-surface hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
