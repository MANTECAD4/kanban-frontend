import { getTasksMetaByCompletionAction } from "@/actions/task/get-tasks-meta-by-completion.action.use-case";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksMetaByCompletionQuery = () => {
  return useQuery({
    queryKey: ["meta-by-completion"],
    queryFn: getTasksMetaByCompletionAction,
  });
};
