"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { adminNavItems, getAdminNavItemsForRole } from "@/lib/admin-navigation";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { useAuth } from "@/hooks/useAuth";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = getAdminNavItemsForRole(user?.role);
  const current = navItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin/dashboard" && pathname.startsWith(item.href)),
  );
  const title =
    current?.label ??
    adminNavItems.find((item) => item.href === pathname)?.label ??
    "Admin";

  return (
    <div className="min-h-screen bg-surface">
      <SkipToContent />

      <div className="fixed inset-y-0 left-0 z-40 hidden h-screen w-[15.5rem] bg-[#0f1609] lg:block">
        <AdminSidebar />
      </div>

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[15.5rem]">
        <AdminHeader title={title} onOpenMenu={() => setDrawerOpen(true)} />
        <main id="main-content" className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl space-y-5">{children}</div>
        </main>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu Admin">
        <div className="-m-4 h-[calc(100vh-4rem)]">
          <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
