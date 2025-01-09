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

export const findAllReviews = () => {
    try {
        return db
            .select({
                id: reviews.id,
                note: reviews.note,
                comment: reviews.comment,
                movie: {
                    id: movies.id,
                    title: movies.title
                },
                author: {
                    id: users.id,
                    username: users.username
                }
            })
            .from(reviews)
            .leftJoin(
                movies, eq(movies.id, reviews.movieId)
            )
            .leftJoin(
                users, eq(users.id, reviews.authorId)
            )
            .execute()
    } catch (err: any) {
        logger.error("Impossible de récupérer les reviews " + err.message)
        return [];
    }
}

export const findReviewById = (id: string) => {
    try {
        return db
            .select({
                id: reviews.id,
                note: reviews.note,
                comment: reviews.comment,
                movie: {
                    id: movies.id,
                    title: movies.title
                },
                author: {
                    id: users.id,
                    username: users.username
                }
            })
            .from(reviews)
            .leftJoin(
                movies, eq(movies.id, reviews.movieId)
            )
            .leftJoin(
                users, eq(users.id, reviews.authorId)
            )
            .where(
                eq(reviews.id, id)
            )
            .execute()
    } catch (err: any) {

    }
}

export const deleteReviewById = (id: string, userId: string) => {
    try {
        return db.delete(reviews).where(
            and(
                eq(reviews.id, id),
                eq(reviews.authorId, userId)
            )
        )
    } catch (err: any) {
        logger.error("Impossible de supprimer la review " + err.message)
        throw new Error("La review ne peut pas être supprimé");
    }
};