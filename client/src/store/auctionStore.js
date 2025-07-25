import { create } from "zustand";
import { getAuctionsService } from "../services/auctionService";

export const useAuctionStore = create((set) => ({
    auctions: [],
    isLoading: false,
    error: null,

    getAuctions: async () => {
        set({ isLoading: true });
        try {
            const response = await getAuctionsService();
            set({ auctions: response.data?.auctions, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}))