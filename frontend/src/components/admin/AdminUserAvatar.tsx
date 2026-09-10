"use client";

import { cn } from "@/lib/utils";

interface AdminUserAvatarProps {
  name: string;
  avatar?: string | null;
  size?: number;
  className?: string;
}

export function AdminUserAvatar({
  name,
  avatar,
  size = 32,
  className,
}: AdminUserAvatarProps) {
  const initial = (name || "A").charAt(0).toUpperCase();
  const photo = avatar?.trim() || "";

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full bg-primary/10 text-xs font-semibold text-primary",
        className,
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden="true"
    >
      {photo ? (
        // Cloudinary user uploads — native img avoids next/image size/optimizer issues in tiny circles.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center">{initial}</span>
      )}
    </span>
  );
}
