import { create } from "zustand";
import { getNotificationsService } from "../services/notificationService";

export const useNotificationStore = create((set) => ({
    notifications: [],
    isLoading: false,
    error: null,

    getNotifications: async () => {
        set({ isLoading: true });
        try {
            const response = await getNotificationsService();
            set({ notifications: response.data?.notification, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}));