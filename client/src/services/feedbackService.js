import { api } from "./api";

// Get the three random feedback
export const getThreeFeedbackService = async () => {
    return await api.get("feedback/random");
};

// Submit feedback
export const giveFeedbackService = async (rating, feedback) => {
    const body = { rating, feedback };
    return await api.post("feedback", body);
};