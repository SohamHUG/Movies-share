import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addToCollection, getMyCollection } from '../controllers/collection.controller';

const router = Router();

router.post('/add', [authMiddleware], addToCollection)

router.get('/my', [authMiddleware], getMyCollection)

export default router;