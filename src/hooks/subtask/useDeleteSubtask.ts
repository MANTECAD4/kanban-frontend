import { deleteSubtaskAction } from "@/actions/subtask/delete-subtask.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSubtask = () => {
  const deleteSubtaskMutation = useMutation({
    mutationFn: deleteSubtaskAction,
    onSuccess: (data) => {
      toast.success(`subtask deleted successfully`);
    },
  });

  const handleSubtaskDeletion = (subtaskId: number) => {
    deleteSubtaskMutation.mutate(subtaskId);
  };

  return { handleSubtaskDeletion };
};
