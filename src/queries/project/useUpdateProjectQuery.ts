import { updateProjectAction } from "@/actions/project/update-project.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const useUpdateProjectQuery = () => {
  const navigate = useNavigate();
  const { projectSlug: previousSLug } = useParams();
  return useMutation({
    mutationFn: updateProjectAction,
    onSuccess: (data) => {
      const {
        project: { slug },
        message,
      } = data;
      toast.success(message);
      navigate(`/projects/${slug}`);
      if (previousSLug !== slug) {
        kanbanQueryClient.removeQueries({
          queryKey: ["projects", previousSLug],
        });
      }
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
