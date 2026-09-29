import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { verifyToken } from "@/server/auth";

const SESSION_COOKIE = "rmi_admin_token";

function hasValidSession(): boolean {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gate sisi server: tanpa cookie sesi yang valid, balas 307 ke
 * /admin/login TANPA merender HTML panel admin (mengurangi fingerprinting).
 *
 * User dengan token valid tetapi cookie kedaluwarsa akan disinkronkan lagi
 * oleh bootstrap AuthProvider di halaman login sebelum kembali ke sini.
 * AuthGuard (klien) di bawah tetap menjadi lapisan kedua: verifikasi
 * /auth/me + redirect dengan parameter `next`.
 */
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!hasValidSession()) {
    redirect("/admin/login");
  }

  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
