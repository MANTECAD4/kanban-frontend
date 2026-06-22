import { kanbanBackendApi } from "@/shared/api/kanban-backend.api";
import type { SessionResponse } from "@/shared/interfaces/session-response.interface";

export const loadSession = async () => {
  const { data } = await kanbanBackendApi.get<SessionResponse>("/users/me");
  return data;
};
