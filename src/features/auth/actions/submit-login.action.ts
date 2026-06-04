import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { LoginState } from "@/features/auth/interfaces/auth/login.interface";

export const submitLogin = async (loginData: LoginState) => {
  const { data } = await kanbanBackendApi.post("/auth/login", loginData);
  return data;
};
