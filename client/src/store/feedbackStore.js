import { create } from "zustand";
import { getThreeFeedbackService, giveFeedbackService } from "../services/feedbackService";

export const useFeedbackStore = create((set) => ({
    feedbacks: [],
    isLoading: false,
    error: null,

    // three random feedback
    getThreeFeedback: async () => {
        set({ isLoading: true });
        try {
            const response = await getThreeFeedbackService();
            set({ feedbacks: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
        }
    },

    // Submit feedback
    giveFeedback: async (rating, feedback) => {
        set({ isLoading: true });
        try {
            await giveFeedbackService(rating, feedback);
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}))