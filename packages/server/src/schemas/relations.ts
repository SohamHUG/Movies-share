import { relations } from "drizzle-orm";
import { users, movies, reviews, collections } from "./";

export const userRelations = relations(users, ({ many }) => ({
    moviesPublished: many(movies), 
    reviews: many(reviews), 
    collections: many(collections) 
}));

export const movieRelations = relations(movies, ({ one, many }) => ({
    publishedBy: one(users, { 
        fields: [movies.publishedBy],
        references: [users.id]
    }),
    reviews: many(reviews) 
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
    author: one(users, { 
        fields: [reviews.authorId],
        references: [users.id]
    }),
    movie: one(movies, { 
        fields: [reviews.movieId],
        references: [movies.id]
    })
}));

export const collectionRelations = relations(collections, ({ one, many }) => ({
    user: one(users, { 
        fields: [collections.userId],
        references: [users.id]
    }),
    movies: one(movies, { 
        fields: [collections.movieId],
        references: [movies.id]
    })
}));
