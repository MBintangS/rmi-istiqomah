"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useBodyScrollLock, useEscapeKey } from "@/hooks/useOverlay";
import type { FlatGalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  items: FlatGalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  useEscapeKey(onClose, Boolean(item));
  useBodyScrollLock(Boolean(item));

  if (!item || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-heading/95">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-caption truncate pr-4">
          {item.caption}
          <span className="ml-2 text-white/60">
            ({activeIndex + 1}/{items.length})
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup lightbox"
          className="shrink-0 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
        />

        {hasPrev && (
          <button
            type="button"
            onClick={() => onNavigate(activeIndex - 1)}
            className="relative z-10 mr-2 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:inline-flex"
            aria-label="Foto sebelumnya"
          >
            ←
          </button>
        )}

        <div className="relative z-10 h-full max-h-[75vh] w-full max-w-5xl">
          <Image
            src={item.url}
            alt={item.caption}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {hasNext && (
          <button
            type="button"
            onClick={() => onNavigate(activeIndex + 1)}
            className="relative z-10 ml-2 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:inline-flex"
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
          onClick={() => onNavigate(activeIndex - 1)}
          className={cn(
            "text-caption rounded-rmi px-4 py-2 font-medium text-white",
            hasPrev ? "bg-white/10" : "cursor-not-allowed opacity-40",
          )}
        >
          Sebelumnya
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={() => onNavigate(activeIndex + 1)}
          className={cn(
            "text-caption rounded-rmi px-4 py-2 font-medium text-white",
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
