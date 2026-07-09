import { Schema, model, type Document, type Types } from "mongoose";

export interface IAgenda {
  title: string;
  date: Date;
  time?: string;
  location?: string;
  description?: string;
  eventId?: Types.ObjectId;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AgendaDocument = Document & IAgenda;

const agendaSchema = new Schema<IAgenda>(
  {
    title: {
      type: String,
      required: [true, "Judul agenda wajib diisi"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Tanggal agenda wajib diisi"],
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Kegiatan",
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

agendaSchema.index({ date: 1 });
agendaSchema.index({ isPublished: 1, date: 1 });

export const Agenda = model<IAgenda>("Agenda", agendaSchema);
