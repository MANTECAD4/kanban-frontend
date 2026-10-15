import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { type RegisterState } from "@/interfaces/auth.interface";
import { type SessionResponse } from "@/interfaces/session-response.interface";

export const submitRegisterData = async (registerData: RegisterState) => {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const { data } = await kanbanApplicationApi.post<SessionResponse>(
    "/auth/register",
    registerData,
  );
  return data;
};
