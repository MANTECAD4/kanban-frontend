import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetBoardBySlugResponse } from "@/interfaces/board.interface";

export const getBoardBySlugAction = async (boardSlug: string) => {
  const { data } = await kanbanApplicationApi.get<GetBoardBySlugResponse>(
    `/boards/${boardSlug}`,
  );
  return data;
};
