import type { AuthRole } from "@/types/api";

export type AdminNavGroupId = "utama" | "konten" | "media" | "organisasi" | "sistem";

export interface AdminNavItem {
  label: string;
  href: string;
  /** Visual grouping only - labels/hrefs unchanged */
  group: AdminNavGroupId;
  /** Jika diisi, item hanya tampil untuk role tersebut */
  roles?: AuthRole[];
}

export const adminNavGroupLabels: Record<AdminNavGroupId, string> = {
  utama: "Utama",
  konten: "Konten",
  media: "Media",
  organisasi: "Organisasi",
  sistem: "Sistem",
};

export const adminNavGroupOrder: AdminNavGroupId[] = [
  "utama",
  "konten",
  "media",
  "organisasi",
  "sistem",
];

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", group: "utama" },
  { label: "Artikel", href: "/admin/artikel", group: "konten" },
  { label: "Kegiatan", href: "/admin/kegiatan", group: "konten" },
  { label: "Galeri", href: "/admin/galeri", group: "media" },
  { label: "Banner", href: "/admin/banner", group: "media" },
  { label: "Pengurus", href: "/admin/pengurus", group: "organisasi" },
  { label: "Program", href: "/admin/program", group: "organisasi" },
  { label: "Dokumen", href: "/admin/dokumen", group: "media" },
  { label: "Donasi", href: "/admin/donasi", group: "media" },
  { label: "Testimoni", href: "/admin/testimoni", group: "organisasi" },
  { label: "Kategori", href: "/admin/kategori", group: "konten" },
  { label: "Pengguna", href: "/admin/pengguna", group: "sistem", roles: ["superadmin"] },
  { label: "Pengaturan", href: "/admin/pengaturan", group: "sistem" },
];

export function getAdminNavItemsForRole(role: AuthRole | null | undefined): AdminNavItem[] {
  if (!role) return adminNavItems.filter((item) => !item.roles);
  return adminNavItems.filter((item) => !item.roles || item.roles.includes(role));
}
