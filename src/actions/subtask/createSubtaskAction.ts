import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { CreateSubtaskResponse } from "@/dtos/subtask.dto";

interface Props {
  taskId: number;
  description: string;
}

export const createSubtaskAction = async ({ taskId, ...submitData }: Props) => {
  const { data } = await kanbanApplicationApi.post<CreateSubtaskResponse>(
    `/subtasks/in-task/${taskId}`,
    submitData,
  );
  return data;
};
