import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller";
import { authenticate, requireSuperAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { updateSettingsSchema } from "../schemas/misc.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getSettings));
router.put("/", authenticate, requireSuperAdmin, validateBody(updateSettingsSchema), asyncHandler(updateSettings));

export default router;
