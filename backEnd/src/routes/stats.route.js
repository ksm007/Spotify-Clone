import { Router } from "express";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getAllStat } from "../controller/stat.controller.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, getAllStat);

export default router;
