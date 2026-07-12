import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminDonasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
