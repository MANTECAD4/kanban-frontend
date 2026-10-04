import { deleteBoardAction } from "@/actions/boards/delete-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteBoard = () => {
  const navigate = useNavigate();

  const deleteBoardQuery = useMutation({
    mutationFn: deleteBoardAction,
    onSuccess: ({ board: { name } }) => {
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project"],
      });
      toast.success(`Board "${name}" deleted successfully`);
      navigate(`/`);
    },
    onError: (error) => {
      const { title = "", message = "" } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const submitBoardDeletion = (boardId: number) => {
    toast.promise(deleteBoardQuery.mutateAsync(boardId), {
      loading: "Deleting board...",
    });
  };
  return { submitBoardDeletion };
};
