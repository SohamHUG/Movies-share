import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { collections } from "../schemas";

// Un type pour le modèle d'une collections au moment de la selection dans la DB
export type Collection = InferSelectModel<typeof collections>;

// Un type pour le modèle d'une collections au moment de son insertion dans la DB
export type NewCollection = InferInsertModel<typeof collections>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table collections
export type CollectionColumns = { [K in keyof Collection]?: boolean };