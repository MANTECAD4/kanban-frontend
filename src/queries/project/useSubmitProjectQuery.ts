import { createProjectAction } from "@/actions/project/create-project.action";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
      navigate(`/projects/${name}`);
    },
    onError: (error) => {
      let title: string;
      let message: string;
      if (axios.isAxiosError(error)) {
        title = error.response?.data.error.title;
        message = error.response?.data.error.message;
      } else {
        title = "Server error";
        message = error.message;
      }
      if (title && message) {
        toast.error(title, { description: message });
      }
    },
  });
};
