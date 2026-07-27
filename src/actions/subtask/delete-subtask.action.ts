import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteSubtaskResponse } from "@/dtos/subtask.dto";

export const deleteSubtaskAction = async (subtaskId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteSubtaskResponse>(
    `/subtasks/${subtaskId}`,
  );
  return data;
};
