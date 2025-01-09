import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createReview, deleteReview, getReviewById, getReviews } from "../controllers/review.controller";

const router = Router();

router.post('/', [authMiddleware], createReview)

router.delete('/:id', [authMiddleware], deleteReview)

router.get('/', getReviews)

router.get('/:id', getReviewById)

export default router;