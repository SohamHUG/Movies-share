import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "../controllers/movie.controller";

const router = Router();

router.post('/', [authMiddleware], createMovie);

router.delete('/:id', [authMiddleware], deleteMovie)

router.put('/:id', [authMiddleware], updateMovie)

router.get('/', getMovies);

router.get('/:id', getMovieById)

export default router;