import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetBoardBySlugResponse } from "@/interfaces/board.interface";

export const getBoardBySlugAction = async (
  boardSlug: string,
  projectId: number,
) => {
  const { data } = await kanbanApplicationApi.get<GetBoardBySlugResponse>(
    `/boards/${boardSlug}/in-project/${projectId}`,
  );
  return data;
};
