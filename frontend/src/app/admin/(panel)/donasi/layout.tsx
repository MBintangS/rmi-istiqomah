import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminDonasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
