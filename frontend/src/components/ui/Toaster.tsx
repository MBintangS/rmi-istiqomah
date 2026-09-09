"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgb(var(--color-surface))",
          color: "rgb(var(--color-foreground))",
          borderRadius: "0.75rem",
          border: "1px solid rgb(var(--color-foreground) / 0.12)",
          boxShadow: "var(--shadow-soft)",
        },
        success: {
          iconTheme: {
            primary: "rgb(var(--color-primary))",
            secondary: "rgb(var(--color-surface))",
          },
        },
        error: {
          iconTheme: {
            primary: "rgb(var(--color-error))",
            secondary: "rgb(var(--color-surface))",
          },
        },
      }}
    />
  );
}
