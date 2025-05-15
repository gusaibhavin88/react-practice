import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL; // Ensure this line is before the axios call

console.log(baseURL, "baseURL");

export const api = axios.create({
  baseURL: `${baseURL}/api/v1`, // Create an axios instance with the base URL
});
