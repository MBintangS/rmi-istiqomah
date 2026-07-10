"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { adminNavItems } from "@/lib/admin-navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const current = adminNavItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin/dashboard" && pathname.startsWith(item.href)),
  );
  const title = current?.label ?? "Admin";

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader title={title} onOpenMenu={() => setDrawerOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu Admin">
        <div className="-m-4 h-[calc(100vh-4rem)]">
          <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
