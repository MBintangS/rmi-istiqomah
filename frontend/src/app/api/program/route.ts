import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { createProgramSchema } from "@/server/schemas/organisasi.schema";
import { createProgram, listProgram } from "@/server/services/program.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await listProgram(queryObject(request), user));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createProgramSchema);
    return jsonSuccess(await createProgram(data), {
      status: 201,
      message: "Program berhasil dibuat",
    });
  });
}
