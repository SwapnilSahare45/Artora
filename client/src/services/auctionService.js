import { api } from "./api"

export const getAuctionsService = async () => {
    return await api.get("auctions");
}