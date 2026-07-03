import { createProjectAction } from "@/actions/project/create-project.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSubmitProjectQuery = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProjectAction,
    onSuccess: (data) => {
      const {
        message,
        project: { name },
      } = data;
      toast.success(message);
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/projects/${name}`);
    },
    onError: (error) => {
      // const { title, message } = getApiError(error);
      // toast(title, { description: message });
    },
  });
};
