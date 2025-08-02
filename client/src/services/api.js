import axios from "axios";

// Create an axios instance with default configuration
export const api = axios.create({
    baseURL: import.meta.env.VITE_ARTORA_API_BASE_URL, // Base URL for API requests
    withCredentials: true, // Send cookies with requests
});