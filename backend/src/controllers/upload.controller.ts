import type { Request, Response } from "express";
import { uploadImageBuffer } from "../config/cloudinary";
import { AppError } from "../middleware/errorHandler";
import { sendSuccess } from "../utils/response";

export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    throw new AppError(400, "VALIDATION_ERROR", "File gambar wajib diupload (field: file)");
  }

  const folder = typeof req.query.folder === "string" ? req.query.folder : undefined;

  const result = await uploadImageBuffer(req.file.buffer, {
    folder,
    filename: req.file.originalname,
  });

  sendSuccess(
    res,
    {
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    },
    {
      status: 201,
      message: "Gambar berhasil diupload",
    },
  );
}
