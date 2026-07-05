import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteProjectResponse } from "@/interfaces/project.interface";

export const deleteProjectAction = async (projectId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteProjectResponse>(
    `/projects/${projectId}`,
  );
  return data;
};
