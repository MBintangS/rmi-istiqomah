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

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-caption font-medium text-foreground/70">Bagikan:</span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-caption inline-flex items-center gap-2 rounded-rmi border border-foreground/20 bg-surface px-3 py-1.5 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        aria-disabled={!whatsappUrl}
      >
        WhatsApp
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-caption inline-flex items-center gap-2 rounded-rmi border border-foreground/20 bg-surface px-3 py-1.5 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        aria-disabled={!facebookUrl}
      >
        Facebook
      </a>
    </div>
  );
}
