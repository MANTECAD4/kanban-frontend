import axios from "axios";

export const kanbanBackendApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
