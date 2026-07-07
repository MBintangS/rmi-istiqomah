"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#F8FAFC",
          color: "#1F2937",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 20px rgba(35, 48, 10, 0.08)",
        },
        success: {
          iconTheme: {
            primary: "#4e830a",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
