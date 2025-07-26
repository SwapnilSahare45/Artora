import { api } from "./api";

// Add artwork
export const addArtworkService = async (data) => {
    return await api.post("artworks", data);
};

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