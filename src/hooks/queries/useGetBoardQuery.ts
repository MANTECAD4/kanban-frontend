import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetBoardQuery = (projectId: number = 0) => {
  const { boardSlug = "" } = useParams();
  return useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug, projectId),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "" && projectId !== 0,
  });
};
