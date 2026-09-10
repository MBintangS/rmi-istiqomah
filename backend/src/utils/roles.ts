export type UserRole = "pengurus" | "superadmin";

export type StoredUserRole = UserRole | "admin";

export function normalizeRole(role: string | null | undefined): UserRole {
  if (role === "superadmin") return "superadmin";
  return "pengurus";
}

export function isCmsRole(role: string | null | undefined): boolean {
  return role === "pengurus" || role === "admin" || role === "superadmin";
}

export function isSuperAdminRole(role: string | null | undefined): boolean {
  return role === "superadmin";
}
