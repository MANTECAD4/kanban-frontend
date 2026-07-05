import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetProjectBySlugResponse } from "@/interfaces/project.interface";

export const getProjectBySlugAction = async (slug: string) => {
  const { data } = await kanbanApplicationApi.get<GetProjectBySlugResponse>(
    `/projects/${slug}`,
  );
  return data;
};
