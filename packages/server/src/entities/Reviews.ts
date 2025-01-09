import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { reviews } from "../schemas";

// Un type pour le modèle d'une Review au moment de la selection dans la DB
export type Review = InferSelectModel<typeof reviews>;

// Un type pour le modèle d'une Review au moment de son insertion dans la DB
export type NewReview = InferInsertModel<typeof reviews>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table Review
export type ReviewColumns = { [K in keyof Review]?: boolean };