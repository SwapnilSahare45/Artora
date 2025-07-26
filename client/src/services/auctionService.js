import { api } from "./api"

// Get all acutions
export const getAuctionsService = async () => {
    return await api.get("auctions");
}