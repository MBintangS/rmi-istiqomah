"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  adminNavGroupLabels,
  adminNavGroupOrder,
  getAdminNavItemsForRole,
  type AdminNavGroupId,
  type AdminNavItem,
} from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string) {
  return (
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href))
  );
}

function groupItems(items: AdminNavItem[]) {
  const map = new Map<AdminNavGroupId, AdminNavItem[]>();
  for (const group of adminNavGroupOrder) {
    map.set(group, []);
  }
  for (const item of items) {
    map.get(item.group)?.push(item);
  }
  return adminNavGroupOrder
    .map((group) => ({ group, items: map.get(group) ?? [] }))
    .filter((entry) => entry.items.length > 0);
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = getAdminNavItemsForRole(user?.role);
  const grouped = groupItems(navItems);

  return (
    <aside className="flex h-full w-full flex-col border-r border-foreground/10 bg-[#0f1609] text-surface">
      <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
          RMI
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">CMS Admin</p>
          <p className="truncate text-[11px] text-white/50">Remaja Masjid Istiqomah</p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 py-4" aria-label="Navigasi admin">
        {grouped.map(({ group, items }) => (
          <div key={group}>
            <p className="mb-1.5 px-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
              {adminNavGroupLabels[group]}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-md px-2.5 py-2 text-[13px] transition-colors",
                        active
                          ? "bg-primary font-medium text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2.5">
        <Link
          href="/"
          onClick={onNavigate}
          className="block rounded-md px-2.5 py-2 text-[13px] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
        >
          Lihat Website
        </Link>
      </div>
    </aside>
  );
}
