import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { GetProjectsResponse } from "@/interfaces/projetc.interface";

export const getUserProjectsAction = async () => {
  const { data } = await kanbanBackendApi.get<GetProjectsResponse>("/projects");
  return data;
};
