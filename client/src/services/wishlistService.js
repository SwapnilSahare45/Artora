import { api } from "./api";

// Add an artwork to logged-in user wishlist
export const addToWishlistService = async (id) => {
    return await api.post(`wishlist/${id}`);
};

// Get the wishlist of logged-in user
export const getWishlistService = async () => {
    return await api.get("wishlist");
};

// Remove an artwork from logged-in user wishlist
export const removeFromWishlistService = async (id) => {
    return await api.delete(`wishlist/${id}`);
}