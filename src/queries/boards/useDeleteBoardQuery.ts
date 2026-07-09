import { deleteBoardAction } from "@/actions/boards/delete-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteBoardQuery = (projectSlug: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteBoardAction,
    onSuccess: ({ message, board: { name } }) => {
      toast.success(`Deleted board "${name}" successfully`);
      navigate(`/projects/${projectSlug}`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project"],
      });
    },
  });
};
