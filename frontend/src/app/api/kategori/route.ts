import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, parseQuery } from "@/server/http";
import {
  createKategoriSchema,
  kategoriListQuerySchema,
} from "@/server/schemas/artikel.schema";
import { createKategori, listKategori } from "@/server/services/kategori.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const query = parseQuery(request, kategoriListQuerySchema);
    return jsonSuccess(await listKategori(query));
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, createKategoriSchema);
    return jsonSuccess(await createKategori(data), { status: 201, message: "Kategori berhasil dibuat" });
  });
}
