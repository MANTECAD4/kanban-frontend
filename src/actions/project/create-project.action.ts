import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { CreateProjectState } from "@/interfaces/project.dto";
import type { CreateProjectResponse } from "@/interfaces/projetc.interface";

export const createProjectAction = async (sumbitData: CreateProjectState) => {
  const { data } = await kanbanBackendApi.post<CreateProjectResponse>(
    "/projects",
    sumbitData,
  );
  return data;
};
