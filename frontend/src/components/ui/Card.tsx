import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  image?: {
    src: string;
    alt: string;
  };
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export function Card({
  className,
  image,
  title,
  description,
  footer,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-rmi bg-surface shadow-soft transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    >
      {image && (
        <div className="relative aspect-video w-full">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      )}

      <div className="space-y-3 p-5">
        {title && <h3 className="text-lg font-semibold text-heading">{title}</h3>}
        {description && <p className="text-body text-foreground/80">{description}</p>}
        {children}
      </div>

      {footer && <div className="border-t border-foreground/10 px-5 py-4">{footer}</div>}
    </div>
  );
}
