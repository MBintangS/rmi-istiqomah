import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { fieldBaseClass, fieldStateClass } from "./field-styles";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(fieldBaseClass, fieldStateClass(error), className)}
        aria-invalid={error || undefined}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
