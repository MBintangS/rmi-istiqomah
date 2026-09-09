import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { createDonasiSchema } from "@/server/schemas/donasi.schema";
import { createDonasi, listDonasi } from "@/server/services/donasi.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await listDonasi(queryObject(request), user));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createDonasiSchema);
    return jsonSuccess(await createDonasi(data), {
      status: 201,
      message: "Rekening donasi berhasil dibuat",
    });
  });
}
