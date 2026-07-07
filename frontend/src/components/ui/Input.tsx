import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { fieldBaseClass, fieldStateClass } from "./field-styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(fieldBaseClass, fieldStateClass(error), className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
