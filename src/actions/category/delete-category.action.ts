import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteCategoryResponse } from "@/interfaces/category.interface";

export const deleteCategoryAction = async (categoryId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteCategoryResponse>(
    `/categories/${categoryId}`,
  );

  return data;
};
