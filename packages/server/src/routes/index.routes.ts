import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import movieRoutes from './movie.routes'
import reviewRoutes from './review.routes'

const router = Router();

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use('/reviews', reviewRoutes)

export default router;