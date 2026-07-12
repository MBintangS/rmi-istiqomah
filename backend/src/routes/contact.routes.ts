import { Router } from "express";
import { listContactMessages, submitContact } from "../controllers/contact.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { contactFormSchema } from "../schemas/misc.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", authenticate, requireAdmin, asyncHandler(listContactMessages));
router.post("/", validateBody(contactFormSchema), asyncHandler(submitContact));

export default router;
