import { getUpcomingTasksAction } from "@/actions/task/get-upcoming-tasks.action";
import { useAuthStore } from "@/providers/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useGetUpcomingTasksQuery = () => {
  const userId = useAuthStore((s) => s.id);

  return useQuery({
    queryKey: ["user", userId, "upcoming-tasks"],
    queryFn: getUpcomingTasksAction,
    staleTime: 0,
  });
};
