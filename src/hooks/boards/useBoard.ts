import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useBoard = () => {
  const { projectSlug = "", boardSlug = "" } = useParams();

  const getProjectQuery = useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["projects", projectSlug],
    enabled: projectSlug !== "",
  });
  const getBoardQuery = useQuery({
    queryFn: () =>
      getBoardBySlugAction(boardSlug, getProjectQuery.data?.project.id ?? 0),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "" && getProjectQuery.data !== undefined,
  });
  return {
    projectSlug,
    getProjectQuery,
    getBoardQuery,
  };
};
