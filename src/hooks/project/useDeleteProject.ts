import { deleteProjectAction } from "@/actions/project/delete-project.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteProject = () => {
  const navigate = useNavigate();
  const deleteProjectQuery = useMutation({
    mutationFn: deleteProjectAction,
    onSuccess: (data) => {
      const {
        project: { name, slug },
      } = data;
      toast.success(`Project "${name}" deleted successfully`);
      kanbanQueryClient.removeQueries({ queryKey: ["projects", slug] });
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/");
    },
  });
  const submitProjectDeletion = (projectId: number) => {
    deleteProjectQuery.mutate(projectId);
  };

  return {
    submitProjectDeletion,
  };
};
