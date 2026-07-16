import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetCategoriesResponse } from "@/interfaces/category.interface";

export const getCategoriesAction = async (boardId: number) => {
  const { data } = await kanbanApplicationApi.get<GetCategoriesResponse>(
    `/categories/in-board/${boardId}`,
  );
  return data;
};
