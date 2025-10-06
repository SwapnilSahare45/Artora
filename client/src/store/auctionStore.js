import { create } from "zustand";
import { createAuctionService, getAuctionService, getAuctionsService, updateAuctionService, deleteAuctionService } from "../services/auctionService";

export const useAuctionStore = create((set) => ({
    auctions: [],
    auction: null,
    isLoading: false,
    error: null,

    getAuctions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAuctionsService();
            set({ auctions: response.data?.auctions, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
            return { success: false };
        }
    },

    // Get a single auction
    getAuction: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAuctionService(id);
            set({ auction: response.data?.auction, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
            return { success: false };
        }
    },

    createAuction: async (auctionData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await createAuctionService(auctionData);

            set((state) => ({
                auctions: [...state.auctions, response.data?.auction],
                isLoading: false,
                error: null
            }));

            return { success: true, auction: response.data?.auction };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create auction.';
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    },

    updateAuction: async (id, auctionData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await updateAuctionService(id, auctionData);

            set((state) => ({
                auctions: state.auctions.map(a =>
                    a._id === id ? response.data.updatedAuction : a
                ),
                auction: state.auction?._id === id ? response.data.updatedAuction : state.auction,
                isLoading: false,
                error: null,
            }));

            return { success: true, updatedAuction: response.data.updatedAuction };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update auction.';
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    },

    deleteAuction: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteAuctionService(id);

            set((state) => ({
                auctions: state.auctions.filter(a => a._id !== id),
                auction: state.auction?._id === id ? null : state.auction,
                isLoading: false,
                error: null,
            }));

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete auction.';
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
        }
    },
}));