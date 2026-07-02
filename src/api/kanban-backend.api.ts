import { useAuthStore } from "@/providers/store/auth.store";
import axios from "axios";

export const kanbanBackendApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

kanbanBackendApi.interceptors.request.use(
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
// kanbanBackendApi.interceptors.request.use((config) =>{
//   const token
// });
kanbanBackendApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.ChartConfig;

    // if(error.response.status === 401 && error!originalRequest._retry){
    //   try {
    //     const
    //   } catch (error) {

    //   }
    // }

    return Promise.reject(error);
  },
);
