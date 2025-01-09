import { z } from "zod";

export const reviewValidation = z.object({
    note: z.number()
        .min(1, { message: "La note doit être comprise en 1 et 5" })
        .max(5, { message: "La note doit être comprise en 1 et 5" }),
    comment: z.string().optional(),
    authorId: z.string().uuid({ message: "ID de l'auteur invalide" }),
    movieId: z.string().uuid({ message: "ID du film invalide" }),
});