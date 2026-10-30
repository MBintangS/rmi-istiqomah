export interface NavItem {
  label: string;
  href: string;
}

export interface NavItemWithChildren extends NavItem {
  children?: NavItem[];
}

export const mainNavItems: NavItemWithChildren[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  {
    label: "Program",
    href: "/program",
  },
  {
    label: "Ibadah",
    href: "/ibadah",
    children: [
      { label: "Jadwal Sholat", href: "/ibadah/jadwal-sholat" },
      { label: "Doa", href: "/ibadah/doa" },
      { label: "Al-Qur'an", href: "/ibadah/al-quran" },
    ],
  },
  {
    label: "Edukasi",
    href: "/edukasi",
    children: [
      { label: "Permainan", href: "/permainan" },
      { label: "Belajar", href: "/belajar" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
  { label: "Artikel", href: "/artikel" },
  { label: "Donasi", href: "/donasi" },
  { label: "Kontak", href: "/kontak" },
];
