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
}