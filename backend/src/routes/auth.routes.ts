import { Router } from "express";
import { getMe, login } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { loginRateLimiter } from "../middleware/loginRateLimiter";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/login", loginRateLimiter, asyncHandler(login));
router.get("/me", authenticate, asyncHandler(getMe));

export default router;
