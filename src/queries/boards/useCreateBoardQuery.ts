import { createBoardAction } from "@/actions/boards/create-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBoardQuery = (projectId: number) => {
  return useMutation({
    mutationFn: createBoardAction,
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project", projectId, "boards"],
      });
    },
  });
};
