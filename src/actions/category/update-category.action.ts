import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitCategoryState } from "@/dtos/category.dto";
import type { UpdateCategoryResponse } from "@/interfaces/category.interface";

type UpdateCategoryData = SubmitCategoryState & { categoryId: number };

export const updateCategoryAction = async ({
  categoryId,
  ...submitData
}: UpdateCategoryData) => {
  const { data } = await kanbanApplicationApi.put<UpdateCategoryResponse>(
    `/categories/${categoryId}`,
    submitData,
  );
  return data;
};
