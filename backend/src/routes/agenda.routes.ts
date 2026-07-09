import { Router } from "express";
import {
  createAgenda,
  deleteAgenda,
  getAgendaById,
  getUpcomingAgenda,
  listAgenda,
  updateAgenda,
} from "../controllers/agenda.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  agendaListQuerySchema,
  createAgendaSchema,
  updateAgendaSchema,
} from "../schemas/kegiatan.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/upcoming", asyncHandler(getUpcomingAgenda));
router.get("/", optionalAuthenticate, validateQuery(agendaListQuerySchema), asyncHandler(listAgenda));
router.get("/:id", optionalAuthenticate, asyncHandler(getAgendaById));
router.post("/", authenticate, requireAdmin, validateBody(createAgendaSchema), asyncHandler(createAgenda));
router.put("/:id", authenticate, requireAdmin, validateBody(updateAgendaSchema), asyncHandler(updateAgenda));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteAgenda));

export default router;
