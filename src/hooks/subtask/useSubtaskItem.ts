import { updateSubtaskStatusAction } from "@/actions/subtask/updateSubtaskStatus.action";
import type { SubtaskEntity } from "@/dtos/subtask.dto";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  subtask: SubtaskEntity;
}

export const useSubtaskItem = ({
  subtask: { id: subtaskId, isCompleted: originalIsCompleted },
}: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(originalIsCompleted);
  const updateStatusMutation = useMutation({
    mutationFn: updateSubtaskStatusAction,
    onError: (_error) => {
      toast.error("Somethign went wrong");
    },
  });
  useEffect(() => {
    updateStatusMutation.mutate({ isCompleted, subtaskId });
  }, [isCompleted, subtaskId]);
  return { isCompleted, setIsCompleted };
};
