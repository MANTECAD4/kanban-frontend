import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { CreateProjectState } from "@/dtos/project.dto";
import type { CreateProjectResponse } from "@/interfaces/projetc.interface";

export type CreateProjectSubmitData = CreateProjectState & { slug: string };
export const createProjectAction = async (
  sumbitData: CreateProjectSubmitData,
) => {
  const { data } = await kanbanApplicationApi.post<CreateProjectResponse>(
    "/projects",
    sumbitData,
  );
  return data;
};
