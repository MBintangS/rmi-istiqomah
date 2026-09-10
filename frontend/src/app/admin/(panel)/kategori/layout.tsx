import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminKategoriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
