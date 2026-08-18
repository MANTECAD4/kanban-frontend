import { useQuery } from "@tanstack/react-query";
import { getTasksMetaByPriorityAction } from "../../actions/task/get-tasks-meta-by-priority.action";

export const useGetTasksMetaByPriority = () => {
  return useQuery({
    queryKey: ["meta-by-priority"],
    queryFn: getTasksMetaByPriorityAction,
  });
};
