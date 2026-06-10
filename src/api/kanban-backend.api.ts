import { useAuthStore } from "@/providers/store/auth.store";
import axios from "axios";

export const kanbanBackendApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

kanbanBackendApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      "Request:",
      config.method,
      config.url,
      config.headers.Authorization,
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// kanbanBackendApi.interceptors.request.use((config) =>{
//   const token
// });
