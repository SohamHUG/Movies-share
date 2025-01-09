import { eq, and } from "drizzle-orm";
import { db } from "../config/pool";
import { NewReview } from "../entities/Reviews";
import { reviews, users, movies } from "../schemas";
import { logger } from "../utils";

export const pushReview = (review: NewReview) => {
    try {
        return db.insert(reviews).values(review).execute();
    } catch (err: any) {
        logger.error("Impossible de créer la review " + err.message)
        throw new Error("La review ne peut pas être crée");
    }
};