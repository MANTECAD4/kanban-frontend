import { kanbanApplicationApi } from "@/api/kanban-application.api";

interface UpdateTaskColumnData {
  taskId: number;
  categoryId: number;
}

export const updateTaskCategoryAction = async ({
  taskId,
  categoryId,
}: UpdateTaskColumnData) => {
  const { data } = await kanbanApplicationApi.put(`/tasks/${taskId}/category`, {
    categoryId,
  });

  return data;
};
