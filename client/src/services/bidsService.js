import { api } from "./api";

// Place bids for artwork in auction
export const placeBidService = async (id) => {
    return await api.post(`artworks/${id}/bid`);
}