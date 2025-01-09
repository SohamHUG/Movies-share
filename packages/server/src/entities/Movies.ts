import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { movies } from "../schemas";

// Un type pour le modèle d'un movie au moment de la selection dans la DB
export type Movie = InferSelectModel<typeof movies>;

// Un type pour le modèle d'un movie au moment de son insertion dans la DB
export type NewMovie = InferInsertModel<typeof movies>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table movie
export type MovieColumns = { [K in keyof Movie]?: boolean };