import { authenticate, requirePengurus } from "@/server/auth";
import { apiRoute, jsonSuccess } from "@/server/http";
import { listPeserta } from "@/server/services/pendaftaran.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(authenticate(request));
    return jsonSuccess(await listPeserta(params.id));
  });
}
