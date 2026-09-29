import { Router } from "express";
import {
  createPendaftaran,
  deletePendaftaran,
  getAdminPendaftaran,
  getOpenPendaftaranBySlug,
  listAdminPendaftaran,
  listOpenPendaftaran,
  listPeserta,
  submitPeserta,
  updatePendaftaran,
} from "../controllers/pendaftaran.controller";
import { authenticate, requirePengurus } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  createPendaftaranSchema,
  pendaftaranListQuerySchema,
  submitPesertaSchema,
  updatePendaftaranSchema,
  type PendaftaranListQuery,
  type SubmitPesertaInput,
  type UpdatePendaftaranInput,
} from "../schemas/pendaftaran.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";

function routeParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

const router = Router();

router.get(
  "/admin",
  authenticate,
  requirePengurus,
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await listAdminPendaftaran());
  }),
);

router.post(
  "/admin",
  authenticate,
  requirePengurus,
  validateBody(createPendaftaranSchema),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await createPendaftaran(req.body), {
      status: 201,
      message: "Pendaftaran berhasil dibuat",
    });
  }),
);

router.get(
  "/admin/:id/peserta",
  authenticate,
  requirePengurus,
  asyncHandler(async (req, res) => {
    sendSuccess(res, await listPeserta(routeParam(req.params.id)));
  }),
);

router.get(
  "/admin/:id",
  authenticate,
  requirePengurus,
  asyncHandler(async (req, res) => {
    sendSuccess(res, await getAdminPendaftaran(routeParam(req.params.id)));
  }),
);

router.put(
  "/admin/:id",
  authenticate,
  requirePengurus,
  validateBody(updatePendaftaranSchema),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await updatePendaftaran(routeParam(req.params.id), req.body as UpdatePendaftaranInput), {
      message: "Pendaftaran berhasil diperbarui",
    });
  }),
);

router.delete(
  "/admin/:id",
  authenticate,
  requirePengurus,
  asyncHandler(async (req, res) => {
    sendSuccess(res, await deletePendaftaran(routeParam(req.params.id)), {
      message: "Pendaftaran berhasil dihapus",
    });
  }),
);

router.get(
  "/",
  validateQuery(pendaftaranListQuerySchema),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await listOpenPendaftaran(req.query as PendaftaranListQuery));
  }),
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    sendSuccess(res, await getOpenPendaftaranBySlug(routeParam(req.params.slug)));
  }),
);

router.post(
  "/:slug",
  validateBody(submitPesertaSchema),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await submitPeserta(routeParam(req.params.slug), req.body as SubmitPesertaInput), {
      status: 201,
      message: "Pendaftaran berhasil dikirim",
    });
  }),
);

export default router;
