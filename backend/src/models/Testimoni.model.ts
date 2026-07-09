import { Schema, model, type Document } from "mongoose";

export interface ITestimoni {
  name: string;
  content: string;
  role?: string;
  photo?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
}

export type TestimoniDocument = Document & ITestimoni;

const testimoniSchema = new Schema<ITestimoni>(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Isi testimoni wajib diisi"],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    photo: {
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
    timestamps: { createdAt: true, updatedAt: false },
  },
);

testimoniSchema.index({ isActive: 1, order: 1 });

export const Testimoni = model<ITestimoni>("Testimoni", testimoniSchema);
