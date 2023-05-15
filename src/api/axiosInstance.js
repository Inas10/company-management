import axios from "axios";
import {store} from '../app/store'
import { logout } from "../redux/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is valid, return it as is
    return response;
  },
  async (error) => {
    //const originalRequest = error.config;
    // Check if the response status is 401 (unauthorized) and the error message indicates an invalid token
    if (
      error.response.status === 401 &&
      error.response.statusText === "Invalid token"
    ) {
        store.dispatch(logout());

    }

    if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
          
        store.dispatch(logout());
        // Add logic to refresh the token using your authentication mechanism
      }

    // If the response status is not 401 or the error message is not related to an invalid token, return the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
