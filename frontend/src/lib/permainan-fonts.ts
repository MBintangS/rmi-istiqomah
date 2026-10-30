import { Amiri, Fredoka } from "next/font/google";

/** Rounded display face, scoped to /permainan so other pages don't load it. */
export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-play",
  display: "swap",
});

export const amiriPlay = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});
