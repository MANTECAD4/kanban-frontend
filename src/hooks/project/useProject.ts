import { useGetProjectBySlugQuery } from "@/queries/project/useGetProjectBySlugQuery";
import { useParams } from "react-router";

export const useProject = () => {
  const { projectSlug = "" } = useParams();
  const getProjectBySlugQuery = useGetProjectBySlugQuery(projectSlug);
  return {
    getProjectBySlugQuery,
  };
};
