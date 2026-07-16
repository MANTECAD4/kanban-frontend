import { updateBoardAction } from "@/actions/boards/update-board.action";
import {
  SubmitBoardSchema,
  type BoardEntity,
  type SubmitBoardState,
} from "@/dtos/board.dtos";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const useUpdateBoard = (board: BoardEntity) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SubmitBoardState>({
    resolver: zodResolver(SubmitBoardSchema),
  });

  const navigate = useNavigate();
  const { projectSlug = "" } = useParams();

  useEffect(() => {
    if (board) {
      const { id, slug, projectId, ...rest } = board;
      reset(rest);
    }
  }, [board]);

  const updateBoardMutation = useMutation({
    mutationFn: updateBoardAction,
    onSuccess: (data) => {
      const {
        message,
        board: { slug: newSlug },
      } = data;

      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project", board.projectId, "boards"],
      });
      if (board.slug === newSlug) {
        kanbanQueryClient.invalidateQueries({ queryKey: ["boards", newSlug] });
      } else {
        kanbanQueryClient.removeQueries({ queryKey: ["boards", board.slug] });
        navigate(`/projects/${projectSlug}/boards/${newSlug}`);
      }
    },
  });

  const onSumbitForm = handleSubmit((data) => {
    const slug = slugify(data.name);
    updateBoardMutation.mutate({ ...data, slug, boardId: board.id });
  });

  return {
    register,
    control,
    errors,
    reset,
    onSumbitForm,
  };
};
