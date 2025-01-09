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
            .select(
                {
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
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection des films: ${err.message}`);
        throw new Error('Impossible de récupérer les films')
    }
}

export const findAllCollections = () => {
    try {
        return db
            .select(
                {
                id: collections.id,
                movie: {
                    id: movies.id,
                    title: movies.title,
                },
                user: {
                    id: users.id,
                    username: users.username
                },
                status: collections.status
            })
            .from(collections)
            .leftJoin(
                movies, eq(movies.id, collections.movieId)
            )
            .leftJoin(
                users, eq(users.id, collections.userId)
            )
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection des films: ${err.message}`);
        throw new Error('Impossible de récupérer les films')
    }
}

export const updateCollectionStatus = (collection: NewCollection) => {
    try {
        return db.update(collections).set(collection).where(
            and(
                eq(collections.userId, collection.userId),
                eq(collections.movieId, collection.movieId)
            )
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la modification de la collection: ${err.message}`);
        throw new Error('Impossible de modifier la collection')
    }
}

export const deleteFromCollection = (id: string, userId: string) => {
    try {
        return db.delete(collections).where(
            and(
                eq(collections.id, id),
                eq(collections.userId, userId)
            )
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression du film de la collection: ${err.message}`);
        throw new Error('Impossible de supprimer le film de la collection')
    }
}