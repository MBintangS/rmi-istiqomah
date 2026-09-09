import { authenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { contactFormSchema } from "@/server/schemas/misc.schema";
import { listContactMessages, submitContact } from "@/server/services/contact.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await listContactMessages());
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    const data = await parseBody(request, contactFormSchema);
    return jsonSuccess(await submitContact(data), {
      status: 201,
      message: "Pesan berhasil dikirim",
    });
  });
}
