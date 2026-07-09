import { createCategoryAction } from "@/actions/category/create-category.action";
import {
  SubmitCategorySchema,
  type SubmitCategoryState,
} from "@/dtos/category.dto";
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
    },
  });

  const submitForn = handleSubmit((data) => {
    createCategoryQuery.mutate({ ...data, boardId });
  });

  return {
    register,
    errors,
    reset,
    control,
    submitForn,
  };
};
