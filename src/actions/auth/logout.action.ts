import { kanbanApplicationApi } from "@/api/kanban-application.api";

export const logoutAction = async () => {
  const { data } = await kanbanApplicationApi.post("/auth/logout");
  return data;
};
