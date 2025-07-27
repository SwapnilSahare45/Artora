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

// Get the artworks from auction with provided auction id
export const getAuctionArtworksService = async (id) => {
    return await api.get(`artworks/auction/${id}`);
};

// Get artwork with provided id
export const getArtworkService = async (id) => {
    return await api.get(`artworks/${id}`);
};

// Update artwork with provided id and data
export const updateArtworkService = async (id, data) => {
    return await api.put(`artworks/${id}`, data);
};

// Delete artwork with provided id
export const deleteArworkService = async (id) => {
    return await api.delete(`artworks/${id}`);
};