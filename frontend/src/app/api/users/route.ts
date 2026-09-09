import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { createUserSchema } from "@/server/schemas/user.schema";
import { createUser, listUsers } from "@/server/services/user.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await listUsers());
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createUserSchema);
    return jsonSuccess(await createUser(data), {
      status: 201,
      message: "Pengguna berhasil dibuat",
    });
  });
}
