import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetSubtasksResponse } from "@/dtos/subtask.dto";

export const getSubtasksAction = async (taskId: number) => {
  const { data } = await kanbanApplicationApi.get<GetSubtasksResponse>(
    `/subtasks/in-task/${taskId}`,
  );
  return data;
};
