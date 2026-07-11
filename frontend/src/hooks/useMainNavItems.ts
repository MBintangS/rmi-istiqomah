"use client";

import { useMemo } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { mainNavItems, type NavItemWithChildren } from "@/lib/navigation";
import { usePrograms } from "./usePrograms";

const PROGRAM_NAV_HREF = "/program";

export function useMainNavItems(): NavItemWithChildren[] {
  const mounted = useHasMounted();
  const { data: programs } = usePrograms();

  return useMemo(() => {
    return mainNavItems.map((item) => {
      if (item.href !== PROGRAM_NAV_HREF) {
        return item;
      }

      // Avoid SSR/client tree mismatch (plain <a> vs dropdown <div><a>).
      if (!mounted) {
        return item;
      }

      const children = (programs ?? []).map((program) => ({
        label: program.name,
        href: `${PROGRAM_NAV_HREF}/${program.slug}`,
      }));

      return {
        ...item,
        children: children.length > 0 ? children : undefined,
      };
    });
  }, [mounted, programs]);
}
