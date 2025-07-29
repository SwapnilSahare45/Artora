import { api } from "./api";

// Submit feedback
export const giveFeedbackService = async (rating, feedback) => {
    const body = { rating, feedback };
    return await api.post("feedback", body);
};