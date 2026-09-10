export type UserRole = "pengurus" | "superadmin";

/** Nilai lama di database / JWT sebelum rename admin → pengurus */
export type StoredUserRole = UserRole | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  pengurus: "Pengurus",
  superadmin: "Super Admin",
};

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

export function roleLabel(role: string | null | undefined): string {
  return ROLE_LABELS[normalizeRole(role)];
}
