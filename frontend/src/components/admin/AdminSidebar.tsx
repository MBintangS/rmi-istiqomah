"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getAdminNavItemsForRole } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = getAdminNavItemsForRole(user?.role);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-foreground/10 bg-heading text-surface">
      <div className="flex h-16 items-center gap-2 border-b border-surface/10 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          RMI
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">CMS Admin</p>
          <p className="truncate text-xs text-surface/60">Remaja Masjid Istiqomah</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Navigasi admin">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-rmi px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary font-medium text-white"
                  : "text-surface/75 hover:bg-surface/10 hover:text-surface",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface/10 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="block rounded-rmi px-3 py-2.5 text-sm text-surface/70 transition-colors hover:bg-surface/10 hover:text-surface"
        >
          ← Lihat Website
        </Link>
      </div>
    </aside>
  );
}
