import { updateProjectAction } from "@/actions/project/update-project.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";

export const useUpdateProjectQuery = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateProjectAction,
    onSuccess: (data) => {
      const {
        project: { slug },
        message,
      } = data;
      toast.success(message);
      navigate(`/projects/${slug}`);
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
