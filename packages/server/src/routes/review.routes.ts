import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createReview } from "../controllers/review.controller";

const router = Router();

router.post('/', [authMiddleware], createReview)

export default router;