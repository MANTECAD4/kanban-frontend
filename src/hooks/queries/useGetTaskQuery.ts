import { getTaskBySlugAction } from "@/actions/task/get-task-by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetTaskQuery = (boardId: number = 0) => {
  const { taskSlug = "" } = useParams();
  return useQuery({
    queryFn: () => getTaskBySlugAction(boardId, taskSlug),
    queryKey: ["tasks", taskSlug],
    enabled: taskSlug !== "" && boardId !== 0,
  });
};
