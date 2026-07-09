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
  { label: "Galeri", href: "/galeri" },
  { label: "Artikel Islami", href: "/artikel" },
  { label: "Donasi", href: "/donasi" },
  { label: "Kontak", href: "/kontak" },
];
