import multer from "multer";
import { AppError } from "./errorHandler";

const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const ALLOWED_FILE_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/zip",
]);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(
        new AppError(400, "VALIDATION_ERROR", "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF."),
      );
      return;
    }

    callback(null, true);
  },
});

export const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_FILE_MIME_TYPES.has(file.mimetype)) {
      callback(
        new AppError(
          400,
          "VALIDATION_ERROR",
          "Format file tidak didukung. Gunakan PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, atau ZIP.",
        ),
      );
      return;
    }

    callback(null, true);
  },
});
