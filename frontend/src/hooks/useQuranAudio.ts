"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { QuranAyat } from "@/types/api";

export type QuranPlayTarget = { kind: "surah" } | { kind: "ayah"; number: number };

function sameTarget(a: QuranPlayTarget | null, b: QuranPlayTarget) {
  if (!a || a.kind !== b.kind) return false;
  if (a.kind === "surah" && b.kind === "surah") return true;
  return a.kind === "ayah" && b.kind === "ayah" && a.number === b.number;
}

export function useQuranAudio(
  audioFull: Record<string, string> | undefined,
  verses: QuranAyat[] | undefined,
  qariId: string,
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [target, setTarget] = useState<QuranPlayTarget | null>(null);

  useEffect(() => {
    const element = new Audio();
    element.preload = "none";
    const onEnded = () => {
      setStatus("idle");
      setTarget(null);
    };
    element.addEventListener("ended", onEnded);
    audioRef.current = element;
    return () => {
      element.pause();
      element.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  const resolveSrc = useCallback(
    (next: QuranPlayTarget) => {
      if (next.kind === "surah") return audioFull?.[qariId] ?? "";
      return verses?.find((verse) => verse.number === next.number)?.audio[qariId] ?? "";
    },
    [audioFull, verses, qariId],
  );

  const stop = useCallback(() => {
    const element = audioRef.current;
    if (element) {
      element.pause();
      element.removeAttribute("src");
    }
    setStatus("idle");
    setTarget(null);
  }, []);

  const play = useCallback(
    async (next: QuranPlayTarget) => {
      const element = audioRef.current;
      const src = resolveSrc(next);
      if (!element || !src) return;

      if (sameTarget(target, next) && status === "playing") {
        element.pause();
        setStatus("paused");
        return;
      }

      if (sameTarget(target, next) && status === "paused") {
        try {
          await element.play();
          setStatus("playing");
        } catch {
          setStatus("paused");
        }
        return;
      }

      element.src = src;
      setTarget(next);
      try {
        await element.play();
        setStatus("playing");
      } catch {
        setStatus("paused");
      }
    },
    [resolveSrc, status, target],
  );

  const targetRef = useRef(target);
  const statusRef = useRef(status);
  targetRef.current = target;
  statusRef.current = status;

  useEffect(() => {
    const element = audioRef.current;
    const current = targetRef.current;
    if (!element || !current || statusRef.current === "idle") return;
    const src = resolveSrc(current);
    if (!src) return;
    const resume = statusRef.current === "playing";
    element.src = src;
    if (resume) {
      void element.play().catch(() => {
        setStatus("paused");
      });
    }
  }, [qariId, resolveSrc]);

  return {
    status,
    target,
    play,
    stop,
    isPlaying: (next: QuranPlayTarget) => status === "playing" && sameTarget(target, next),
  };
}
