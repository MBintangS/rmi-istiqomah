import type { SettingsData } from "@/types/api";
import type { SiteSettings } from "@/types";

export function mapSettingsData(data: SettingsData): SiteSettings {
  return {
    siteName: data.siteName,
    tagline: data.tagline,
    about: data.about,
    vision: data.vision,
    mission: data.mission,
    address: data.address,
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email,
    socialMedia: {
      instagram: data.socialMedia.instagram ?? undefined,
      facebook: data.socialMedia.facebook ?? undefined,
      youtube: data.socialMedia.youtube ?? undefined,
      tiktok: data.socialMedia.tiktok ?? undefined,
    },
    googleMapsEmbed: data.googleMapsEmbed,
    stats: data.stats,
  };
}
