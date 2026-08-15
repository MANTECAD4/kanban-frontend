import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetBoardQuery = () => {
  const { boardSlug = "" } = useParams();
  return useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "",
  });
};
