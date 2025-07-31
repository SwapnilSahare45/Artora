import { api } from "./api";

export const getNotificationsService = async () => {
    return await api.get("notifications");
};