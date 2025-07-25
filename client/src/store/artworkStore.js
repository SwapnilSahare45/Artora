import { create } from "zustand";
import { getArtworkService, getArtworksService } from "../services/artworkService";

export const useArtworkStore = create((set) => ({
    artworks: [],
    artwork: null,
    isLoading: false,
    error: null,

    getArtworks: async () => {
        set({ isLoading: true });
        try {
            const response = await getArtworksService();
            set({ artworks: response.data.artworks, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    getArtwork: async (id) => {
        set({ isLoading: true });
        try {
            const response = await getArtworkService(id);
            set({ artwork: response.data.artwork, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}))