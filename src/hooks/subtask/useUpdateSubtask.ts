import { updateSubtaskDescriptionAction } from "@/actions/subtask/updateSubtaskDescription.action";
import { SubmitSubtaskSchema } from "@/dtos/subtask.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateSubtask = ({
  description,
  id,
}: {
  description: string;
  id: number;
}) => {
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
    },
  });

  useEffect(() => {
    reset({ description });
  }, [description]);

  const handleSubmitForm = handleSubmit((data) => {
    updateSubtaskMutation.mutate({ subtaskId: id, submitData: data });
  });

  return {
    register,
    errors,
    reset,
    handleSubmitForm,
  };
};
