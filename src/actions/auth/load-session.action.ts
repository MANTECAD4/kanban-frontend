import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SessionResponse } from "@/interfaces/session-response.interface";

export const loadSession = async () => {
  const { data } =
    await kanbanApplicationApi.post<SessionResponse>("/users/me");
  return data;
};
