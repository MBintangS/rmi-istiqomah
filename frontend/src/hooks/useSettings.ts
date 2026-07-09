"use client";

import { useQuery } from "@tanstack/react-query";
import { mockSettings } from "@/data/mock";
import { devFallbackSettings } from "@/lib/dev-fallback";
import { mapSettingsData } from "@/lib/mappers/settings";
import { queryKeys } from "@/lib/query-keys";
import { fetchSettings } from "@/services/settings.service";
import type { SiteSettings } from "@/types";

const placeholderSettings = devFallbackSettings;

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: async (): Promise<SiteSettings> => {
      const data = await fetchSettings();
      return mapSettingsData(data);
    },
    placeholderData: placeholderSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSettingsValue(): SiteSettings {
  const { data } = useSettings();
  return data ?? mapSettingsData({
    id: "mock",
    ...mockSettings,
    socialMedia: {
      instagram: mockSettings.socialMedia.instagram ?? null,
      facebook: mockSettings.socialMedia.facebook ?? null,
      youtube: mockSettings.socialMedia.youtube ?? null,
      tiktok: mockSettings.socialMedia.tiktok ?? null,
    },
    updatedAt: new Date(0).toISOString(),
  });
}
