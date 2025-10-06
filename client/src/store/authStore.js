import { create } from "zustand";
import { loginUserService, logoutService, profileService, registerUserService, updateProfileService, verifyOTPService } from "../services/authService";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Register a new user
    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await registerUserService(data);
            set({ user: response.data, isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Verify user with OTP code
    verifyUser: async (code) => {
        set({ isLoading: true, error: null });
        try {
            await verifyOTPService(code);
            set({ isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Login user
    login: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await loginUserService(data);
            set({
                user: response.data?.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
            return { success: true };
        } catch (error) {
            set({
                error: error.response?.data?.message,
                isAuthenticated: false,
                isLoading: false
            });
        }
    },

    // Get profile
    profile: async () => {
        try {
            const response = await profileService();
            set({
                user: response?.data,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
        } catch (error) {
            set({
                error: error.response?.data?.message,
                isAuthenticated: false,
                isLoading: false
            });
        }
    },

    // Update profile
    updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await updateProfileService(data);
            set({ user: response.data?.updatedMe, isLoading: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // logout
    logout: async () => {
        try {
            await logoutService();
            set({ user: null, isAuthenticated: false, error: null });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message });
            return { success: false };
        }
    }
}));