import { kanbanBackendApi } from "@/api/kanban-backend.api";
import type { CreateProjectState } from "@/dtos/project.dto";
import type { CreateProjectResponse } from "@/interfaces/projetc.interface";

export type CreateProjectSubmitData = CreateProjectState & { slug: string };
export const createProjectAction = async (
  sumbitData: CreateProjectSubmitData,
) => {
  const { data } = await kanbanBackendApi.post<CreateProjectResponse>(
    "/projects",
    sumbitData,
  );
  return data;
};
