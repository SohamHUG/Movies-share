import { logger } from "../utils";
import { movies, users, reviews, collections } from "../schemas";
import { and, eq, like, or } from "drizzle-orm";
import { db } from "../config/pool";
import { NewCollection } from "../entities/Collections";

export const existingEntry = (movieId: string, userId: string) => {
    try {
        return db
            .select()
            .from(collections)
            .where(
                and(
                    eq(collections.userId, userId),
                    eq(collections.movieId, movieId)
                )
            )
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de la collection: ${err.message}`);
        throw new Error('Impossible de récupérer la collection')
    }
}

export const pushCollection = (collection: NewCollection) => {
    try {
        return db.insert(collections).values(collection).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de la collection: ${err.message}`);
        throw new Error('Impossible de créer la collection')
    }
};

export const findMyCollection = (userId: string) => {
    try {
        return db
            .select({
                id: collections.id,
                movie: {
                    id: movies.id,
                    title: movies.title,
                },
                status: collections.status
            })
            .from(collections)
            .leftJoin(
                movies, eq(movies.id, collections.movieId)
            )
            .where(eq(collections.userId, userId))
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection des films: ${err.message}`);
        throw new Error('Impossible de récupérer les films')
    }
}