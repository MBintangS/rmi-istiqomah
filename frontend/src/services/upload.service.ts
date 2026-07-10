import { apiUpload } from "@/lib/api";
import type { UploadResult } from "@/types/api";

export async function uploadImage(file: File, folder = "artikel"): Promise<UploadResult> {
  const response = await apiUpload<UploadResult>("/upload", file, { folder });
  return response.data;
}
