import { Router } from "express";
import {
  createDonasi,
  deleteDonasi,
  getDonasiById,
  listDonasi,
  updateDonasi,
} from "../controllers/donasi.controller";
import { authenticate, optionalAuthenticate, requireSuperAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createDonasiSchema, updateDonasiSchema } from "../schemas/donasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listDonasi));
router.get("/:id", optionalAuthenticate, asyncHandler(getDonasiById));
router.post("/", authenticate, requireSuperAdmin, validateBody(createDonasiSchema), asyncHandler(createDonasi));
router.put("/:id", authenticate, requireSuperAdmin, validateBody(updateDonasiSchema), asyncHandler(updateDonasi));
router.delete("/:id", authenticate, requireSuperAdmin, asyncHandler(deleteDonasi));

export default router;
