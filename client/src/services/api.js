import axios from "axios";

// Create an axios instance with default configuration
export const api = axios.create({
    baseURL: "http://localhost:5000/api/", // Base URL for API requests
    withCredentials: true, // Send cookies with requests
});