import { Router } from "express";
import { getMe, login, updateMe } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { loginRateLimiter } from "../middleware/loginRateLimiter";
import { updateProfileSchema } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/login", loginRateLimiter, asyncHandler(login));
router.get("/me", authenticate, asyncHandler(getMe));
router.put("/me", authenticate, validateBody(updateProfileSchema), asyncHandler(updateMe));

export default router;
