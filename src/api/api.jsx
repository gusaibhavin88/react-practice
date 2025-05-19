import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL; // Ensure this line is before the axios call

console.log(baseURL, "baseURL");

export const api = axios.create({
  baseURL: `${baseURL}/api/v1`, // Create an axios instance with the base URL
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      // Don't parse if token is just a string
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (err) {
      console.error("Error accessing token from localStorage:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
