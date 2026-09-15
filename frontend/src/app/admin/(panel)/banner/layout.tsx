import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
