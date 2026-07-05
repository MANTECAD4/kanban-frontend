import { useDeleteProjectQuery } from "@/queries/project/useDeleteProjectQuery";

export const useDeleteProject = () => {
  const deleteProjectQuery = useDeleteProjectQuery();
  const submitProjectDeletion = (projectId: number) => {
    deleteProjectQuery.mutate(projectId);
  };

  return {
    submitProjectDeletion,
  };
};
