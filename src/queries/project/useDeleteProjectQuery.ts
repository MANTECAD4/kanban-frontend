import { deleteProjectAction } from "@/actions/project/delete-project.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteProjectQuery = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteProjectAction,
    onSuccess: (data) => {
      const {
        project: { name, slug },
        message,
      } = data;
      toast.success(`Project "${name}" deleted successfully`);
      kanbanQueryClient.removeQueries({ queryKey: ["projects", slug] });
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/");
    },
    onError: (error) => {
      console.log({ error: error.response });
    },
  });
};
