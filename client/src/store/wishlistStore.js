import { create } from "zustand"
import { addToWishlistService, getWishlistService, removeFromWishlistService } from "../services/wishlistService";

// Create a zustand store for wishlist
export const useWishlistStore = create((set) => ({
    wishlist: [], // Stores wishlist items from wishlist request
    isLoading: false,
    error: null,

    // Add an artwork to wishlst
    addToWishlist: async (id) => {
        set({ isLoading: true });
        try {
            await addToWishlistService(id);
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },

    // Get all the artworks from wishlist
    getWishlist: async () => {
        set({ isLoading: true });
        try {
            const response = await getWishlistService();
            set({ wishlist: response.data.wishlistItems, isLoading: false });
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },

    // Remove the artwork from wishlist
    removeFromWishlist: async (id) => {
        set({ isLoading: true });
        try {
            await removeFromWishlistService(id);
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    }
}));