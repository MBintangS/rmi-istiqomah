"use client";

import { useCallback, useEffect, useState } from "react";
import type { PermainanLane } from "@/types/permainan";

const STORAGE_KEY = "rmi-permainan-v1";

interface PermainanProgress {
  lane: PermainanLane | null;
}

const EMPTY: PermainanProgress = { lane: null };

function readProgress(): PermainanProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<PermainanProgress>;
    const lane =
      parsed.lane === "mudah" || parsed.lane === "sedang" || parsed.lane === "sulit" ? parsed.lane : null;
    return { lane };
  } catch {
    return EMPTY;
  }
}

function writeProgress(next: PermainanProgress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or full storage: progress just won't persist.
  }
}

/** Pilihan level, disimpan hanya di perangkat ini. */
export function usePermainanProgress() {
  const [progress, setProgress] = useState<PermainanProgress>(EMPTY);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const update = useCallback((fn: (prev: PermainanProgress) => PermainanProgress) => {
    setProgress((prev) => {
      const next = fn(prev);
      writeProgress(next);
      return next;
    });
  }, []);

  const setLane = useCallback(
    (lane: PermainanLane | null) => update((prev) => ({ ...prev, lane })),
    [update],
  );

  return { lane: progress.lane, setLane };
}
