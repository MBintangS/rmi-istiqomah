import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminKategoriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
