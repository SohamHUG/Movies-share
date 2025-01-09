import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { request } from "http";
import { existingEntry, findMyCollection, pushCollection } from "../models/collection.models";

export const addToCollection = async (request: Request, response: Response) => {
    try {
        const { movieId, status = "to_watch" } = request.body
        const userId = response.locals.user.userId;

        const exist = await existingEntry(movieId, userId);

        if (exist && exist.length > 0) {
            APIResponse(response, [], "Ce film est déjà dans votre collection", 400);
        }

        const newCollection = { movieId, status, userId };

        await pushCollection(newCollection);
        APIResponse(response, newCollection, "Film ajouté à la collection", 201);
    } catch (err: any) {
        logger.error(`Erreur lors de l'ajout à la collection: ${err.message}`);
        APIResponse(response, null, "Erreur serveur", 500);
    }
}

export const getMyCollection = async (request: Request, response: Response) => {
    const userId = response.locals.user.userId;

    const collection = await findMyCollection(userId);

    if (collection && collection.length > 0) {
        APIResponse(response, collection, "collection found", 200);
    } else {
        APIResponse(response, null, "collection not found", 404);
    }
}