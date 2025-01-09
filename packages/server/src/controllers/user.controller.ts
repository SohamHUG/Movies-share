import { Request, Response } from "express";

import { APIResponse, logger } from "../utils"
import { deleteUserById, findAllUsers, findUserById } from "../models/user.model";

export const getUsers = async (request: Request, response: Response) => {
    try {
        const users = await findAllUsers();

        APIResponse(response, users, "Tous les utilisateurs", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
        APIResponse(response, null, err.message, 500);
    }
}

export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    const user = await findUserById(id);

    if (user && user.length > 0) {
        APIResponse(response, user, "User found", 200)
    } else {
        APIResponse(response, null, "User not found", 404)
    }
}

export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deleteUserById(id, userId);
    response.clearCookie('accessToken');
    APIResponse(response, null, "User deleted", 204);
}

