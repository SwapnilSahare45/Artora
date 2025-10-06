import { api } from "./api"

export const getAllUsersService = async (searchTerm = '') => {
    const url = searchTerm ? `admin/users?query=${encodeURIComponent(searchTerm)}` : "admin/users";
    return await api.get(url);
};

export const updateUserService = async (userId, role) => {
    return await api.put(`admin/users/${userId}`, { role });
};

export const deleteUserService = async (userId) => {
    return await api.delete(`admin/users/${userId}`);
};

export const getAllArtworksService = async (inputSearch = '') => {
    const url = inputSearch ? `admin/artworks?query=${encodeURIComponent(inputSearch)}` : "admin/artworks";
    return await api.get(url);
};

export const getAllArtworksInAuctionService = async (inputSearch = '') => {
    const url = inputSearch ? `admin/artworks/auction?query=${encodeURIComponent(inputSearch)}` : "admin/artworks/auction";
    return await api.get(url);
};

export const deleteArtworkService = async (id) => {
    return await api.delete(`admin/artwork/${id}`);
};

export const getAllOrdersService = async (inputSearch = '') => {
    const url = inputSearch ? `admin/orders?query=${encodeURIComponent(inputSearch)}` : "admin/orders";
    return await api.get(url);
};

export const updateOrderStatusService = async (orderId, status) => {
    return await api.put(`admin/orders/${orderId}`, { status });
};

export const deleteOrderService = async (orderId) => {
    return await api.delete(`admin/order/${orderId}`);
};