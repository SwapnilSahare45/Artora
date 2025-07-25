import { api } from "./api";

export const getArtworksService = async () => {
    return await api.get("artworks");
};

export const getArtworkService = async (id) => {
    return await api.get(`artworks/${id}`);
}