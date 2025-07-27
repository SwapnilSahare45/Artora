import { create } from "zustand";
import { getAuctionService, getAuctionsService } from "../services/auctionService";

// Create a zustand store for auctions
export const useAuctionStore = create((set) => ({
    auctions: [], // Store an auction array
    auction: null, // Store an auction object
    isLoading: false, // Indicates if an auction request in process
    error: null, // Store error message from auction request

    // Get all auctions
    getAuctions: async () => {
        set({ isLoading: true });
        try {
            const response = await getAuctionsService();
            set({ auctions: response.data?.auctions, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get a single auction
    getAuction: async (id) => {
        set({ isLoading: true });
        try {
            const response = await getAuctionService(id);
            set({ auction: response.data?.auction, isLoading: false });
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },
}));