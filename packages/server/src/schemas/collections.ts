import { uuid, pgTable, timestamp, uuid as uuidType, pgEnum } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { users } from "./users";

export const statusEnum = pgEnum("status_enum", ["to_watch", "watched"]);

export const collections = pgTable("collections", {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: "cascade" }).notNull(),
    movieId: uuid('movie_id').references(() => movies.id, { onDelete: "cascade" }).notNull(),
    status: statusEnum('status').notNull().default('to_watch'),
    addedOn: timestamp('added_on').defaultNow()
});