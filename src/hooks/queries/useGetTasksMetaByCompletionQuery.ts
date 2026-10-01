import { getTasksMetaByCompletionAction } from "@/actions/task/get-tasks-meta-by-completion.action.use-case";
import { useAuthStore } from "@/providers/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksMetaByCompletionQuery = () => {
  const userId = useAuthStore((s) => s.id);

  return useQuery({
    queryKey: ["user", userId, "meta-by-completion"],
    queryFn: getTasksMetaByCompletionAction,
  });
};
