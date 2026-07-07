import { useGetBoardsQuery } from "@/queries/boards/useGetBoardsQuery";

export const useGetBoards = (projectId: number) => {
  const getBoardsQuery = useGetBoardsQuery(projectId);
  return {
    getBoardsQuery,
  };
};
