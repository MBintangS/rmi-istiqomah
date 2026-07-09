import { Schema, model, type Document } from "mongoose";

export interface IContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export type ContactMessageDocument = Document & IContactMessage;

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subjek wajib diisi"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Pesan wajib diisi"],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage = model<IContactMessage>("ContactMessage", contactMessageSchema);
