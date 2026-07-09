import { Schema, model, type Document } from "mongoose";

export interface IDokumen {
  name: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  category?: string;
  description?: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DokumenDocument = Document & IDokumen;

const dokumenSchema = new Schema<IDokumen>(
  {
    name: {
      type: String,
      required: [true, "Nama dokumen wajib diisi"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "URL file wajib diisi"],
      trim: true,
    },
    fileSize: {
      type: Number,
      min: 0,
    },
    fileType: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

dokumenSchema.index({ isPublished: 1, createdAt: -1 });
dokumenSchema.index({ name: "text", description: "text" });

export const Dokumen = model<IDokumen>("Dokumen", dokumenSchema);
