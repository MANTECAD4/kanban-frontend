import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { SessionResponse } from "@/interfaces/session-response.interface";

export const loadSession = async () => {
  const { data } = await kanbanBackendApi.get<SessionResponse>("/users/me");
  return data;
};
