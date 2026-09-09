import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { createPengurusSchema } from "@/server/schemas/organisasi.schema";
import { createPengurus, listPengurus } from "@/server/services/pengurus.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await listPengurus(queryObject(request), user));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createPengurusSchema);
    return jsonSuccess(await createPengurus(data), {
      status: 201,
      message: "Pengurus berhasil dibuat",
    });
  });
}
