import type { Request, Response } from "express";
import { ContactMessage } from "../models";
import type { ContactFormInput } from "../schemas/misc.schema";
import { sendSuccess } from "../utils/response";

function formatContactMessage(doc: {
  _id: { toString(): string };
  name: string;
  email: string;
  subject: string;
  message: string;
  whatsapp?: string | null;
  createdAt?: Date;
}) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    whatsapp: doc.whatsapp || null,
    createdAt: doc.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

export async function listContactMessages(_req: Request, res: Response): Promise<void> {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  sendSuccess(res, items.map((item) => formatContactMessage(item)));
}

export async function submitContact(req: Request, res: Response): Promise<void> {
  const data = req.body as ContactFormInput;

  const message = await ContactMessage.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    whatsapp: data.whatsapp || null,
  });

  sendSuccess(
    res,
    {
      id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      whatsapp: message.whatsapp || null,
      createdAt: message.createdAt,
    },
    {
      status: 201,
      message: "Pesan berhasil dikirim",
    },
  );
}
