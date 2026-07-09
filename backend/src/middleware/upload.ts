import multer from "multer";
import { AppError } from "./errorHandler";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      callback(
        new AppError(400, "VALIDATION_ERROR", "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF."),
      );
      return;
    }

    callback(null, true);
  },
});
