import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { updateDonasiSchema } from "@/server/schemas/donasi.schema";
import { deleteDonasi, getDonasiById, updateDonasi } from "@/server/services/donasi.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await getDonasiById(params.id, queryObject(request), user));
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateDonasiSchema);
    return jsonSuccess(await updateDonasi(params.id, data), {
      message: "Rekening donasi berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteDonasi(params.id), {
      message: "Rekening donasi berhasil dihapus",
    });
  });
}
