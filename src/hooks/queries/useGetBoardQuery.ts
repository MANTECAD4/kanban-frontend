import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { useAuthStore } from "@/providers/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetBoardQuery = () => {
  const { boardSlug = "" } = useParams();
  const userId = useAuthStore((s) => s.id);

  return useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug),
    queryKey: ["user", userId, "boards", boardSlug],
    enabled: boardSlug !== "",
  });
};
