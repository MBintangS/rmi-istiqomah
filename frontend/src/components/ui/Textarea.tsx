import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { fieldBaseClass, fieldStateClass } from "./field-styles";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(fieldBaseClass, "resize-y min-h-[100px]", fieldStateClass(error), className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
