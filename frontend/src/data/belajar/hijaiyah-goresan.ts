import bentuk from "@/data/belajar/hijaiyah-goresan.json";

export const GORESAN_VIEWBOX = "0 0 400 400";

export interface HurufGoresan {
  glyph: string;
  path: string;
}

const BENTUK_BY_GLYPH = new Map(bentuk.map((huruf) => [huruf.char, huruf.path]));

export function goresanHuruf(glyph: string): HurufGoresan | undefined {
  const path = BENTUK_BY_GLYPH.get(glyph);
  if (!path) return undefined;
  return { glyph, path };
}
