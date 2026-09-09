import { AppError } from "@/server/errors";
import { Settings } from "@/server/models";
import type { UpdateSettingsInput } from "@/server/schemas/misc.schema";
import { formatSettings } from "@/server/utils/settingsMapper";

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

export async function getSettings() {
  const settings = await ensureSettings();
  return formatSettings(settings);
}

export async function updateSettings(data: UpdateSettingsInput) {
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

  await settings.save();
  return formatSettings(settings);
}

export function assertSettingsUpdate(data: UpdateSettingsInput) {
  if (!data) {
    throw new AppError(400, "VALIDATION_ERROR", "Data tidak valid");
  }
}
