import axios from "axios";

export const kanbanAuthApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});
