import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { updateProgramSchema } from "@/server/schemas/organisasi.schema";
import { deleteProgram, getProgramBySlug, updateProgram } from "@/server/services/program.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await getProgramBySlug(params.slug, queryObject(request), user));
  });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateProgramSchema);
    return jsonSuccess(await updateProgram(params.slug, data), {
      message: "Program berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteProgram(params.slug), { message: "Program berhasil dihapus" });
  });
}
