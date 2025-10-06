import { create } from "zustand";
import { addArtworkService, deleteArworkService, getArtworkService, getArtworksService, getAuctionArtworksService, getMyArtworksService, getThreeArtworkService, updateArtworkService } from "../services/artworkService";

export const useArtworkStore = create((set) => ({
    artworks: [],
    artwork: null,
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 1,
    limit: 12,

    getThreeArtwork: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getThreeArtworkService();
            set({ artworks: response.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
        }
    },

    // Add artwork
    addArtwork: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await addArtworkService(data);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get logged-in user artworks 
    getMyArtworks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getMyArtworksService();
            set({ artworks: response.data?.artworks, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get all artworks
    getArtworks: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const { page = 1, limit = 12, ...rest } = filters;
            const params = { page, limit, ...rest };
            const response = await getArtworksService(params);
            set({
                artworks: response.data.artworks,
                page: response.data.page,
                limit: response.data.limit,
                totalPages: response.data.totalPages,
                isLoading: false,
                error: null
            });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get auction artworks
    getAuctionArtworks: async (id, filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAuctionArtworksService(id, filters);
            set({
                artworks: response.data?.artworks,
                page: response.data.page,
                limit: response.data.limit,
                totalPages: response.data.totalPages,
                isLoading: false,
                error: null
            });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Set page 
    setPage: (page) => set({ page }),

    // Get artwork
    getArtwork: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await getArtworkService(id);
            set({ artwork: response.data.artwork, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Update artwork
    updateArtwork: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            await updateArtworkService(id, data);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },

    // Delete artwork
    deleteArtwork: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteArworkService(id);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },
}));