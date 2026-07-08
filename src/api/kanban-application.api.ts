import { kanbanAuthApi } from "@/api/kanban-auth.api";
import { useAuthStore } from "@/providers/store/auth.store";
import axios from "axios";

export const kanbanApplicationApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

kanbanApplicationApi.interceptors.request.use(
  (config) => {
    // throw "lol";
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

kanbanApplicationApi.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const { data } = await kanbanAuthApi.post("/refresh");
        // Make a request to your auth server to ref
        if (!data || !data.accessToken) return Promise.reject(error);
        // Store the new access and refresh tokens.
        useAuthStore.getState().setAccessToken(data.accessToken);
        // Update the authorization header with the new access token.
        kanbanApplicationApi.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        return kanbanApplicationApi(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        useAuthStore.getState().clearSession();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);
