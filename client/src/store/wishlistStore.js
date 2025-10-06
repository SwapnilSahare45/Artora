import { create } from "zustand"
import { addToWishlistService, getWishlistService, removeFromWishlistService } from "../services/wishlistService";

export const useWishlistStore = create((set) => ({
    wishlist: [],
    isLoading: false,
    error: null,

    // Add an artwork to wishlst
    addToWishlist: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await addToWishlistService(id);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },

    // Get all the artworks from wishlist
    getWishlist: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getWishlistService();
            set({ wishlist: response.data.wishlistItems, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },

    // Remove the artwork from wishlist
    removeFromWishlist: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await removeFromWishlistService(id);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    }
}));