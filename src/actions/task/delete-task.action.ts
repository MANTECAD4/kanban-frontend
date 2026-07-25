import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteTaskResponse } from "@/dtos/task.dto";

export const deleteTaskAction = async (taskId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteTaskResponse>(
    `/tasks/${taskId}`,
  );
  return data;
};
