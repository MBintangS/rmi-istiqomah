import type { PermainanInfo, PermainanSlug } from "@/types/permainan";

export const PERMAINAN_CATALOG: PermainanInfo[] = [
  {
    slug: "kenal-hijaiyah",
    title: "Kenal Hijaiyah",
    summary: "Lihat hurufnya, lalu pilih cara bacanya.",
    skill: "Mengenal huruf dan cara bacanya",
    lanes: ["mudah"],
    minutes: 3,
  },
  {
    slug: "urutan-wudu",
    title: "Urutan Wudu",
    summary: "Susun langkah wudu dari awal sampai akhir.",
    skill: "Tata cara wudu",
    lanes: ["mudah", "sedang"],
    minutes: 4,
  },
  {
    slug: "kuis-lima-menit",
    title: "Kuis 5 Menit",
    summary: "Lima soal rukun, sholat, nabi, dan Al-Qur'an.",
    skill: "Pengetahuan dasar Islam",
    lanes: ["sedang", "sulit"],
    minutes: 5,
  },
  {
    slug: "cari-kata",
    title: "Cari Kata",
    summary: "Tarik huruf dari awal kata sampai akhir.",
    skill: "Kosakata Islami",
    lanes: ["mudah", "sedang", "sulit"],
    minutes: 5,
  },
  {
    slug: "cocok-asmaul-husna",
    title: "Cocok Asmaul Husna",
    summary: "Buka dua kartu, pasangkan nama Allah dengan artinya.",
    skill: "Asmaul Husna",
    lanes: ["mudah", "sedang", "sulit"],
    minutes: 5,
  },
  {
    slug: "kasus-akhlak",
    title: "Kasus Akhlak",
    summary: "Pilih sikap terbaik di sekolah, rumah, dan media sosial.",
    skill: "Akhlak sehari-hari",
    lanes: ["sulit"],
    minutes: 6,
  },
];

export function getPermainan(slug: string): PermainanInfo | undefined {
  return PERMAINAN_CATALOG.find((item) => item.slug === (slug as PermainanSlug));
}
