import { getBoardsAction } from "@/actions/boards/get-boards.action";
import { useAuthStore } from "@/providers/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useGetBoardsQuery = () => {
  const userId = useAuthStore((s) => s.id);
  return useQuery({
    queryKey: ["user", userId, "boards"],
    queryFn: getBoardsAction,
  });
};
