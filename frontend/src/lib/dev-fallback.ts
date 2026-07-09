import { mockSettings } from "@/data/mock";
import { mapSettingsData } from "@/lib/mappers/settings";
import type { SettingsData } from "@/types/api";
import type { SiteSettings } from "@/types";

const mockSettingsData: SettingsData = {
  id: "mock",
  ...mockSettings,
  socialMedia: {
    instagram: mockSettings.socialMedia.instagram ?? null,
    facebook: mockSettings.socialMedia.facebook ?? null,
    youtube: mockSettings.socialMedia.youtube ?? null,
    tiktok: mockSettings.socialMedia.tiktok ?? null,
  },
  updatedAt: new Date(0).toISOString(),
};

export const devFallbackSettings: SiteSettings = mapSettingsData(mockSettingsData);
