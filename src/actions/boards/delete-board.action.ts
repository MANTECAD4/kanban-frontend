import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteBoardResponse } from "@/interfaces/board.interface";

export const deleteBoardAction = async (boardId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteBoardResponse>(
    `/boards/${boardId}`,
  );
  return data;
};
