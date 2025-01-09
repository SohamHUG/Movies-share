import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createMovie, deleteMovieById, getMovieById, getMovies, updateMovieById } from "../controllers/movie.controller";

const router = Router();

router.post('/', [authMiddleware], createMovie);

router.delete('/:id', [authMiddleware], deleteMovieById)

router.put('/:id', [authMiddleware], updateMovieById)

router.get('/', getMovies);

router.get('/:id', getMovieById)

export default router;