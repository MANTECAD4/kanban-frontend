import { kanbanApplicationApi } from "@/api/kanban-application.api";

interface UpdateTaskColumnData {
  taskId: number;
  categoryId: number;
}

export const updateTaskCategoryAction = async ({
  taskId,
  categoryId,
}: UpdateTaskColumnData) => {
  const { data } = await kanbanApplicationApi.patch(
    `/tasks/${taskId}/change-category`,
    {
      categoryId,
    },
  );

  return data;
};
