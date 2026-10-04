import { createCategoryAction } from "@/actions/category/create-category.action";
import {
  SubmitCategorySchema,
  type SubmitCategoryState,
} from "@/dtos/category.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useAddCategory = (boardId: number) => {
  const {
    register,
    reset,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SubmitCategoryState>({
    resolver: zodResolver(SubmitCategorySchema),
    defaultValues: { name: "", icon: "tag" },
  });

  const createCategoryQuery = useMutation({
    mutationFn: createCategoryAction,
    onSuccess: (data) => {
      toast.success(data.message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-board", boardId, "categories"],
      });
    },
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const submitForn = handleSubmit((data) => {
    toast.promise(createCategoryQuery.mutateAsync({ ...data, boardId }), {
      loading: "Creating new category...",
    });
  });

  return {
    register,
    errors,
    reset,
    control,
    submitForn,
  };
};
