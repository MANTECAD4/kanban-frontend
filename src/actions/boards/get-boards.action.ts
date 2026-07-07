import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetBoardsResponse } from "@/interfaces/board.interface";

export const getBoardsAction = async (projectId: number) => {
  const { data } = await kanbanApplicationApi.get<GetBoardsResponse>(
    `/boards/in-project/${projectId}`,
  );
  return data;
};
