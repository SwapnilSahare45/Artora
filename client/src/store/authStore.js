import { create } from "zustand";
import { loginUserService, registerUserService, verifyOTPService } from "../services/authService";

// Create a Zustand store for authentication
export const useAuthStore = create((set) => ({
    user: null,         // Stores the authenticated user object
    isLoading: false,   // Indicates if an auth request is in progress
    error: null,        // Stores error messages from auth requests

    // Register a new user
    register: async (data) => {
        set({ isLoading: true });
        try {
            const response = await registerUserService(data);
            set({ user: response.data, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Verify user with OTP code
    verifyUser: async (code) => {
        set({ isLoading: true });
        try {
            await verifyOTPService(code);
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Login user
    login: async (data) => {
        set({ isLoading: true });
        try {
            const response = await loginUserService(data);
            set({ user: response.data?.user, isLoading: false });
            return { success: true };
        } catch (error) {
            console.log(error)
            set({ error: error.response?.data?.message, isLoading: false })
        }
    }
}));