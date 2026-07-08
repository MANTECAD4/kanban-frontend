import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { useQuery } from "@tanstack/react-query";

export const useGetBoardBySlugQuery = (boardSlug: string) => {
  return useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "",
  });
};
