import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { request } from "http";
import { deleteFromCollection, existingEntry, findAllCollections, findMyCollection, pushCollection, updateCollectionStatus } from "../models/collection.models";
import { findUserById } from "../models/user.model";

export const addToCollection = async (request: Request, response: Response) => {
    try {
        const { movieId, status } = request.body
        const userId = response.locals.user.userId;

        const exist = await existingEntry(movieId, userId);

        if (exist && exist.length > 0) {
            return APIResponse(response, [], "Ce film est déjà dans votre collection", 400);
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

    const user = await findUserById(userId);

    if (collection && collection.length > 0) {
        APIResponse(response, collection, `collection de ${user[0].username}`, 200);
    } else {
        APIResponse(response, null, "collection not found", 404);
    }
}

export const getCollections = async (request: Request, response: Response) => {
    const collections = await findAllCollections();

    APIResponse(response, collections, "Toutes les collections", 200);
}

export const updateCollection = async (request: Request, response: Response) => {
    try {
        const { movieId, status } = request.body
        const userId = response.locals.user.userId;

        const collection = { movieId, status, userId };

        await updateCollectionStatus(collection);
        APIResponse(response, collection, "Collection modifié", 201);
    } catch (err: any) {
        logger.error(`Erreur lors de la modification de la collection: ${err.message}`);
        APIResponse(response, null, "Erreur serveur", 500);
    }
}

export const removeFromCollection = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deleteFromCollection(id, userId);
    APIResponse(response, null, "Movie deleted from collection", 204);
}