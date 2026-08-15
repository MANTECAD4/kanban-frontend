import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetBoardsResponse } from "@/interfaces/board.interface";

export const getBoardsAction = async () => {
  const { data } = await kanbanApplicationApi.get<GetBoardsResponse>(`/boards`);
  return data;
};
