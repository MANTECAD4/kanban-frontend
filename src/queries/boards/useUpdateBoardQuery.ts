import { updateBoardAction } from "@/actions/boards/update-board.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const useUpdateBoardQuery = (
  projectId: number,
  previousSlug: string,
) => {
  const navigate = useNavigate();
  const { projectSlug } = useParams();
  return useMutation({
    mutationFn: updateBoardAction,
    onSuccess: (data) => {
      const {
        message,
        board: { slug: newSlug },
      } = data;

      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project", projectId, "boards"],
      });
      if (previousSlug === newSlug) {
        kanbanQueryClient.invalidateQueries({ queryKey: ["boards", newSlug] });
      } else {
        kanbanQueryClient.removeQueries({ queryKey: ["boards", previousSlug] });
        navigate(`/projects/${projectSlug}/boards/${newSlug}`);
      }
    },
  });
};
