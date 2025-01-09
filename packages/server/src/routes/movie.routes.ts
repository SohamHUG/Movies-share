import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createMovie, getMovies } from "../controllers/movie.controller";

const router = Router();

router.post('/', [authMiddleware], createMovie);

router.get('/', getMovies);

export default router;