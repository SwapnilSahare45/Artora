import { create } from "zustand";
import { giveFeedbackService } from "../services/feedbackService";

export const useFeedbackStore = create((set) => ({
    feedbacks: [],
    isLoading: false,
    error: null,

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