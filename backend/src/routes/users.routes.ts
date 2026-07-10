import { Router } from "express";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, requireSuperAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticate, requireSuperAdmin);

router.get("/", asyncHandler(listUsers));
router.post("/", validateBody(createUserSchema), asyncHandler(createUser));
router.put("/:id", validateBody(updateUserSchema), asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
