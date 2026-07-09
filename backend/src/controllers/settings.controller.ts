import type { Request, Response } from "express";
import { Settings } from "../models";
import type { UpdateSettingsInput } from "../schemas/misc.schema";
import { formatSettings } from "../utils/settingsMapper";
import { sendSuccess } from "../utils/response";

const SETTINGS_KEY = "default";

async function ensureSettings() {
  const existing = await Settings.findOne({ singletonKey: SETTINGS_KEY });

  if (existing) {
    return existing;
  }

  return Settings.create({
    singletonKey: SETTINGS_KEY,
    siteName: "Remaja Masjid Istiqomah",
    tagline: "Generasi Qurani, Berakhlak Mulia",
    about: "Organisasi remaja masjid yang aktif dalam kegiatan keagamaan dan sosial.",
    vision: "Menjadi wadah pembinaan generasi muda yang beriman dan berilmu.",
    mission: [
      "Menyelenggarakan kajian rutin",
      "Membina karakter remaja masjid",
      "Menggerakkan kegiatan sosial keagamaan",
    ],
    address: "Jl. Masjid Istiqomah No. 1",
    phone: "021-1234567",
    whatsapp: "6281234567890",
    email: "info@rmi-masjid.org",
    socialMedia: {},
    googleMapsEmbed: "",
    stats: {
      totalEvents: 0,
      totalMembers: 0,
      totalPengurus: 0,
      establishedYear: 2010,
    },
  });
}

export async function getSettings(_req: Request, res: Response): Promise<void> {
  const settings = await ensureSettings();

  sendSuccess(res, formatSettings(settings));
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateSettingsInput;
  const settings = await ensureSettings();

  const assignableFields: (keyof UpdateSettingsInput)[] = [
    "siteName",
    "tagline",
    "about",
    "vision",
    "mission",
    "address",
    "phone",
    "whatsapp",
    "email",
    "googleMapsEmbed",
  ];

  for (const field of assignableFields) {
    if (data[field] !== undefined) {
      settings.set(field, data[field]);
    }
  }

  if (data.socialMedia) {
    settings.socialMedia = { ...settings.socialMedia, ...data.socialMedia };
  }

  if (data.stats) {
    settings.stats = { ...settings.stats, ...data.stats };
  }

  await settings.save();

  sendSuccess(res, formatSettings(settings), { message: "Pengaturan berhasil diperbarui" });
}
