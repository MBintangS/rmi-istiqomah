"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  path: string;
  className?: string;
}

export function ShareButtons({ title, path, className }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}${path}`);
  }, [path]);

  const whatsappUrl = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`
    : undefined;

  const facebookUrl = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : undefined;

  const linkClass = cn(
    "text-caption inline-flex items-center rounded-full border border-foreground/20 bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    !shareUrl && "pointer-events-none opacity-50",
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-caption font-medium text-foreground/70">Bagikan</span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-disabled={!whatsappUrl}
        tabIndex={whatsappUrl ? undefined : -1}
      >
        WhatsApp
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-disabled={!facebookUrl}
        tabIndex={facebookUrl ? undefined : -1}
      >
        Facebook
      </a>
    </div>
  );
}
