import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { submitPesertaSchema } from "@/server/schemas/pendaftaran.schema";
import { getOpenPendaftaranBySlug, submitPeserta } from "@/server/services/pendaftaran.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    return jsonSuccess(await getOpenPendaftaranBySlug(params.slug));
  });
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    const data = await parseBody(request, submitPesertaSchema);
    return jsonSuccess(await submitPeserta(params.slug, data), {
      status: 201,
      message: "Pendaftaran berhasil dikirim",
    });
  });
}
