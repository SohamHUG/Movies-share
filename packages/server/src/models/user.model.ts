import { db } from "../config/pool";
import { and, eq, sql } from "drizzle-orm";
import { users, movies } from "../schemas";
import { User, NewUser } from "../entities/User";
import { logger } from "../utils";


export const findByCredentials = (email: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
                email: true,
                username: true,
                password: true
            }
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur")
    }
};

export const pushUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur")
    }
};

export const findAllUsers = () => {
    try {
        return db
            .select({
                id: users.id,
                username: users.username,
                email: users.email,
                movies: sql`
                    array_agg(
                        distinct jsonb_build_object(
                            'id', ${movies.id},
                            'title', ${movies.title}
                        )
                    )
                `.as('movies')
            })
            .from(users)
            .leftJoin(
                movies, eq(movies.publishedBy, users.id)
            )
            .groupBy(users.id)
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
        throw new Error('Impossible de récupérer les utilisateurs');
    }
}

export const findUserById = (id: string) => {
    try {
        return db
            .select({
                id: users.id,
                username: users.username,
                email: users.email
            })
            .from(users)
            .where(
                eq(users.id, id)
            )
            .execute()
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur");
    }
}

export const deleteUserById = (id: string, userId: string) => {
    try {
        return db.delete(users).where(
            and(
                eq(users.id, id),
                eq(users.id, userId)
            )
        )
    } catch (err: any) {
        logger.error("Impossible de supprimer l'utilisateur " + err.message)
        throw new Error("L'utilisateur ne peut pas être supprimé");
    }
};
