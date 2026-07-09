import { Schema, model, type Document } from "mongoose";

export interface ISocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface ISiteStats {
  totalEvents: number;
  totalMembers: number;
  totalPengurus: number;
  establishedYear: number;
}

export interface ISettings {
  singletonKey: string;
  siteName: string;
  tagline: string;
  about: string;
  vision: string;
  mission: string[];
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  socialMedia: ISocialMedia;
  googleMapsEmbed: string;
  stats: ISiteStats;
}

export type SettingsDocument = Document & ISettings;

const socialMediaSchema = new Schema<ISocialMedia>(
  {
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    youtube: { type: String, trim: true },
    tiktok: { type: String, trim: true },
  },
  { _id: false },
);

const siteStatsSchema = new Schema<ISiteStats>(
  {
    totalEvents: { type: Number, default: 0 },
    totalMembers: { type: Number, default: 0 },
    totalPengurus: { type: Number, default: 0 },
    establishedYear: { type: Number, default: new Date().getFullYear() },
  },
  { _id: false },
);

const settingsSchema = new Schema<ISettings>(
  {
    singletonKey: {
      type: String,
      default: "default",
      unique: true,
      immutable: true,
    },
    siteName: {
      type: String,
      required: [true, "Nama situs wajib diisi"],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, "Tagline wajib diisi"],
      trim: true,
    },
    about: {
      type: String,
      required: [true, "Profil singkat wajib diisi"],
    },
    vision: {
      type: String,
      required: [true, "Visi wajib diisi"],
    },
    mission: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
      required: [true, "Alamat wajib diisi"],
    },
    phone: {
      type: String,
      required: [true, "Telepon wajib diisi"],
      trim: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      lowercase: true,
      trim: true,
    },
    socialMedia: {
      type: socialMediaSchema,
      default: () => ({}),
    },
    googleMapsEmbed: {
      type: String,
      default: "",
    },
    stats: {
      type: siteStatsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  },
);

export const Settings = model<ISettings>("Settings", settingsSchema);
