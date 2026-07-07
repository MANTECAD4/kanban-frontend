import { getBoardsAction } from "@/actions/boards/get-boards.action";
import { useQuery } from "@tanstack/react-query";

export const useGetBoardsQuery = (projectId: number) => {
  return useQuery({
    queryFn: () => getBoardsAction(projectId),
    queryKey: ["in-project", projectId, "boards"],
  });
};
