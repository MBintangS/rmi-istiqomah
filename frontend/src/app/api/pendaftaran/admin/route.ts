import { authenticate, requirePengurus } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { createPendaftaranSchema } from "@/server/schemas/pendaftaran.schema";
import { createPendaftaran, listAdminPendaftaran } from "@/server/services/pendaftaran.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    requirePengurus(authenticate(request));
    return jsonSuccess(await listAdminPendaftaran());
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requirePengurus(authenticate(request));
    const data = await parseBody(request, createPendaftaranSchema);
    return jsonSuccess(await createPendaftaran(data), {
      status: 201,
      message: "Pendaftaran berhasil dibuat",
    });
  });
}
