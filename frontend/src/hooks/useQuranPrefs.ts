"use client";

import { useEffect, useState } from "react";
import { DEFAULT_QARI_ID } from "@/lib/quran";

const STORAGE_KEY = "rmi-quran-prefs";

export interface QuranPrefs {
  showLatin: boolean;
  showTranslation: boolean;
  qariId: string;
}

const DEFAULT_PREFS: QuranPrefs = {
  showLatin: false,
  showTranslation: true,
  qariId: DEFAULT_QARI_ID,
};

function readPrefs(): QuranPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<QuranPrefs>;
    return {
      showLatin: Boolean(parsed.showLatin),
      showTranslation: parsed.showTranslation !== false,
      qariId: typeof parsed.qariId === "string" && parsed.qariId ? parsed.qariId : DEFAULT_QARI_ID,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function useQuranPrefs() {
  const [prefs, setPrefs] = useState<QuranPrefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPrefs(readPrefs());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs, ready]);

  return { prefs, setPrefs };
}
