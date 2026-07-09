import type { Request, Response } from "express";
import { ContactMessage } from "../models";
import type { ContactFormInput } from "../schemas/misc.schema";
import { sendSuccess } from "../utils/response";

export async function submitContact(req: Request, res: Response): Promise<void> {
  const data = req.body as ContactFormInput;

  const message = await ContactMessage.create({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  sendSuccess(
    res,
    {
      id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      createdAt: message.createdAt,
    },
    {
      status: 201,
      message: "Pesan berhasil dikirim",
    },
  );
}
