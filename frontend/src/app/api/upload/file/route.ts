import { jsonError } from "@/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const message =
  "Upload file tidak melalui API. Minta signature di POST /api/upload/signature dengan resourceType=raw, lalu unggah langsung ke Cloudinary.";

export async function POST() {
  return jsonError(413, "PAYLOAD_TOO_LARGE", message);
}
