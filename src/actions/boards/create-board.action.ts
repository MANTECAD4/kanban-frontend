import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitBoardState } from "@/dtos/board.dtos";
import type { CreateBoardResponse } from "@/interfaces/board.interface";

type CreateBoardSubmitData = SubmitBoardState & {
  projectId: number;
  slug: string;
};

export const createBoardAction = async ({
  projectId,
  ...boardData
}: CreateBoardSubmitData) => {
  const { data } = await kanbanApplicationApi.post<CreateBoardResponse>(
    `boards/in-project/${projectId}`,
    boardData,
  );
  return data;
};
