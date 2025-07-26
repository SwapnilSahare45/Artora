import { create } from "zustand";
import { getAuctionsService } from "../services/auctionService";

// Create a zustand store for auctions
export const useAuctionStore = create((set) => ({
    auctions: [], // Store an auction array
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
    }
}));