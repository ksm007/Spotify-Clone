import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYou, getTrending } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", protectRoute,requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYou);
router.get("/trending", getTrending);

export default router;
