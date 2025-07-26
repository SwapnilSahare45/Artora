import { create } from "zustand";
import { addArtworkService, getArtworkService, getArtworksService, getMyArtworksService } from "../services/artworkService";

// Create a zustand store for artwork
export const useArtworkStore = create((set) => ({
    artworks: [], // Store an artwork array
    artwork: null, // Store the artwork object
    isLoading: false, // Indicates if an artwork request in process
    error: null, // Store error messages from artwork request

    // Add artwork
    addArtwork: async (data) => {
        set({ isLoading: true });
        try {
            await addArtworkService(data);
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get logged-in user artworks 
    getMyArtworks: async () => {
        set({ isLoading: true });
        try {
            const response = await getMyArtworksService();
            set({ artworks: response.data?.artworks, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get all artworks
    getArtworks: async () => {
        set({ isLoading: true });
        try {
            const response = await getArtworksService();
            set({ artworks: response.data.artworks, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get artwork
    getArtwork: async (id) => {
        set({ isLoading: true });
        try {
            const response = await getArtworkService(id);
            set({ artwork: response.data.artwork, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}));