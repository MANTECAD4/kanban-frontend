import { SubmitBoardSchema, type SubmitBoardState } from "@/dtos/board.dtos";
import { IconColor } from "@/dtos/project.dto";
import { useCreateBoardQuery } from "@/queries/boards/useCreateBoardQuery";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

export const useCreateBoard = (projectId: number) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SubmitBoardState>({
    resolver: zodResolver(SubmitBoardSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "folder",
      iconColor: IconColor.RED,
    },
  });

  const createBoardMutation = useCreateBoardQuery(projectId);

  const onSumbitForm = handleSubmit((data) => {
    const slug = slugify(data.name);
    createBoardMutation.mutate({ ...data, slug, projectId });
  });

  return {
    register,
    control,
    errors,
    reset,
    onSumbitForm,
  };
};
