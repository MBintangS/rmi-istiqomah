import { Schema, model, type Document, type Types } from "mongoose";

export interface IPeserta {
  pendaftaran: Types.ObjectId;
  name: string;
  whatsapp: string;
  age: number;
  address: string;
  email?: string | null;
  notes?: string | null;
  createdAt?: Date;
}

export type PesertaDocument = Document & IPeserta;

const pesertaSchema = new Schema<IPeserta>(
  {
    pendaftaran: {
      type: Schema.Types.ObjectId,
      ref: "Pendaftaran",
      required: [true, "Pendaftaran wajib diisi"],
    },
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp wajib diisi"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Usia wajib diisi"],
      min: [1, "Usia minimal 1 tahun"],
      max: [100, "Usia maksimal 100 tahun"],
    },
    address: {
      type: String,
      required: [true, "Alamat wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

pesertaSchema.index({ createdAt: -1 });

export const Peserta = model<IPeserta>("Peserta", pesertaSchema);
