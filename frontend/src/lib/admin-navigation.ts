export interface AdminNavItem {
  label: string;
  href: string;
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Artikel", href: "/admin/artikel" },
  { label: "Kegiatan", href: "/admin/kegiatan" },
  { label: "Agenda", href: "/admin/agenda" },
  { label: "Galeri", href: "/admin/galeri" },
  { label: "Banner", href: "/admin/banner" },
  { label: "Pengurus", href: "/admin/pengurus" },
  { label: "Program", href: "/admin/program" },
  { label: "Dokumen", href: "/admin/dokumen" },
  { label: "Pengguna", href: "/admin/pengguna" },
  { label: "Pengaturan", href: "/admin/pengaturan" },
];
