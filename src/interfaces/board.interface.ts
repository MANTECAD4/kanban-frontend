import type { BoardEntity } from "@/dtos/board.dtos";

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
export interface DeleteBoardResponse {
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
