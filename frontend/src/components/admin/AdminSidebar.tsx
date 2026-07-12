"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RmiLogo } from "@/components/brand/RmiLogo";
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
  onClose?: () => void;
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

export function AdminSidebar({ onNavigate, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = getAdminNavItemsForRole(user?.role);
  const grouped = groupItems(navItems);

  return (
    <aside className="flex h-full w-full flex-col bg-[#0f1609] text-surface">
      <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-4">
        <RmiLogo size={32} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight">CMS Admin</p>
          <p className="truncate text-[11px] text-white/50">Remaja Masjid Istiqomah</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      <nav
        className="scrollbar-sidebar flex-1 space-y-5 overflow-y-auto px-2.5 py-4"
        aria-label="Navigasi admin"
      >
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
