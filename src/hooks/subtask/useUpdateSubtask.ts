import { updateSubtaskDescriptionAction } from "@/actions/subtask/updateSubtaskDescription.action";
import { SubmitSubtaskSchema, type SubtaskEntity } from "@/dtos/subtask.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateSubtask = ({
  description,
  id,
  taskId,
}: SubtaskEntity) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SubmitSubtaskSchema),
  });

  const updateSubtaskMutation = useMutation({
    mutationFn: updateSubtaskDescriptionAction,
    onSuccess: (_data) => {
      toast.success("Subtask updated successfully");
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-task", taskId, "subtasks"],
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

  useEffect(() => {
    reset({ description });
  }, [description]);

  const handleSubmitForm = handleSubmit((data) => {
    toast.promise(
      updateSubtaskMutation.mutateAsync({ subtaskId: id, submitData: data }),
      { loading: "Updating subtask..." },
    );
  });

  return {
    register,
    errors,
    reset,
    handleSubmitForm,
  };
};
