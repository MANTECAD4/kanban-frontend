import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { type SubmitCategoryState } from "../../dtos/category.dto";
import type { CreateCategoryResponse } from "@/interfaces/category.interface";

export type CreateCategoryData = SubmitCategoryState & { boardId: number };

export const createCategoryAction = async ({
  boardId,
  ...submitData
}: CreateCategoryData) => {
  const { data } = await kanbanApplicationApi.post<CreateCategoryResponse>(
    `/status-columns/in-board/${boardId}`,
    submitData,
  );
  return data;
};
