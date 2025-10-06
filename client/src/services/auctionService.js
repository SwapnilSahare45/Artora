import { api } from "./api"

export const createAuctionService = async (auctionData) => {
    return await api.post("auctions", auctionData);
};

export const getAuctionsService = async () => {
    return await api.get("auctions");
};

export const getAuctionService = async (id) => {
    return await api.get(`auctions/${id}`);
};

export const updateAuctionService = async (id, auctionData) => {
    return await api.put(`auctions/${id}`, auctionData);
};

export const deleteAuctionService = async (id) => {
    return await api.delete(`auctions/${id}`);
};