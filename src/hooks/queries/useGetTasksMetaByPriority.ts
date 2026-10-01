import { useQuery } from "@tanstack/react-query";
import { getTasksMetaByPriorityAction } from "../../actions/task/get-tasks-meta-by-priority.action";
import { useAuthStore } from "@/providers/store/auth.store";

export const useGetTasksMetaByPriority = () => {
  const userId = useAuthStore((s) => s.id);

  return useQuery({
    queryKey: ["user", userId, "meta-by-priority"],
    queryFn: getTasksMetaByPriorityAction,
  });
};
