import { create } from "zustand";
import { getAllUsersService, deleteUserService, getAllArtworksService, getAllArtworksInAuctionService, updateUserService, deleteArtworkService, getAllOrdersService, updateOrderStatusService, deleteOrderService } from "../services/adminService";

export const useAdminStore = create((set) => ({
    users: [],
    artworks: [],
    orders: [],
    isLoading: false,
    error: null,

    getUsers: async (searchTerm = '') => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAllUsersService(searchTerm);
            set({ users: response.data?.users, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    updateUser: async (userId, role) => {
        set({ isLoading: true, error: null });
        try {
            const response = await updateUserService(userId, role);
            set((state) => ({
                users: state.users.map((user) =>
                    user._id === userId ? response.data.user : user
                ),
                isLoading: false,
                error: null
            }));
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    deleteUser: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            await deleteUserService(userId);
            set((state) => ({
                users: state.users.filter((user) => user._id !== userId),
                isLoading: false,
                error: null
            }));
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    getArtworks: async (inputSearch = '') => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAllArtworksService(inputSearch);
            set({ artworks: response.data?.artworks, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    getArtworksInAuction: async (inputSearch = '') => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAllArtworksInAuctionService(inputSearch);
            set({ artworks: response.data?.artworks, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    deleteArtwork: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteArtworkService(id);
            set((state) => ({
                artworks: state.artworks.filter((artwork) => artwork._id !== id),
                isLoading: false,
                error: null
            }));
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    getAllOrders: async (inputSearch = '') => {
        set({ isLoading: true, error: null });
        try {
            const response = await getAllOrdersService(inputSearch);
            set({ orders: response.data?.orders, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    updateOrderStatus: async (orderId, status) => {
        set({ isLoading: true, error: null });
        try {
            const response = await updateOrderStatusService(orderId, status);
            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId ? response.data.order : order
                ),
                isLoading: false,
                error: null
            }));
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

     deleteOrder: async (orderId) => {
        set({ isLoading: true, error: null });
        try {
            await deleteOrderService(orderId);
            set((state) => ({
                orders: state.orders.filter((order) => order._id !== orderId),
                isLoading: false,
                error: null
            }));
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}));