import { api } from "./api";

// Get logged-in user artworks
export const getMyArtworksService = async () => {
    return await api.get("artworks/my");
};

// Get artworks with provided query
export const getArtworksService = async () => {
    return await api.get("artworks");
};

// Get artwork with provided id
export const getArtworkService = async (id) => {
    return await api.get(`artworks/${id}`);
}