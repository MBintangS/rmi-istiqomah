import { Schema, model, type Document, type Model, type Types } from "mongoose";
import { generateUniqueSlug } from "../utils/slug";

export interface IPendaftaran {
  title: string;
  slug: string;
  description?: string;
  program: Types.ObjectId;
  opensAt: Date;
  closesAt: Date;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PendaftaranDocument = Document & IPendaftaran;

const pendaftaranSchema = new Schema<IPendaftaran>(
  {
    title: {
      type: String,
      required: [true, "Judul pendaftaran wajib diisi"],
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
      trim: true,
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Program wajib dipilih"],
    },
    opensAt: {
      type: Date,
      required: [true, "Tanggal buka wajib diisi"],
    },
    closesAt: {
      type: Date,
      required: [true, "Tanggal tutup wajib diisi"],
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

pendaftaranSchema.index({ program: 1, isPublished: 1, opensAt: 1, closesAt: 1 });

pendaftaranSchema.pre("validate", async function (next) {
  if (!this.slug || this.isModified("title")) {
    const PendaftaranModel = this.constructor as Model<IPendaftaran>;
    this.slug = await generateUniqueSlug(this.title, async (slug) => {
      const existing = await PendaftaranModel.findOne({ slug, _id: { $ne: this._id } }).select("_id");
      return Boolean(existing);
    });
  }

  next();
});

export const Pendaftaran = model<IPendaftaran>("Pendaftaran", pendaftaranSchema);
