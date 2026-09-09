"use client";

import { useEffect } from "react";
import { applyThemeClass } from "@/lib/theme";

/** Admin stays light even if the visitor just left a dark public page. */
export function AdminThemeReset() {
  useEffect(() => {
    applyThemeClass("light");
  }, []);

  return null;
}
