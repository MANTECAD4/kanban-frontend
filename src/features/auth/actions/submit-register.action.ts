import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { RegisterState } from "@/features/auth/interfaces/kanban/auth.interface";

export const submitRegisterData = async (registerData: RegisterState) => {
  const { data } = await kanbanBackendApi.post("/auth/register", registerData);
  return data;
};
