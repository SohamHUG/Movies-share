import { z } from "zod";

export const reviewValidation = z.object({
    note: z.number()
        .min(1, { message: "La note doit être au moins 1" })
        .max(5, { message: "La note doit être au plus 5" }),
    comment: z.string().optional(),
    authorId: z.string().uuid({ message: "ID de l'auteur invalide" }),
    movieId: z.string().uuid({ message: "ID du film invalide" }),
});