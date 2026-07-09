import { Schema, model, type Document } from "mongoose";

export interface IBanner {
  title: string;
  image: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BannerDocument = Document & IBanner;

const bannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: [true, "Judul banner wajib diisi"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Gambar banner wajib diisi"],
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

bannerSchema.index({ isActive: 1, order: 1 });

export const Banner = model<IBanner>("Banner", bannerSchema);
