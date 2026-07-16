import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useProject = () => {
  const { projectSlug = "" } = useParams();
  const getProjectBySlugQuery = useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["projects", projectSlug],
    enabled: projectSlug !== "",
  });
  return {
    getProjectBySlugQuery,
  };
};
