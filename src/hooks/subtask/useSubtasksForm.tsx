import { createSubtaskAction } from "@/actions/subtask/createSubtaskAction";
import { SubmitSubtaskSchema } from "@/dtos/subtask.dto";
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
    },
  });

  const submitSubtask = handleSubmit(({ description }) => {
    createSubtaskMutation.mutate({ taskId, description });
    reset();
  });

  return { register, errors, submitSubtask, clearErrors };
};
