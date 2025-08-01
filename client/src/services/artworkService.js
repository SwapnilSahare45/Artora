import { api } from "./api";

// Get the three random artworks
export const getThreeArtworkService = async () => {
    return await api.get("artworks/random");
};

// Add artwork
export const addArtworkService = async (data) => {
    return await api.post("artworks", data);
};

// Get logged-in user artworks
export const getMyArtworksService = async () => {
    return await api.get("artworks/my");
};

// Get artworks with provided query
export const getArtworksService = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await api.get(`artworks?${query}`);
};

// Get the artworks from auction with provided auction id
export const getAuctionArtworksService = async (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await api.get(`artworks/auction/${id}?${query}`);
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