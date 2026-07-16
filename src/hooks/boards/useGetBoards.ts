import { useQuery } from "@tanstack/react-query";
import { getBoardsAction } from "@/actions/boards/get-boards.action";

export const useGetBoards = (projectId: number) => {
  const getBoardsQuery = useQuery({
    queryFn: () => getBoardsAction(projectId),
    queryKey: ["in-project", projectId, "boards"],
  });
  return {
    getBoardsQuery,
  };
};
