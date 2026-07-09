import { Router } from "express";
import { globalSearch } from "../controllers/search.controller";
import { validateQuery } from "../middleware/validate";
import { searchQuerySchema } from "../schemas/misc.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", validateQuery(searchQuerySchema), asyncHandler(globalSearch));

export default router;
