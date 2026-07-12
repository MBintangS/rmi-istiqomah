import { Schema, model, type Document } from "mongoose";

export interface IDonasi {
  bank: string;
  accountNumber: string;
  accountName: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DonasiDocument = Document & IDonasi;

const donasiSchema = new Schema<IDonasi>(
  {
    bank: {
      type: String,
      required: [true, "Nama bank wajib diisi"],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: [true, "Nomor rekening wajib diisi"],
      trim: true,
    },
    accountName: {
      type: String,
      required: [true, "Nama akun bank wajib diisi"],
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

donasiSchema.index({ isActive: 1, order: 1 });

export const Donasi = model<IDonasi>("Donasi", donasiSchema);
