import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useBoard = () => {
  const { projectSlug = "", boardSlug = "" } = useParams();

  const getProjectQuery = useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "",
  });
  const getBoardQuery = useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "",
  });
  return {
    projectSlug,
    projectName: getProjectQuery.data?.project.name ?? "No name",
    getBoardQuery,
  };
};
