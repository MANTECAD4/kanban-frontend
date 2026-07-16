import { createBoardAction } from "@/actions/boards/create-board.action";
import { SubmitBoardSchema, type SubmitBoardState } from "@/dtos/board.dtos";
import { IconColor } from "@/dtos/project.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const createBoardMutation = useMutation({
    mutationFn: createBoardAction,
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-project", projectId, "boards"],
      });
    },
  });

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
