import {
  SubmitBoardSchema,
  type BoardEntity,
  type SubmitBoardState,
} from "@/dtos/board.dtos";
import { IconColor, type ProjectEntity } from "@/dtos/project.dto";
import { useCreateBoardQuery } from "@/queries/boards/useCreateBoardQuery";
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

  //   const createBoardMutation = useCreateBoardQuery(projectId);

  const onSumbitForm = handleSubmit((data) => {
    const slug = slugify(data.name);
    // createBoardMutation.mutate({ ...data, slug, projectId });
  });

  return {
    register,
    control,
    errors,
    reset,
    onSumbitForm,
  };
};
