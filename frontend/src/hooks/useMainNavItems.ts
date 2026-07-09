"use client";

import { useMemo } from "react";
import { mainNavItems, type NavItemWithChildren } from "@/lib/navigation";
import { usePrograms } from "./usePrograms";

const PROGRAM_NAV_HREF = "/program";

export function useMainNavItems(): NavItemWithChildren[] {
  const { data: programs } = usePrograms();

  return useMemo(() => {
    return mainNavItems.map((item) => {
      if (item.href !== PROGRAM_NAV_HREF) {
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
  }, [programs]);
}
