import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { RegisterState } from "@/interfaces/auth.interface";

export const submitRegisterData = async (registerData: RegisterState) => {
  const { data } = await kanbanApplicationApi.post(
    "/auth/register",
    registerData,
  );
  return data;
};
