import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useGetProjectQuery = () => {
  const { projectSlug = "" } = useParams();
  return useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["projects", projectSlug],
    enabled: projectSlug !== "",
  });
};
