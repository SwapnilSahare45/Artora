import { create } from "zustand";
import { getNotificationsService } from "../services/notificationService";

export const useNotificationStore = create((set) => ({
    notifications: [],
    isLoading: false,
    error: null,

    // get notifications
    getNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getNotificationsService();
            set({
                notifications: response.data?.notifications,
                isLoading: false,
                error: null
            });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}));