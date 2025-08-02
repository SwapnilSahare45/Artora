import { api } from "./api";

// Registers a new user with the provided data
export const registerUserService = async (data) => {
    return await api.post("auth/register", data);
};

// Verify user with the provided data
export const verifyOTPService = async (code) => {
    return await api.post("auth/verify-otp", code);
};

// Login user with provided data
export const loginUserService = async (data) => {
    return await api.post("auth/login", data);
};

// Get logged-in user profile
export const profileService = async () => {
    return await api.get("/auth/me");
};

// Update logged-in user profile
export const updateProfileService = async (data) => {
    return await api.put("/auth/me", data);
};

// Get all users except logged-in user
export const getUsersService = async () => {
    return await api.get("/auth/users");
};

// Get user profile
export const getUserProfileService = async (id) => {
    return await api.get(`/auth/profile/${id}`);
};

// Logout
export const logoutService = async () => {
    return await api.post("auth/logout");
}