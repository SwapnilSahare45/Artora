import { create } from "zustand";
import { getOrderService, getOrdersService, placeOrderService } from "../services/orderService";

export const useOrderStore = create((set) => ({
    orders: [],
    order: null,
    isLoading: false,
    error: null,

    // Place order
    placeOrder: async (artworkId, quantity, shippingAddress, paymentMethod, paymentDetails) => {
        set({ isLoading: true });
        try {
            await placeOrderService(artworkId, quantity, shippingAddress, paymentMethod, paymentDetails);
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get orders
    getOrders: async () => {
        set({ isLoading: true });
        try {
            const response = await getOrdersService();
            set({ orders: response.data?.orders, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get order
    getOrder: async (id) => {
        set({ isLoading: true });
        try {
            const response = await getOrderService(id);
            set({ order: response.data?.order, isLoading: false });
        } catch (error) {
            set({ error: error.response.data?.message, isLoading: false });
        }
    },
}));