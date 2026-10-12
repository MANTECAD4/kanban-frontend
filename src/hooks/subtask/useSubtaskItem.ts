import { updateSubtaskStatusAction } from "@/actions/subtask/updateSubtaskStatus.action";
import type { SubtaskEntity } from "@/dtos/subtask.dto";
import { getApiError } from "@/utils/getApiError";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  subtask: SubtaskEntity;
}

export const useSubtaskItem = ({
  subtask: { id: subtaskId, isCompleted: originalIsCompleted },
}: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(originalIsCompleted);
  const updateStatusMutation = useMutation({
    mutationFn: updateSubtaskStatusAction,
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      console.error({ title, message });
    },
  });
  useEffect(() => {
    updateStatusMutation.mutate({ isCompleted, subtaskId });
  }, [isCompleted, subtaskId]);
  return { isCompleted, setIsCompleted };
};
