import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { users } from "../schemas";
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

export const saveUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id }).execute();
    } catch (err: any) {
        if (err.message === 'duplicate') { }
        logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur")
    }
};