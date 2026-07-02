import { getUserProjectsAction } from "@/actions/project/get-user-projects.action";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProjectsQuery = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getUserProjectsAction,
  });
};
