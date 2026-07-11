"use client";

import { useQuery } from "@tanstack/react-query";
import { useHasMounted } from "@/hooks/useHasMounted";
import { devFallbackSettings } from "@/lib/dev-fallback";
import { mapSettingsData } from "@/lib/mappers/settings";
import { queryKeys } from "@/lib/query-keys";
import { fetchSettings } from "@/services/settings.service";
import type { SiteSettings } from "@/types";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: async (): Promise<SiteSettings> => {
      const data = await fetchSettings();
      return mapSettingsData(data);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSettingsValue(): SiteSettings {
  const mounted = useHasMounted();
  const { data } = useSettings();

  if (!mounted) {
    return devFallbackSettings;
  }

  return data ?? devFallbackSettings;
}
