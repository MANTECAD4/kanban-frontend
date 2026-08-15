import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { SubmitBoardState } from "@/dtos/board.dtos";
import type { CreateBoardResponse } from "@/interfaces/board.interface";

type CreateBoardSubmitData = SubmitBoardState & { slug: string };

export const createBoardAction = async (submitData: CreateBoardSubmitData) => {
  const { data } = await kanbanApplicationApi.post<CreateBoardResponse>(
    `/boards/`,
    submitData,
  );
  return data;
};
