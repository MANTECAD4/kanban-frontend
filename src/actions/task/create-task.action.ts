import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { CreateTaskResponse, SubmitTaskState } from "@/dtos/task.dto";

type CreateTaskSubmitData = SubmitTaskState & { categoryId: number };

export const createTaskAction = async ({
  categoryId,
  ...submitData
}: CreateTaskSubmitData) => {
  await new Promise((r) => setTimeout(r, 3000));
  const { data } = await kanbanApplicationApi.post<CreateTaskResponse>(
    `/tasks/in-category/${categoryId}`,
    submitData,
  );
  return data;
};
