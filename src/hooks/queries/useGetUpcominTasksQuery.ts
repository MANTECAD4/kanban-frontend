import { getUpcomingTasksAction } from "@/actions/task/get-upcoming-tasks.action";
import { useQuery } from "@tanstack/react-query";

export const useGetUpcomingTasksQuery = () => {
  return useQuery({
    queryKey: ["upcoming-tasks"],
    queryFn: getUpcomingTasksAction,
    staleTime: 0,
  });
};
