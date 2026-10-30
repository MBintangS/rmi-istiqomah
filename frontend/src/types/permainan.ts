export type PermainanLane = "mudah" | "sedang" | "sulit";

export type PermainanSlug =
  | "kenal-hijaiyah"
  | "urutan-wudu"
  | "kuis-lima-menit"
  | "kasus-akhlak"
  | "cari-kata"
  | "cocok-asmaul-husna";

export interface PermainanInfo {
  slug: PermainanSlug;
  title: string;
  summary: string;
  skill: string;
  lanes: PermainanLane[];
  minutes: number;
}

export interface HurufHijaiyah {
  glyph: string;
  name: string;
  /** Huruf yang bentuknya mirip, dipakai sebagai pengecoh di ronde akhir. */
  siblings?: string[];
  /** Rekaman pelafalan. Kosong sampai pengurus punya rekaman yang hak pakainya jelas. */
  audioSrc?: string;
}

export interface LangkahWudu {
  id: string;
  label: string;
}

export interface SoalKuis {
  id: string;
  category: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface PilihanAkhlak {
  text: string;
  best: boolean;
  feedback: string;
}

export interface KasusAkhlak {
  id: string;
  situation: string;
  options: PilihanAkhlak[];
  source: string;
}
