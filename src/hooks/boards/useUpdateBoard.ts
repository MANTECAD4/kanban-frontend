import { updateBoardAction } from "@/actions/boards/update-board.action";
import {
  SubmitBoardSchema,
  type BoardEntity,
  type SubmitBoardState,
} from "@/dtos/board.dtos";
import { useAuthStore } from "@/providers/store/auth.store";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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

  const userId = useAuthStore((s) => s.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (board) {
      const { id, slug, ...rest } = board;
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
        queryKey: ["user", userId, "boards"],
      });
      if (board.slug === newSlug) {
        kanbanQueryClient.invalidateQueries({ queryKey: ["boards", newSlug] });
      } else {
        kanbanQueryClient.removeQueries({ queryKey: ["boards", board.slug] });
        navigate(`/boards/${newSlug}`);
      }
    },
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong, Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const onSumbitForm = handleSubmit((data) => {
    const slug = slugify(data.name);
    toast.promise(
      updateBoardMutation.mutateAsync({ ...data, slug, boardId: board.id }),
      { loading: "Saving board changes..." },
    );
  });

  return {
    register,
    control,
    errors,
    reset,
    onSumbitForm,
  };
};
