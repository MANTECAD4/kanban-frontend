import { getBoardsAction } from "@/actions/boards/get-boards.action";
import { useQuery } from "@tanstack/react-query";

export const useGetBoardsQuery = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsAction,
  });
};
