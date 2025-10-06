import { create } from "zustand";
import { placeBidService } from "../services/bidsService";

export const useBidsStore = create((set) => ({
    bids: [],
    isLoading: false,
    error: null,

    // Place bid
    placeBid: async (id) => {
        set({isLoading:true, error:null});
        try {
            const response = await placeBidService(id);
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
        }
    },
    
}));