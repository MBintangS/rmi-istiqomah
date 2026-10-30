import { HURUF_HIJAIYAH } from "@/data/permainan/hijaiyah";
import type { Harakat, HurufBelajar } from "@/types/belajar";

type Bacaan = { bacaan: [string, string, string]; tip?: string };

const BACAAN: Record<string, Bacaan> = {
  "ا": { bacaan: ["a", "i", "u"], tip: "Alif yang berharakat dibaca seperti hamzah, ditulis أ atau إ." },
  "ب": { bacaan: ["ba", "bi", "bu"] },
  "ت": { bacaan: ["ta", "ti", "tu"] },
  "ث": { bacaan: ["tsa", "tsi", "tsu"], tip: "Ujung lidah di antara gigi seri depan, bunyinya mendesis tipis." },
  "ج": { bacaan: ["ja", "ji", "ju"] },
  "ح": { bacaan: ["ha", "hi", "hu"], tip: "Keluar dari tengah tenggorokan, seperti mengeluarkan angin. Lebih berat dari ه." },
  "خ": { bacaan: ["kho", "khi", "khu"], tip: "Keluar dari pangkal tenggorokan, bunyinya agak serak." },
  "د": { bacaan: ["da", "di", "du"] },
  "ذ": { bacaan: ["dza", "dzi", "dzu"], tip: "Ujung lidah di antara gigi seri depan, bunyinya bersuara." },
  "ر": { bacaan: ["ro", "ri", "ru"] },
  "ز": { bacaan: ["za", "zi", "zu"] },
  "س": { bacaan: ["sa", "si", "su"] },
  "ش": { bacaan: ["sya", "syi", "syu"] },
  "ص": { bacaan: ["sho", "shi", "shu"], tip: "Seperti s, tetapi tebal: pangkal lidah terangkat." },
  "ض": { bacaan: ["dho", "dhi", "dhu"], tip: "Tebal, tepi lidah menempel ke geraham atas." },
  "ط": { bacaan: ["tho", "thi", "thu"], tip: "Seperti t, tetapi tebal: pangkal lidah terangkat." },
  "ظ": { bacaan: ["zho", "zhi", "zhu"], tip: "Tebal, ujung lidah di antara gigi seri depan." },
  "ع": { bacaan: ["'a", "'i", "'u"], tip: "Keluar dari tengah tenggorokan, sedikit ditekan." },
  "غ": { bacaan: ["gho", "ghi", "ghu"], tip: "Keluar dari pangkal tenggorokan, seperti bunyi berkumur." },
  "ف": { bacaan: ["fa", "fi", "fu"] },
  "ق": { bacaan: ["qo", "qi", "qu"], tip: "Keluar dari pangkal lidah, lebih dalam dari ك." },
  "ك": { bacaan: ["ka", "ki", "ku"] },
  "ل": { bacaan: ["la", "li", "lu"] },
  "م": { bacaan: ["ma", "mi", "mu"] },
  "ن": { bacaan: ["na", "ni", "nu"] },
  "و": { bacaan: ["wa", "wi", "wu"] },
  "ه": { bacaan: ["ha", "hi", "hu"], tip: "Keluar dari ujung tenggorokan, ringan seperti hembusan napas." },
  "ي": { bacaan: ["ya", "yi", "yu"] },
};

export const HURUF_BELAJAR: HurufBelajar[] = HURUF_HIJAIYAH.map(({ glyph, name }) => {
  const { bacaan, tip } = BACAAN[glyph];
  return { glyph, name, bacaan: { fathah: bacaan[0], kasrah: bacaan[1], dhammah: bacaan[2] }, tip };
});

const TANDA: Record<Harakat, string> = {
  fathah: "\u064E",
  kasrah: "\u0650",
  dhammah: "\u064F",
};

/** Alif tidak bisa diberi harakat langsung, jadi pakai hamzah di atas atau di bawahnya. */
export function hurufBerharakat(glyph: string, harakat: Harakat): string {
  if (glyph === "ا") return (harakat === "kasrah" ? "إ" : "أ") + TANDA[harakat];
  return glyph + TANDA[harakat];
}

export const HARAKAT_INFO: Record<Harakat, { label: string; tanda: string; bunyi: string; letak: string }> = {
  fathah: { label: "Fathah", tanda: "ـَ", bunyi: "a", letak: "Garis miring di atas huruf" },
  kasrah: { label: "Kasrah", tanda: "ـِ", bunyi: "i", letak: "Garis miring di bawah huruf" },
  dhammah: { label: "Dhammah", tanda: "ـُ", bunyi: "u", letak: "Tanda seperti koma di atas huruf" },
};
