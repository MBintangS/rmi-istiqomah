import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminPengaturanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
