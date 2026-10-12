import { deleteTaskAction } from "@/actions/task/delete-task.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const useDeleteTask = (boardId: number) => {
  const { boardSlug = "" } = useParams();

  const navigate = useNavigate();
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAction,
    onSuccess: (_data) => {
      toast.success(`Task deleted succesfully`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-board", boardId, "categories"],
      });
      navigate(`/boards/${boardSlug}`);
    },
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const submitTaskDeletion = (taskId: number) => {
    toast.promise(deleteTaskMutation.mutateAsync(taskId), {
      loading: "Deleting task...",
    });
  };

  return {
    submitTaskDeletion,
  };
};
