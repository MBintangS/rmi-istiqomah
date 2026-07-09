import { Schema, model, type Document, type Model, type Types } from "mongoose";
import { generateUniqueSlug } from "../utils/slug";

export type KegiatanStatus = "upcoming" | "ongoing" | "completed";

export interface IKegiatan {
  title: string;
  slug: string;
  description: string;
  dateStart: Date;
  dateEnd?: Date;
  time?: string;
  location?: string;
  locationMap?: string;
  category: Types.ObjectId;
  thumbnail?: string;
  status: KegiatanStatus;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type KegiatanDocument = Document & IKegiatan;

const kegiatanSchema = new Schema<IKegiatan>(
  {
    title: {
      type: String,
      required: [true, "Judul kegiatan wajib diisi"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Deskripsi kegiatan wajib diisi"],
    },
    dateStart: {
      type: Date,
      required: [true, "Tanggal mulai wajib diisi"],
    },
    dateEnd: {
      type: Date,
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    locationMap: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Kategori",
      required: [true, "Kategori wajib dipilih"],
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
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

kegiatanSchema.index({ dateStart: 1 });
kegiatanSchema.index({ isPublished: 1, dateStart: -1 });
kegiatanSchema.index({ category: 1 });
kegiatanSchema.index({ title: "text", description: "text" });

kegiatanSchema.pre("validate", async function (next) {
  if (!this.slug || this.isModified("title")) {
    const KegiatanModel = this.constructor as Model<IKegiatan>;
    this.slug = await generateUniqueSlug(this.title, async (slug) => {
      const existing = await KegiatanModel.findOne({ slug, _id: { $ne: this._id } }).select("_id");
      return Boolean(existing);
    });
  }

  next();
});

export const Kegiatan = model<IKegiatan>("Kegiatan", kegiatanSchema);
