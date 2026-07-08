import { useGetBoardBySlugQuery } from "@/queries/boards/useGetBoardBySlugQuery";
import { useGetProjectBySlugQuery } from "@/queries/project/useGetProjectBySlugQuery";
import { useParams } from "react-router";

export const useBoard = () => {
  const { projectSlug = "", boardSlug = "" } = useParams();

  const { data } = useGetProjectBySlugQuery(projectSlug);
  const getBoardQuery = useGetBoardBySlugQuery(boardSlug);
  return {
    projectSlug,
    projectName: data?.project.name ?? "No name",
    getBoardQuery,
  };
};
