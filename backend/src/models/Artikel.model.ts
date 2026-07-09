import { Schema, model, type Document, type Model, type Types } from "mongoose";
import { generateExcerpt } from "../utils/excerpt";
import { generateUniqueSlug } from "../utils/slug";

export type ArtikelStatus = "draft" | "published";

export interface IArtikel {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Types.ObjectId;
  thumbnail?: string;
  status: ArtikelStatus;
  author: Types.ObjectId;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ArtikelDocument = Document & IArtikel;

const artikelSchema = new Schema<IArtikel>(
  {
    title: {
      type: String,
      required: [true, "Judul artikel wajib diisi"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Konten artikel wajib diisi"],
    },
    excerpt: {
      type: String,
      default: "",
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
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

artikelSchema.index({ status: 1, createdAt: -1 });
artikelSchema.index({ category: 1 });
artikelSchema.index({ title: "text", excerpt: "text" });

artikelSchema.pre("validate", async function (next) {
  if (!this.slug || this.isModified("title")) {
    const ArtikelModel = this.constructor as Model<IArtikel>;
    this.slug = await generateUniqueSlug(this.title, async (slug) => {
      const existing = await ArtikelModel.findOne({ slug, _id: { $ne: this._id } }).select("_id");
      return Boolean(existing);
    });
  }

  next();
});

artikelSchema.pre("save", async function (next) {
  if (!this.excerpt || this.isModified("content")) {
    this.excerpt = generateExcerpt(this.content);
  }

  if (this.isModified("status")) {
    if (this.status === "published" && !this.publishedAt) {
      this.publishedAt = new Date();
    }

    if (this.status === "draft") {
      this.publishedAt = undefined;
    }
  }

  next();
});

export const Artikel = model<IArtikel>("Artikel", artikelSchema);
