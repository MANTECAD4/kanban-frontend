import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { CreateTaskResponse, SubmitTaskState } from "@/dtos/task.dto";

type CreateTaskSubmitData = SubmitTaskState & { categoryId: number };

export const createTaskAction = async ({
  categoryId,
  ...submitData
}: CreateTaskSubmitData) => {
  const { data } = await kanbanApplicationApi.post<CreateTaskResponse>(
    `/tasks/in-column/${categoryId}`,
    submitData,
  );
  return data;
};
