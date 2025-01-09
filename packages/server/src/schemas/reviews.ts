import { pgTable, uuid, text, timestamp, integer, check,  } from "drizzle-orm/pg-core";
import { users, movies } from "./";

export const reviews = pgTable("reviews",
    {
        id: uuid('id').defaultRandom().primaryKey(),
        movieId: uuid('movie_id').references(() => movies.id, { onDelete: "cascade" }).notNull(),
        authorId: uuid('author_id').references(() => users.id, { onDelete: "cascade" }).notNull(),
        note: integer('note').notNull(),
        comment: text('comment'),
        createdAt: timestamp('created_at').defaultNow()
    },
    
);