import { create } from "zustand";
import { placeBidService } from "../services/bidsService";

export const useBidsStore = create((set) => ({
    bids: [],
    isLoading: false,
    error: null,

    // Place bid
    placeBid: async (id) => {
        set({isLoading:true});
        try {
            const response = await placeBidService(id);
            console.log(response)
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
        }
    }
}))