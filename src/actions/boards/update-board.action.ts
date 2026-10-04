import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitBoardState } from "@/dtos/board.dtos";
import type { UpdateBoardResponse } from "@/interfaces/board.interface";

export type UpdateBoardData = SubmitBoardState & {
  slug: string;
  boardId: number;
};

export const updateBoardAction = async ({
  boardId,
  ...submitedData
}: UpdateBoardData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { data } = await kanbanApplicationApi.put<UpdateBoardResponse>(
    `/boards/${boardId}`,
    submitedData,
  );
  return data;
};
