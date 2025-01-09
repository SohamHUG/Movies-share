import { Request, Response } from "express";

import { APIResponse, logger } from "../utils"
import { getAllUsers } from "../models/user.model";

export const getUsers = async (request: Request, response: Response) => {
    try {
        const users = await getAllUsers();

        APIResponse(response, users, "Tous les utilisateurs", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
        APIResponse(response, null, err.message, 500);
    }
}
