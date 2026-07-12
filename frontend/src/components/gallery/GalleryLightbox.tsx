"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef } from "react";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "@/hooks/useOverlay";
import type { FlatGalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  items: FlatGalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-heading";

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(item);

  useEscapeKey(onClose, open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) onNavigate(activeIndex - 1);
  }, [activeIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex < items.length - 1) onNavigate(activeIndex + 1);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, goPrev, goNext]);

  if (!item || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-caption truncate pr-4">
          {item.caption}
          <span className="ml-2 text-white/70">
            ({activeIndex + 1}/{items.length})
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup lightbox"
          className={cn(
            "shrink-0 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
            focusRing,
          )}
        >
          ✕
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0"
          aria-label="Tutup lightbox"
          tabIndex={-1}
        />

        {hasPrev && (
          <button
            type="button"
            onClick={goPrev}
            className={cn(
              "relative z-10 mr-2 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:inline-flex",
              focusRing,
            )}
            aria-label="Foto sebelumnya"
          >
            ←
          </button>
        )}

        <div className="relative z-10 h-full max-h-[75vh] w-full max-w-5xl">
          <Image
            src={item.url}
            alt={item.caption || `Foto ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {hasNext && (
          <button
            type="button"
            onClick={goNext}
            className={cn(
              "relative z-10 ml-2 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:inline-flex",
              focusRing,
            )}
            aria-label="Foto berikutnya"
          >
            →
          </button>
        )}
      </div>

      <div className="flex justify-center gap-3 px-4 pb-4 sm:hidden">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={goPrev}
          className={cn(
            "text-caption rounded-rmi px-4 py-2 font-medium text-white",
            focusRing,
            hasPrev ? "bg-white/10" : "cursor-not-allowed opacity-40",
          )}
        >
          Sebelumnya
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={goNext}
          className={cn(
            "text-caption rounded-rmi px-4 py-2 font-medium text-white",
            focusRing,
            hasNext ? "bg-white/10" : "cursor-not-allowed opacity-40",
          )}
        >
          Selanjutnya
        </button>
      </div>
    </div>,
    document.body,
  );
}
