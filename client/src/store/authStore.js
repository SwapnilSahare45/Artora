import { create } from "zustand";
import { getUserProfileService, getUsersService, loginUserService, logoutService, profileService, registerUserService, updateProfileService, verifyOTPService } from "../services/authService";

// Create a Zustand store for authentication
export const useAuthStore = create((set) => ({
    users: [], // Store users array from auth request
    user: null, // Stores the authenticated user object
    isAuthenticated: false,
    isLoading: false, // Indicates if an auth request is in progress
    error: null, // Stores error messages from auth requests

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
            set({ user: response.data?.user, isAuthenticated: true, isLoading: false });
            return { success: true };
        } catch (error) {
            console.log(error)
            set({ error: error.response?.data?.message, isAuthenticated: false, isLoading: false });
        }
    },

    // Get profile
    profile: async () => {
        try {
            const response = await profileService();
            set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Update profile
    updateProfile: async (data) => {
        set({ isLoading: true });
        try {
            const response = await updateProfileService(data);
            set({ user: response.data?.updatedMe, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get users
    getUsers: async () => {
        set({ isLoading: true });
        try {
            const response = await getUsersService();
            set({ users: response.data?.users, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // Get user profiles
    getUserProfile: async (id) => {
        set({ isLoading: true });
        try {
            const response = await getUserProfileService(id);
            set({ user: response.data?.user, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },

    // logout
    logout: () => {
        logoutService();
        set({ user: null, isAuthenticated: false });
        return { success: true };
    },
}));