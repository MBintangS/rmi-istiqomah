import type { Types } from "mongoose";
import type { ISettings } from "../models/Settings.model";

type SettingsLike = ISettings & { _id: Types.ObjectId; updatedAt?: Date };

export function formatSettings(settings: SettingsLike) {
  return {
    id: settings._id.toString(),
    siteName: settings.siteName,
    tagline: settings.tagline,
    about: settings.about,
    vision: settings.vision,
    mission: settings.mission,
    address: settings.address,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    socialMedia: settings.socialMedia,
    googleMapsEmbed: settings.googleMapsEmbed,
    stats: settings.stats,
    updatedAt: settings.updatedAt,
  };
}
