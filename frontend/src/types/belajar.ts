export type Harakat = "fathah" | "kasrah" | "dhammah";

export interface HurufBelajar {
  glyph: string;
  name: string;
  /** Cara baca dengan fathah, kasrah, dan dhammah. */
  bacaan: Record<Harakat, string>;
  /** Petunjuk makhraj untuk huruf yang bunyinya tidak ada di bahasa Indonesia. */
  tip?: string;
}

export interface LangkahWuduBelajar {
  id: string;
  label: string;
  detail: string;
  hukum: string;
  fardu: boolean;
  kali?: string;
}

export interface AsmaulHusna {
  nomor: number;
  arab: string;
  latin: string;
  arti: string;
}

export interface TopikBelajar {
  slug: "huruf-hijaiyah" | "tata-cara-wudu" | "asmaul-husna";
  title: string;
  summary: string;
}
