import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitProjectState } from "@/dtos/project.dto";
import type { UpdateProjectResponse } from "@/interfaces/project.interface";

export type UpdateProjectData = SubmitProjectState & { slug: string };

export const updateProjectAction = async ({
  projectId,
  projectData,
}: {
  projectId: number;
  projectData: UpdateProjectData;
}) => {
  const { data } = await kanbanApplicationApi.put<UpdateProjectResponse>(
    `/projects/${projectId}`,
    projectData,
  );
  return data;
};
