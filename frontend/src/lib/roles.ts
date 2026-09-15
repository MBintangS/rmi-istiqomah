export type UserRole = "anggota" | "pengurus" | "superadmin";

/** Nilai lama di database / JWT sebelum rename admin → pengurus */
export type StoredUserRole = UserRole | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  anggota: "Anggota",
  pengurus: "Pengurus",
  superadmin: "Super Admin",
};

export function normalizeRole(role: string | null | undefined): UserRole {
  if (role === "superadmin") return "superadmin";
  if (role === "pengurus" || role === "admin") return "pengurus";
  return "anggota";
}

export function isCmsRole(role: string | null | undefined): boolean {
  return role === "anggota" || role === "pengurus" || role === "admin" || role === "superadmin";
}

export function isPengurusRole(role: string | null | undefined): boolean {
  return role === "pengurus" || role === "admin" || role === "superadmin";
}

export function isSuperAdminRole(role: string | null | undefined): boolean {
  return role === "superadmin";
}

export function roleLabel(role: string | null | undefined): string {
  return ROLE_LABELS[normalizeRole(role)];
}
