import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { pushReview } from "../models/review.model";
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