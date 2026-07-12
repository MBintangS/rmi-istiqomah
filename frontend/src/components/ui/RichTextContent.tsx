import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Shared typography for TipTap / CMS HTML (lists, headings, links). */
export const richTextContentClassName =
  "text-body space-y-4 text-foreground/80 " +
  "[&_a]:text-primary [&_a]:underline " +
  "[&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-heading " +
  "[&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-heading " +
  "[&_img]:rounded-rmi " +
  "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 " +
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 " +
  "[&_li]:pl-0.5 " +
  "[&_p]:leading-relaxed " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/70";

interface RichTextContentProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function RichTextContent({ html, className, ...props }: RichTextContentProps) {
  return (
    <div
      className={cn(richTextContentClassName, className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}
