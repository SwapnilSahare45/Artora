import { api } from "./api"

// Get all acutions
export const getAuctionsService = async () => {
    return await api.get("auctions");
}

// Get a single auction
export const getAuctionService = async (id) => {
    return await api.get(`auctions/${id}`);
}