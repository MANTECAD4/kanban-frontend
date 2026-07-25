import { deleteTaskAction } from "@/actions/task/delete-task.action";
import { kanbanApplicationApi } from "@/api/kanban-application.api";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const useDeleteTask = (boardId: number) => {
  const { projectSlug = "", boardSlug = "" } = useParams();

  const navigate = useNavigate();
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAction,
    onSuccess: (_data) => {
      toast.success(`Task deleted succesfully`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-board", boardId, "categories"],
      });
      navigate(`/projects/${projectSlug}/boards/${boardSlug}`);
    },
  });

  const submitTaskDeletion = (taskId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  return {
    submitTaskDeletion,
  };
};
