import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { LoginState } from "@/features/auth/interfaces/kanban/auth.interface";

export const submitLogin = async (loginData: LoginState) => {
  const { data } = await kanbanBackendApi.post("/auth/login", loginData);
  return data;
};
