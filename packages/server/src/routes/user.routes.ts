import { Router } from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', [authMiddleware], deleteUser);

export default router;