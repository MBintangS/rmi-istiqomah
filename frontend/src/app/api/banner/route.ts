import { authenticate, optionalAuthenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { createBannerSchema } from "@/server/schemas/galeri.schema";
import { createBanner, listBanner } from "@/server/services/banner.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await listBanner(queryObject(request), user));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createBannerSchema);
    return jsonSuccess(await createBanner(data), {
      status: 201,
      message: "Banner berhasil dibuat",
    });
  });
}
