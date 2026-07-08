import type { BoardEntity } from "@/dtos/board.dtos";
import type { ProjectEntity } from "@/dtos/project.dto";

export interface CreateBoardResponse {
  ok: boolean;
  message: string;
  board: BoardEntity;
}
export interface UpdateBoardResponse {
  ok: boolean;
  message: string;
  board: BoardEntity;
}
export interface GetBoardBySlugResponse {
  ok: boolean;
  message: string;
  board: BoardEntity;
}

export interface GetBoardsResponse {
  ok: boolean;
  message: string;
  boards: BoardEntity[];
  meta: Meta;
}

export interface Meta {
  total: number;
}
