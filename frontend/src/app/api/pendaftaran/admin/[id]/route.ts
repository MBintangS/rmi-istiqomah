import { authenticate, requirePengurus } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updatePendaftaranSchema } from "@/server/schemas/pendaftaran.schema";
import {
  deletePendaftaran,
  getAdminPendaftaran,
  updatePendaftaran,
} from "@/server/services/pendaftaran.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(await authenticate(request));
    return jsonSuccess(await getAdminPendaftaran(params.id));
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(await authenticate(request));
    const data = await parseBody(request, updatePendaftaranSchema);
    return jsonSuccess(await updatePendaftaran(params.id, data), {
      message: "Pendaftaran berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(await authenticate(request));
    return jsonSuccess(await deletePendaftaran(params.id), {
      message: "Pendaftaran berhasil dihapus",
    });
  });
}
