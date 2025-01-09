import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { findAllMovies, pushMovie } from "../models/movie.model";

export const createMovie = async (request: Request, response: Response) => {

    const { title, description, producer, releaseYear } = request.body
    const publishedBy = response.locals.user.userId

    const newMovie = { title, description, producer, releaseYear, publishedBy };

    await pushMovie(newMovie);
    APIResponse(response, newMovie, "Movie publié", 201);
}

export const getMovies = async (request: Request, response: Response) => {
    try {
        const movies = await findAllMovies();

        APIResponse(response, movies, "Tous les films", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
        APIResponse(response, null, err.message, 500);
    }
}