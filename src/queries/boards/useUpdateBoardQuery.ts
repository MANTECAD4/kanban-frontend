import { updateBoardAction } from "@/actions/boards/update-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateBoardQuery = (projectId: number) => {
  //   console.log({ projectId });
  return useMutation({
    mutationFn: updateBoardAction,
    onSuccess: (data) => {
      const {
        message,
        board: {},
      } = data;

      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project", projectId, "boards"],
      });
    },
  });
};
