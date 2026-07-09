import { Schema, model, type Document } from "mongoose";

export interface IPengurus {
  name: string;
  position: string;
  photo?: string;
  period?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PengurusDocument = Document & IPengurus;

const pengurusSchema = new Schema<IPengurus>(
  {
    name: {
      type: String,
      required: [true, "Nama pengurus wajib diisi"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Jabatan wajib diisi"],
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    period: {
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

pengurusSchema.index({ isActive: 1, order: 1 });

export const Pengurus = model<IPengurus>("Pengurus", pengurusSchema);
