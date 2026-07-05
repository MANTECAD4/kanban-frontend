import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetProjectsResponse } from "@/interfaces/project.interface";

export const getUserProjectsAction = async () => {
  const { data } =
    await kanbanApplicationApi.get<GetProjectsResponse>("/projects");
  return data;
};
