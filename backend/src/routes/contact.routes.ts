import { Router } from "express";
import { submitContact } from "../controllers/contact.controller";
import { validateBody } from "../middleware/validate";
import { contactFormSchema } from "../schemas/misc.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", validateBody(contactFormSchema), asyncHandler(submitContact));

export default router;
