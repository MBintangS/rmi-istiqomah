import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { createTestimoniSchema } from "@/server/schemas/organisasi.schema";
import { createTestimoni, listTestimoni } from "@/server/services/testimoni.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await listTestimoni(queryObject(request), user));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createTestimoniSchema);
    return jsonSuccess(await createTestimoni(data), {
      status: 201,
      message: "Testimoni berhasil dibuat",
    });
  });
}
