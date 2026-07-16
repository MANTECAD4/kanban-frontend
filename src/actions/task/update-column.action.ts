import { kanbanApplicationApi } from "@/api/kanban-application.api";

interface UpdateTaskColumnData {
  taskId: number;
  categoryId: number;
}

export const updateTaskColumnAction = async ({
  taskId,
  categoryId,
}: UpdateTaskColumnData) => {
  const { data } = await kanbanApplicationApi.put(
    `/tasks/${taskId}/status-column`,
    categoryId,
  );

  return data;
};
