import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { deleteMovieById, findAllMovies, findMovieById, pushMovie, updateMovieById } from "../models/movie.model";
import { request } from "http";

export const createMovie = async (request: Request, response: Response) => {

    const { title, description, producer, releaseYear } = request.body
    const publishedBy = response.locals.user.userId

    const newMovie = { title, description, producer, releaseYear, publishedBy };

    await pushMovie(newMovie);
    APIResponse(response, newMovie, "Movie publié", 201);
}

export const getMovies = async (request: Request, response: Response) => {
    const movies = await findAllMovies();

    APIResponse(response, movies, "Tous les films", 200);
}

export const getMovieById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const movie = await findMovieById(id);

    if (movie.length > 0) {
        APIResponse(response, movie, "Movie found", 200);
    } else {
        APIResponse(response, null, "Movie not found", 404);
    }
}

export const deleteMovie = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deleteMovieById(id, userId);
    APIResponse(response, null, "Movie deleted", 204);
}

export const updateMovie = async (request: Request, response: Response) => {

    const { id } = request.params;
    const { title, description, producer, releaseYear } = request.body
    const publishedBy = response.locals.user.userId

    const post = { title, description, producer, releaseYear, publishedBy };

    await updateMovieById(id, post);
    APIResponse(response, post, "Post updated", 200);
}