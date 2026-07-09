import { Schema, model, type Document } from "mongoose";

export type KategoriType = "artikel" | "kegiatan" | "galeri";

export interface IKategori {
  name: string;
  slug: string;
  type: KategoriType;
}

export type KategoriDocument = Document & IKategori;

const kategoriSchema = new Schema<IKategori>(
  {
    name: {
      type: String,
      required: [true, "Nama kategori wajib diisi"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["artikel", "kegiatan", "galeri"],
      required: [true, "Tipe kategori wajib diisi"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

kategoriSchema.index({ type: 1 });

export const Kategori = model<IKategori>("Kategori", kategoriSchema);
