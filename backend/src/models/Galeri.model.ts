import { Schema, model, type Document, type Types } from "mongoose";

export interface IGaleriImage {
  url: string;
  publicId?: string;
  caption?: string;
}

export interface IGaleri {
  title: string;
  images: IGaleriImage[];
  videoUrl?: string;
  category: Types.ObjectId;
  eventId?: Types.ObjectId;
  order: number;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GaleriDocument = Document & IGaleri;

const galeriImageSchema = new Schema<IGaleriImage>(
  {
    url: {
      type: String,
      required: [true, "URL gambar wajib diisi"],
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const galeriSchema = new Schema<IGaleri>(
  {
    title: {
      type: String,
      required: [true, "Judul galeri wajib diisi"],
      trim: true,
    },
    images: {
      type: [galeriImageSchema],
      default: [],
      validate: {
        validator: (images: IGaleriImage[]) => images.length > 0,
        message: "Minimal satu gambar diperlukan",
      },
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Kategori",
      required: [true, "Kategori wajib dipilih"],
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Kegiatan",
    },
    order: {
      type: Number,
      default: 0,
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

galeriSchema.index({ isPublished: 1, order: 1 });
galeriSchema.index({ category: 1 });
galeriSchema.index({ eventId: 1 });

export const Galeri = model<IGaleri>("Galeri", galeriSchema);
