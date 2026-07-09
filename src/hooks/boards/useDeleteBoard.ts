import type { BoardEntity } from "@/dtos/board.dtos";
import { useDeleteBoardQuery } from "@/queries/boards/useDeleteBoardQuery";

export const useDeleteBoard = (projectSlug: string) => {
  const deleteBoardQuery = useDeleteBoardQuery(projectSlug);

  const submitBoardDeletion = (boardId: number) => {
    deleteBoardQuery.mutate(boardId);
  };
  return { submitBoardDeletion };
};
