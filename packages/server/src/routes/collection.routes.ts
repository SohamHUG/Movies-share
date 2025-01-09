import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addToCollection, getCollections, getMyCollection, removeFromCollection, updateCollection } from '../controllers/collection.controller';

const router = Router();

router.post('/', [authMiddleware], addToCollection)

router.get('/my', [authMiddleware], getMyCollection);

router.get('/', getCollections)

router.put('/', [authMiddleware], updateCollection)

router.delete('/:id', [authMiddleware], removeFromCollection)

export default router;