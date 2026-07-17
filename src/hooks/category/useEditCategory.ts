import { updateCategoryAction } from "@/actions/category/update-category.action";
import {
  SubmitCategorySchema,
  type SubmitCategoryState,
} from "@/dtos/category.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { type CategoryEntity } from "../../dtos/category.dto";
import { useEffect } from "react";
import { toast } from "sonner";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";

export const useEditCategory = (category: CategoryEntity) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SubmitCategoryState>({
    resolver: zodResolver(SubmitCategorySchema),
  });

  useEffect(() => {
    reset({ icon: category.icon, name: category.name });
  }, [category]);

  const updateCategoryQuery = useMutation({
    mutationFn: updateCategoryAction,
    onSuccess: ({ category }) => {
      toast.success(`Category "${category.name}" updated successfully`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-board", category.boardId, "categories"],
      });
    },
  });

  const submitForm = handleSubmit((data) => {
    updateCategoryQuery.mutate({ ...data, categoryId: category.id });
  });

  return { register, control, submitForm, errors, reset };
};
