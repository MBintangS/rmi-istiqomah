export type UserRole = "anggota" | "pengurus" | "superadmin";

export type StoredUserRole = UserRole | "admin";

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
