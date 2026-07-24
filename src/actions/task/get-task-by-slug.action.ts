import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetTaskBySlugResponse } from "@/dtos/task.dto";

export const getTaskBySlugAction = async (
  boardId: number,
  taskSlug: string,
) => {
  const { data } = await kanbanApplicationApi.get<GetTaskBySlugResponse>(
    `/tasks/${taskSlug}/in-board/${boardId}`,
  );
  return data;
};
