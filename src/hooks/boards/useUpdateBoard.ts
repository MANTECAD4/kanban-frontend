import {
  SubmitBoardSchema,
  type BoardEntity,
  type SubmitBoardState,
} from "@/dtos/board.dtos";
import { useUpdateBoardQuery } from "@/queries/boards/useUpdateBoardQuery";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

  useEffect(() => {
    if (board) {
      const { id, slug, projectId, ...rest } = board;
      reset(rest);
    }
  }, [board]);

  const updateBoardMutation = useUpdateBoardQuery(board.projectId, board.slug);

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
