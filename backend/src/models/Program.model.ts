import { Schema, model, type Document, type Model } from "mongoose";
import { generateUniqueSlug } from "../utils/slug";

export interface IProgram {
  name: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProgramDocument = Document & IProgram;

const programSchema = new Schema<IProgram>(
  {
    name: {
      type: String,
      required: [true, "Nama program wajib diisi"],
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
    content: {
      type: String,
    },
    image: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
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

programSchema.index({ isActive: 1, name: 1 });

programSchema.pre("validate", async function (next) {
  if (!this.slug || this.isModified("name")) {
    const ProgramModel = this.constructor as Model<IProgram>;
    this.slug = await generateUniqueSlug(this.name, async (slug) => {
      const existing = await ProgramModel.findOne({ slug, _id: { $ne: this._id } }).select("_id");
      return Boolean(existing);
    });
  }

  next();
});

export const Program = model<IProgram>("Program", programSchema);
