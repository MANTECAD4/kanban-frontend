import { deleteSubtaskAction } from "@/actions/subtask/delete-subtask.action";
import type { SubtaskEntity } from "@/dtos/subtask.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSubtask = (subtask: SubtaskEntity) => {
  const deleteSubtaskMutation = useMutation({
    mutationFn: deleteSubtaskAction,
    onSuccess: (_data) => {
      toast.success(`Subtask deleted successfully`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-task", subtask.taskId, "subtasks"],
      });
    },
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const handleSubtaskDeletion = (subtaskId: number) => {
    toast.promise(deleteSubtaskMutation.mutateAsync(subtaskId), {
      loading: "Deleting subtask...",
    });
  };

  return { handleSubtaskDeletion };
};
