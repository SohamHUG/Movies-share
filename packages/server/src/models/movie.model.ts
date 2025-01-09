import { logger } from "../utils";
import { movies, users, reviews } from "../schemas";
import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewMovie } from "../entities/Movies";

export const pushMovie = (movie: NewMovie) => {
    try {
        return db.insert(movies).values(movie).returning({ id: movies.id, title: movies.title, description: movies.description }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création du film: ${err.message}`);
        throw new Error('Impossible de créer le film')
    }
};

export const findAllMovies = () => {
    try {
        return db
            .select({
                id: movies.id,
                title: movies.title,
                description: movies.description,
                producer: movies.producer,
                releaseYear: movies.releaseYear,
                publishedBy: {
                    id: users.id,
                    username: users.username
                },
                reviews: {
                    id: reviews.id,
                    note: reviews.note,
                    comment: reviews.comment,
                    createdAt: reviews.createdAt
                },
                publishedOn: movies.publishedOn
            })
            .from(movies)
            .leftJoin(
                users, eq(movies.publishedBy, users.id)
            )
            .leftJoin(
                reviews, eq(movies.id, reviews.movieId)
            )
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection des films: ${err.message}`);
        throw new Error('Impossible de récupérer les films')
    }
}