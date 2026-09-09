import { apiPost, apiUpload, usesSameOriginApi } from "@/lib/api";
import type { UploadResult } from "@/types/api";

const IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const FILE_MIME_TYPES = new Set([
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

interface CloudinarySignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  resourceType: "image" | "raw";
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  resource_type?: string;
  error?: { message?: string };
}

function assertFile(file: File, kind: "image" | "file") {
  if (kind === "image") {
    if (!IMAGE_MIME_TYPES.has(file.type)) {
      throw new Error("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
    }
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error("Ukuran gambar maksimal 5 MB.");
    }
    return;
  }

  if (!FILE_MIME_TYPES.has(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, atau ZIP.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran file maksimal 10 MB.");
  }
}

async function uploadDirectToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "raw",
): Promise<UploadResult> {
  const { data: signature } = await apiPost<CloudinarySignature>("/upload/signature", {
    folder,
    resourceType,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/${resourceType}/upload`,
    { method: "POST", body: formData },
  );
  const json = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !json.secure_url || !json.public_id) {
    throw new Error(json.error?.message ?? "Upload ke Cloudinary gagal");
  }

  return {
    url: json.secure_url,
    publicId: json.public_id,
    width: json.width,
    height: json.height,
    format: json.format ?? file.name.split(".").pop() ?? "",
    bytes: json.bytes ?? file.size,
    resourceType: json.resource_type ?? resourceType,
    originalName: file.name,
    mimeType: file.type,
  };
}

export async function uploadImage(file: File, folder = "artikel"): Promise<UploadResult> {
  assertFile(file, "image");

  if (usesSameOriginApi()) {
    return uploadDirectToCloudinary(file, folder, "image");
  }

  const response = await apiUpload<UploadResult>("/upload", file, { folder });
  return response.data;
}

export async function uploadFile(file: File, folder = "dokumen"): Promise<UploadResult> {
  assertFile(file, "file");

  if (usesSameOriginApi()) {
    const result = await uploadDirectToCloudinary(file, folder, "raw");
    return result;
  }

  const response = await apiUpload<UploadResult>("/upload/file", file, { folder });
  return response.data;
}
