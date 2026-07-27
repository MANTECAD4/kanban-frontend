import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { UpdateSubtaskResponse } from "@/dtos/subtask.dto";

interface Props {
  subtaskId: number;
  isCompleted: boolean;
}

export const updateSubtaskStatusAction = async ({
  subtaskId,
  ...submitData
}: Props) => {
  const { data } = await kanbanApplicationApi.patch<UpdateSubtaskResponse>(
    `/subtasks/${subtaskId}/change-status`,
    submitData,
  );
  return data;
};
