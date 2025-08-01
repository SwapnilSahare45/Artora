import { api } from "./api";

// Get notifications
export const getNotificationsService = async () => {
    return await api.get("notifications");
};