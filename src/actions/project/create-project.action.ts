import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitProjectState } from "@/dtos/project.dto";
import type { CreateProjectResponse } from "@/interfaces/project.interface";

export type CreateProjectSubmitData = SubmitProjectState & { slug: string };
export const createProjectAction = async (
  sumbitData: CreateProjectSubmitData,
) => {
  const { data } = await kanbanApplicationApi.post<CreateProjectResponse>(
    "/projects",
    sumbitData,
  );
  return data;
};
