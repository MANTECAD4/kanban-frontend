import axios from "axios";

export const kanbanAuthApi = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true,
});
