import type { Metadata } from "next";
import { AuthProvider } from "@/providers/AuthProvider";
import { AdminThemeReset } from "@/components/admin/AdminThemeReset";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminThemeReset />
      {children}
    </AuthProvider>
  );
}
