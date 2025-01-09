import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { deleteReviewById, findAllReviews, findReviewById, pushReview } from "../models/review.model";
import { reviewValidation } from "../validation/reviews.validation";
import { z } from 'zod'

export const createReview = async (request: Request, response: Response) => {
    try {
        const { movieId, note, comment } = request.body;
        const authorId = response.locals.user.userId

        const newReview = reviewValidation.parse({ movieId, note, comment, authorId });

        await pushReview(newReview);
        APIResponse(response, newReview, "Review created", 201);
    } catch (err: any) {
        logger.error(`Erreur lors de la création de la review: ${err.message}`)
        if (err instanceof z.ZodError) {
            return APIResponse(response, err.errors, "Formulaire incorrect", 400)
        }
        APIResponse(response, null, "Erreur serveur", 500);
    }

}

export const getReviews = async (request: Request, response: Response) => {
    try {
        const reviews = await findAllReviews();
        APIResponse(response, reviews, "All reviews", 200)
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des reviews: ${err.message}`)
        APIResponse(response, [], err.message, 500);
    }
}

export const getReviewById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const review = await findReviewById(id);

    if (review && review.length > 0) {
        APIResponse(response, review, "Review found", 200)
    } else {
        APIResponse(response, null, "Review not found", 404)
    }
}

export const deleteReview = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deleteReviewById(id, userId);
    APIResponse(response, null, "Review deleted", 204);
}