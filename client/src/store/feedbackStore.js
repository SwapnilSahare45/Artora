import { create } from "zustand";
import { getThreeFeedbackService, giveFeedbackService } from "../services/feedbackService";

export const useFeedbackStore = create((set) => ({
    feedbacks: [],
    isLoading: false,
    error: null,

    // three random feedback
    getThreeFeedback: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getThreeFeedbackService();
            set({ feedbacks: response.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
        }
    },

    // Submit feedback
    giveFeedback: async (rating, feedback) => {
        set({ isLoading: true, error: null });
        try {
            await giveFeedbackService(rating, feedback);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}));