import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const movies = pgTable("movies", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    producer: varchar('producer', {length: 255}).notNull(),
    releaseYear: integer('release_year').notNull(),
    publishedBy: uuid('published_by').references(() => users.id, { onDelete: "cascade" }).notNull(),
    publishedOn: timestamp('published_on').defaultNow() 
});