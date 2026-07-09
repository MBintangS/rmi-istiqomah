import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../middleware/errorHandler";

export function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new AppError(
      500,
      "CONFIG_ERROR",
      "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET.",
    );
  }

  return { cloudName, apiKey, apiSecret };
}

export function configureCloudinary(): void {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  options?: { folder?: string; filename?: string },
): Promise<CloudinaryUploadResult> {
  configureCloudinary();

  const folder = options?.folder ?? process.env.CLOUDINARY_FOLDER ?? "rmi";

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: options?.filename
          ? options.filename.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-")
          : undefined,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload ke Cloudinary gagal"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      },
    );

    upload.end(buffer);
  });
}
