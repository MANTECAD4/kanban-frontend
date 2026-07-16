import { deleteBoardAction } from "@/actions/boards/delete-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteBoard = (projectSlug: string) => {
  const navigate = useNavigate();

  const deleteBoardQuery = useMutation({
    mutationFn: deleteBoardAction,
    onSuccess: ({ board: { name } }) => {
      toast.success(`Deleted board "${name}" successfully`);
      navigate(`/projects/${projectSlug}`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project"],
      });
    },
  });

  const submitBoardDeletion = (boardId: number) => {
    deleteBoardQuery.mutate(boardId);
  };
  return { submitBoardDeletion };
};
