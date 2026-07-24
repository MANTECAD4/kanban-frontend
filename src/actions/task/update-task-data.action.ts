import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type {
  FormTaskState,
  SubmitTaskState,
  UpdateTaskResponse,
} from "@/dtos/task.dto";

type Props = SubmitTaskState & { taskId: number };

export const updateTaskDataAction = async ({
  taskId,
  ...submitData
}: Props) => {
  const { data } = await kanbanApplicationApi.put<UpdateTaskResponse>(
    `/tasks/${taskId}`,
    submitData,
  );
  return data;
};
