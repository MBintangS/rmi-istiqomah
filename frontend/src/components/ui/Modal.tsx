"use client";

import { ReactNode, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useBodyScrollLock, useEscapeKey } from "@/hooks/useOverlay";

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

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const titleId = useId();

  useEscapeKey(onClose, open);
  useBodyScrollLock(open);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-heading/50 backdrop-blur-sm"
        aria-label="Tutup dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "relative z-10 w-full max-w-md rounded-rmi bg-surface p-6 shadow-soft",
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
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

        {children}
      </div>
    </div>,
    document.body,
  );
}
