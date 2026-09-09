import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { AppError } from "@/server/errors";
import { getServerEnv } from "@/server/env";

function configureCloudinary() {
  const env = getServerEnv();

  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    throw new AppError(
      500,
      "CONFIG_ERROR",
      "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET.",
    );
  }

  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });

  return env;
}

export function createSignedUpload(options?: { folder?: string; resourceType?: "image" | "raw" }) {
  const env = configureCloudinary();
  const folder = options?.folder ?? env.cloudinaryFolder;
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, env.cloudinaryApiSecret);

  return {
    timestamp,
    signature,
    apiKey: env.cloudinaryApiKey,
    cloudName: env.cloudinaryCloudName,
    folder,
    resourceType: options?.resourceType ?? "image",
  };
}
