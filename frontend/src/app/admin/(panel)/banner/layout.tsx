import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
