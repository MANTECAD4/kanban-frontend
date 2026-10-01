import { getTaskBySlugAction } from "@/actions/task/get-task-by-slug.action";
import { useAuthStore } from "@/providers/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetTaskQuery = (boardId: number = 0) => {
  const { taskSlug = "" } = useParams();
  const userId = useAuthStore((s) => s.id);

  return useQuery({
    queryFn: () => getTaskBySlugAction(boardId, taskSlug),
    queryKey: ["user", userId, "tasks", taskSlug],
    enabled: taskSlug !== "" && boardId !== 0,
  });
};
