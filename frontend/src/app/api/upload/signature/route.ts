import { z } from "zod";
import { authenticate, requireAdmin } from "@/server/auth";
import { createSignedUpload } from "@/server/cloudinary";
import { apiHandler, jsonError, jsonSuccess, parseBody, queryObject } from "@/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const signatureSchema = z.object({
  folder: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9/_-]+$/, "Folder tidak valid")
    .optional(),
  resourceType: z.enum(["image", "raw"]).optional(),
});

export async function POST(request: Request) {
  return apiHandler(async () => {
    requireAdmin(authenticate(request));
    const query = queryObject(request);
    const body = await parseBody(request, signatureSchema);
    return jsonSuccess(
      createSignedUpload({
        folder: body.folder ?? (typeof query.folder === "string" ? query.folder : undefined),
        resourceType: body.resourceType ?? (query.resourceType === "raw" ? "raw" : "image"),
      }),
    );
  });
}

export async function GET() {
  return jsonError(
    405,
    "METHOD_NOT_ALLOWED",
    "Gunakan POST /api/upload/signature untuk mendapatkan tanda tangan Cloudinary.",
  );
}
