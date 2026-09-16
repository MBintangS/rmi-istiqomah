import { apiHandler, jsonSuccess } from "@/server/http";
import { AppError } from "@/server/errors";
import { doaIdParamSchema } from "@/server/schemas/doa.schema";
import { getDoaById } from "@/server/services/doa.service";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: { id: string } }) {
  return apiHandler(async () => {
    const parsed = doaIdParamSchema.safeParse(context.params);
    if (!parsed.success) {
      throw new AppError(400, "VALIDATION_ERROR", "ID doa tidak valid");
    }
    return jsonSuccess(await getDoaById(parsed.data.id));
  });
}
