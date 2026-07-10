import type { AuthRole } from "@/types/api";

export interface AdminNavItem {
  label: string;
  href: string;
  /** Jika diisi, item hanya tampil untuk role tersebut */
  roles?: AuthRole[];
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
  { label: "Testimoni", href: "/admin/testimoni" },
  { label: "Kategori", href: "/admin/kategori" },
  { label: "Pengguna", href: "/admin/pengguna", roles: ["superadmin"] },
  { label: "Pengaturan", href: "/admin/pengaturan" },
];

export function getAdminNavItemsForRole(role: AuthRole | null | undefined): AdminNavItem[] {
  if (!role) return adminNavItems.filter((item) => !item.roles);
  return adminNavItems.filter((item) => !item.roles || item.roles.includes(role));
}
