import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateUserSchema } from "@/server/schemas/user.schema";
import { deleteUser, updateUser } from "@/server/services/user.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    const actor = requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateUserSchema);
    return jsonSuccess(await updateUser(params.id, data, actor), {
      message: "Pengguna berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    const actor = requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteUser(params.id, actor), {
      message: "Pengguna berhasil dihapus",
    });
  });
}
