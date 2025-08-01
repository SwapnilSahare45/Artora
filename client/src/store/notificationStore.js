import { create } from "zustand";
import { getNotificationsService } from "../services/notificationService";

export const useNotificationStore = create((set) => ({
    notifications: [],
    isLoading: false,
    error: null,

    // get notifications
    getNotifications: async () => {
        set({ isLoading: true });
        try {
            const response = await getNotificationsService();
            set({ notifications: response.data?.notifications, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}));