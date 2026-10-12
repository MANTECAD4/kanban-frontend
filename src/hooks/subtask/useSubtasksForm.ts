import { createSubtaskAction } from "@/actions/subtask/createSubtaskAction";
import { SubmitSubtaskSchema } from "@/dtos/subtask.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSubtasksForm = (taskId: number) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(SubmitSubtaskSchema),
    defaultValues: { description: "" },
  });

  const createSubtaskMutation = useMutation({
    mutationFn: createSubtaskAction,
    onSuccess: (_data) => {
      toast.success(`Subtask added successfully`);
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

  const submitSubtask = handleSubmit(({ description }) => {
    toast.promise(createSubtaskMutation.mutateAsync({ taskId, description }), {
      loading: "Creating subtask...",
    });
    clearErrors();
    reset();
  });

  return { register, errors, submitSubtask, clearErrors };
};
