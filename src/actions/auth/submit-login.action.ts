import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { LoginState } from "@/interfaces/auth.interface";
import type { SessionResponse } from "@/interfaces/session-response.interface";

export const submitLogin = async (loginData: LoginState) => {
  const { data } = await kanbanBackendApi.post<SessionResponse>(
    "/auth/login",
    loginData,
  );
  return data;
};
